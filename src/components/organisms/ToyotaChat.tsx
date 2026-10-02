import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, Typography, IconButton, TextField, InputAdornment,
  Chip, Fade, Avatar, CircularProgress, Tooltip, Button,
  Divider, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MinimizeIcon from '@mui/icons-material/Remove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import {
  matchIntent,
  GREETING_RESPONSE,
  FALLBACK_RESPONSES,
  QUIZ_QUESTIONS,
  getQuizRecommendation,
  calculateChatLoan,
  POPULAR_LOAN_PRESETS,
  type QuickReply,
  type QuizRecommendation,
} from '../../data/chatbotKnowledge';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
  link?: { label: string; path: string };
  actionWidget?: 'quiz' | 'calculator';
  timestamp: Date;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
let msgCounter = 0;
const makeId = () => `msg_${++msgCounter}_${Date.now()}`;

/** Subtle web-audio synthesizer for feedback */
const playAudioFeedback = (type: 'message' | 'action', soundEnabled: boolean) => {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'message') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch {
    // Graceful fallback if audio is blocked by browser policy
  }
};

/** Convert **bold** markers to JSX */
const renderText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#111' }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

/** Render multi-line bot text with bold support */
const BotText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split('\n').map((line, i) => (
      <Typography
        key={i}
        variant="body2"
        sx={{ fontSize: '0.82rem', lineHeight: 1.65, color: '#1E1E1E', whiteSpace: 'pre-wrap' }}
      >
        {renderText(line)}
      </Typography>
    ))}
  </>
);

// ── Typing Indicator ──────────────────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 1 }}>
    {[0, 1, 2].map(i => (
      <Box
        key={i}
        sx={{
          width: 7, height: 7, borderRadius: '50%', bgcolor: '#EB0A1E',
          animation: 'typingBounce 1.2s infinite ease-in-out',
          animationDelay: `${i * 0.2}s`,
          '@keyframes typingBounce': {
            '0%, 80%, 100%': { transform: 'translateY(0)', opacity: 0.35 },
            '40%': { transform: 'translateY(-6px)', opacity: 1 },
          },
        }}
      />
    ))}
  </Box>
);

// ── Interactive In-Chat Quiz Widget ───────────────────────────────────────────
interface ChatQuizWidgetProps {
  onNavigate: (path: string) => void;
  onOpenLoan: (price: number) => void;
}

const ChatQuizWidget: React.FC<ChatQuizWidgetProps> = ({ onNavigate, onOpenLoan }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ purpose: string; budget: string; priority: string }>({
    purpose: '',
    budget: '',
    priority: '',
  });
  const [result, setResult] = useState<QuizRecommendation | null>(null);

  const handleSelect = (optionId: string) => {
    const currentQ = QUIZ_QUESTIONS[step];
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const rec = getQuizRecommendation(newAnswers.purpose, newAnswers.budget, newAnswers.priority);
      setResult(rec);
      setStep(3); // Result view
    }
  };

  const handleBack = () => {
    if (step > 0 && step <= 2) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({ purpose: '', budget: '', priority: '' });
    setResult(null);
    setStep(0);
  };

  // Result Card View
  if (step === 3 && result) {
    return (
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          border: '1.5px solid #EB0A1E',
          borderRadius: '12px',
          p: 2,
          mt: 1,
          boxShadow: '0 4px 16px rgba(235,10,30,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '14px !important', color: '#FFF' }} />}
            label={`${result.matchScore}% MATCH · ${result.badge}`}
            size="small"
            sx={{
              bgcolor: '#EB0A1E',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '0.68rem',
              letterSpacing: '0.5px',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {result.category}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box
            component="img"
            src={result.imageUrl}
            alt={result.modelName}
            sx={{
              width: 80,
              height: 55,
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #EAEAEA',
              bgcolor: '#F9F9F9',
            }}
          />
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '0.92rem', color: '#1E1E1E', lineHeight: 1.2 }}>
              {result.modelName}
            </Typography>
            <Typography sx={{ fontWeight: 800, color: '#EB0A1E', fontSize: '0.85rem', mt: 0.25 }}>
              {result.priceRange}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#444', lineHeight: 1.5 }}>
          {result.reason}
        </Typography>

        {/* Highlights */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {result.highlights.map((h, i) => (
            <Chip
              key={i}
              label={h}
              size="small"
              icon={<CheckCircleOutlineIcon sx={{ fontSize: '12px !important', color: '#2E7D32' }} />}
              sx={{ bgcolor: '#F1F8E9', color: '#1B5E20', fontSize: '0.68rem', fontWeight: 600, height: 22 }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 0.5 }} />

        {/* Action Buttons */}
        <Stack spacing={0.75}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onNavigate(`/vehicles/${result.vehicleId}`)}
            sx={{
              bgcolor: '#EB0A1E',
              color: '#FFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              py: 0.75,
              borderRadius: '6px',
              textTransform: 'none',
              transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.15s',
              '&:hover': { bgcolor: '#C8081A' },
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            View Full {result.modelName} Specs
          </Button>

          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => onNavigate('/test-drive')}
              startIcon={<DirectionsCarIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderColor: '#CCC',
                color: '#1E1E1E',
                fontSize: '0.72rem',
                fontWeight: 600,
                py: 0.5,
                borderRadius: '6px',
                textTransform: 'none',
                '&:hover': { borderColor: '#EB0A1E', color: '#EB0A1E' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              Book Test Drive
            </Button>

            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => onOpenLoan(40000)}
              startIcon={<CalculateIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderColor: '#CCC',
                color: '#1E1E1E',
                fontSize: '0.72rem',
                fontWeight: 600,
                py: 0.5,
                borderRadius: '6px',
                textTransform: 'none',
                '&:hover': { borderColor: '#EB0A1E', color: '#EB0A1E' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              Loan Calc
            </Button>
          </Box>

          <Button
            size="small"
            onClick={handleRestart}
            sx={{
              fontSize: '0.7rem',
              color: 'text.secondary',
              textTransform: 'none',
              py: 0.25,
              '&:hover': { color: '#EB0A1E', bgcolor: 'transparent' },
            }}
          >
            🔄 Retake Recommendation Quiz
          </Button>
        </Stack>
      </Box>
    );
  }

  // Quiz Question Steps View
  const currentQ = QUIZ_QUESTIONS[step];

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        p: 2,
        mt: 1,
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '0.5px' }}>
          {currentQ.subtitle.toUpperCase()}
        </Typography>
        {step > 0 && (
          <IconButton size="small" onClick={handleBack} sx={{ p: 0.25, color: '#666' }}>
            <ArrowBackIcon sx={{ fontSize: 15 }} />
          </IconButton>
        )}
      </Box>

      <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: '#1E1E1E', mb: 1.5 }}>
        {currentQ.title}
      </Typography>

      <Stack spacing={0.75}>
        {currentQ.options.map((opt) => (
          <Box
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            sx={{
              p: 1.25,
              border: '1px solid #EAEAEA',
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: '#FAFAFA',
              transition: 'all 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
              '&:hover': {
                bgcolor: '#FFF',
                borderColor: '#EB0A1E',
                boxShadow: '0 2px 8px rgba(235,10,30,0.1)',
                transform: 'translateX(2px)',
              },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#1E1E1E' }}>
              {opt.label}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem', display: 'block', mt: 0.25 }}>
              {opt.desc}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

// ── Interactive In-Chat Loan Estimator Widget ──────────────────────────────────
interface ChatLoanEstimatorProps {
  initialPrice?: number;
  onNavigate: (path: string) => void;
}

const ChatLoanEstimator: React.FC<ChatLoanEstimatorProps> = ({ initialPrice = 38000, onNavigate }) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [depositPercent, setDepositPercent] = useState<number>(20);
  const [termMonths, setTermMonths] = useState<number>(48);

  const estimate = calculateChatLoan(price, depositPercent, termMonths, 18);

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1.5px solid #E5E7EB',
        borderRadius: '12px',
        p: 2,
        mt: 1,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <CalculateIcon sx={{ color: '#EB0A1E', fontSize: 20 }} />
        <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: '#1E1E1E' }}>
          Quick Instalment Calculator
        </Typography>
      </Box>

      {/* Preset Model Selector */}
      <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, display: 'block', mb: 0.75 }}>
        Select Vehicle or Price:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.75 }}>
        {POPULAR_LOAN_PRESETS.map((preset) => {
          const isSelected = price === preset.price;
          return (
            <Chip
              key={preset.label}
              label={preset.label}
              size="small"
              onClick={() => setPrice(preset.price)}
              sx={{
                fontSize: '0.68rem',
                fontWeight: isSelected ? 800 : 500,
                bgcolor: isSelected ? '#1E1E1E' : '#F4F4F4',
                color: isSelected ? '#FFF' : '#333',
                border: isSelected ? '1px solid #1E1E1E' : '1px solid #E0E0E0',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease-out',
                '&:hover': { bgcolor: isSelected ? '#333' : '#EAEAEA' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            />
          );
        })}
      </Box>

      {/* Deposit % Toggle */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>Deposit:</Typography>
          <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 700 }}>
            {depositPercent}% (${estimate.depositAmount.toLocaleString()})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {[15, 20, 30].map((pct) => (
            <Button
              key={pct}
              size="small"
              variant={depositPercent === pct ? 'contained' : 'outlined'}
              onClick={() => setDepositPercent(pct)}
              sx={{
                flex: 1,
                py: 0.25,
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: '6px',
                textTransform: 'none',
                bgcolor: depositPercent === pct ? '#EB0A1E' : 'transparent',
                borderColor: depositPercent === pct ? '#EB0A1E' : '#D1D5DB',
                color: depositPercent === pct ? '#FFF' : '#333',
                '&:hover': { bgcolor: depositPercent === pct ? '#C8081A' : '#F9F9F9' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {pct}%
            </Button>
          ))}
        </Box>
      </Box>

      {/* Tenure Months Toggle */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>Loan Tenure:</Typography>
          <Typography variant="caption" sx={{ color: '#1E1E1E', fontWeight: 700 }}>
            {termMonths} Months ({termMonths / 12} yrs)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {[24, 36, 48, 60].map((m) => (
            <Button
              key={m}
              size="small"
              variant={termMonths === m ? 'contained' : 'outlined'}
              onClick={() => setTermMonths(m)}
              sx={{
                flex: 1,
                py: 0.25,
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: '6px',
                textTransform: 'none',
                bgcolor: termMonths === m ? '#1E1E1E' : 'transparent',
                borderColor: termMonths === m ? '#1E1E1E' : '#D1D5DB',
                color: termMonths === m ? '#FFF' : '#333',
                '&:hover': { bgcolor: termMonths === m ? '#333' : '#F9F9F9' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {m}m
            </Button>
          ))}
        </Box>
      </Box>

      {/* Result Display Box */}
      <Box
        sx={{
          bgcolor: '#FFF5F5',
          border: '1px solid #FFCDD2',
          borderRadius: '8px',
          p: 1.5,
          textAlign: 'center',
          mb: 1.5,
        }}
      >
        <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.25 }}>
          Estimated Monthly Repayment:
        </Typography>
        <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', color: '#EB0A1E', lineHeight: 1 }}>
          ${estimate.monthlyInstalment.toLocaleString()}
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555' }}> / mo</span>
        </Typography>
        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
          Financed Amount: ${estimate.loanAmount.toLocaleString()} · Estimated @ 18% p.a.
        </Typography>
      </Box>

      {/* Direct CTAs */}
      <Stack spacing={0.75}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => onNavigate('/finance')}
          sx={{
            bgcolor: '#EB0A1E',
            color: '#FFF',
            fontSize: '0.75rem',
            fontWeight: 700,
            py: 0.75,
            borderRadius: '6px',
            textTransform: 'none',
            '&:hover': { bgcolor: '#C8081A' },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          Apply for Bank Finance Pre-Approval
        </Button>
        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.62rem', textAlign: 'center' }}>
          Partners: CBZ Bank · ZB Bank · FBC Bank · Steward Bank
        </Typography>
      </Stack>
    </Box>
  );
};

// ── Main ToyotaChat Component ────────────────────────────────────────────────
export const ToyotaChat: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [unread, setUnread] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, minimised]);

  const addBotMessage = useCallback((
    text: string,
    quickReplies?: QuickReply[],
    link?: { label: string; path: string },
    actionWidget?: 'quiz' | 'calculator',
  ) => {
    const msg: Message = {
      id: makeId(),
      role: 'bot',
      text,
      quickReplies,
      link,
      actionWidget,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    playAudioFeedback('message', soundEnabled);
    if (!open || minimised) setUnread(n => n + 1);
  }, [open, minimised, soundEnabled]);

  const handleOpen = () => {
    setOpen(true);
    setMinimised(false);
    setUnread(0);
    if (!hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          addBotMessage(
            GREETING_RESPONSE.text,
            GREETING_RESPONSE.quickReplies,
          );
        }, 800);
      }, 250);
    }
  };

  const handleResetConversation = () => {
    playAudioFeedback('action', soundEnabled);
    setMessages([]);
    setUnread(0);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBotMessage(
        GREETING_RESPONSE.text,
        GREETING_RESPONSE.quickReplies,
      );
    }, 400);
  };

  const handleClose = () => { setOpen(false); setMinimised(false); };
  const handleMinimise = () => setMinimised(true);
  const handleMaximise = () => { setMinimised(false); setUnread(0); };

  const processInput = useCallback((userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg: Message = { id: makeId(), role: 'user', text: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    playAudioFeedback('action', soundEnabled);

    // Show typing indicator
    setTyping(true);

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      setTyping(false);
      const intent = matchIntent(trimmed);

      if (intent) {
        addBotMessage(intent.response, intent.quickReplies, intent.link, intent.actionWidget);
      } else {
        const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        addBotMessage(fallback, [
          { label: '🎯 Help Me Choose', value: 'help me choose' },
          { label: '🧮 Loan Estimator', value: 'instant loan calculator' },
          { label: '🏛️ Civil Servants Rebate', value: 'civil servants rebate' },
          { label: '🚗 Browse Models', value: 'show me your vehicles' },
          { label: '📍 Branches', value: 'branch locations' },
        ]);
      }
    }, delay);
  }, [addBotMessage, soundEnabled]);

  const handleSend = () => processInput(input);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };
  const handleQuickReply = (value: string) => processInput(value);
  const handleLink = (path: string) => { navigate(path); handleClose(); };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-ZW', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* ── Floating Launch Button ─────────────────────────────────────────── */}
      <Fade in={!open || minimised}>
        <Box
          sx={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 1400,
            display: (!open || minimised) ? 'flex' : 'none',
            flexDirection: 'column', alignItems: 'flex-end', gap: 1,
          }}
        >
          {/* Minimised pill */}
          {minimised && (
            <Fade in={minimised}>
              <Box
                onClick={handleMaximise}
                sx={{
                  bgcolor: '#1E1E1E', color: '#FFF', px: 2, py: 1,
                  borderRadius: '20px', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', gap: 1, fontSize: '0.8rem', fontWeight: 700,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.15s',
                  '&:hover': { bgcolor: '#2A2A2A', transform: 'scale(1.02)' },
                  '&:active': { transform: 'scale(0.97)' },
                }}
              >
                <SmartToyIcon sx={{ fontSize: 16, color: '#EB0A1E' }} />
                Toyota Assistant
                {unread > 0 && (
                  <Box sx={{ bgcolor: '#EB0A1E', color: '#FFF', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unread}
                  </Box>
                )}
              </Box>
            </Fade>
          )}

          {/* Floating button */}
          <Tooltip title="Chat with Toyota Assistant" placement="left">
            <Box
              onClick={handleOpen}
              sx={{
                width: 62, height: 62, borderRadius: '50%',
                bgcolor: '#EB0A1E', color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 8px 28px rgba(235,10,30,0.45)',
                transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.08)', boxShadow: '0 10px 36px rgba(235,10,30,0.6)' },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              {unread > 0 && !minimised && (
                <Box sx={{ position: 'absolute', top: -4, right: -4, bgcolor: '#1E1E1E', color: '#FFF', borderRadius: '50%', width: 22, height: 22, fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #EB0A1E' }}>
                  {unread}
                </Box>
              )}
              <ChatIcon sx={{ fontSize: 28 }} />
            </Box>
          </Tooltip>
        </Box>
      </Fade>

      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <Fade in={open && !minimised}>
        <Box
          sx={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 1400,
            width: { xs: 'calc(100vw - 32px)', sm: 400 },
            height: { xs: 'calc(100dvh - 56px)', sm: 640 },
            maxHeight: 680,
            display: open && !minimised ? 'flex' : 'none',
            flexDirection: 'column',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
            border: '1px solid rgba(0,0,0,0.1)',
            bgcolor: '#FFFFFF',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: '#1E1E1E', px: 2, py: 1.5,
              display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0,
            }}
          >
            <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#FFFFFF', border: '2px solid #EB0A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
              <Box component="img" src="/images/logo.png" alt="Toyota" sx={{ width: 26, height: 26, objectFit: 'contain' }} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.875rem', lineHeight: 1.2 }}>
                Toyota Zimbabwe Assistant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                <Typography sx={{ color: '#AAA', fontSize: '0.68rem' }}>CFAO Mobility · Online</Typography>
              </Box>
            </Box>

            {/* Sound toggle */}
            <Tooltip title={soundEnabled ? 'Mute audio' : 'Enable audio'}>
              <IconButton size="small" onClick={() => setSoundEnabled(!soundEnabled)} sx={{ color: '#888', '&:hover': { color: '#FFF' } }}>
                {soundEnabled ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Reset conversation */}
            <Tooltip title="Reset conversation">
              <IconButton size="small" onClick={handleResetConversation} sx={{ color: '#888', '&:hover': { color: '#FFF' } }}>
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Minimise */}
            <IconButton size="small" onClick={handleMinimise} sx={{ color: '#888', '&:hover': { color: '#FFF' } }}>
              <MinimizeIcon fontSize="small" />
            </IconButton>

            {/* Close */}
            <IconButton size="small" onClick={handleClose} sx={{ color: '#888', '&:hover': { color: '#EB0A1E' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box
            sx={{
              flexGrow: 1, overflowY: 'auto', p: 2,
              bgcolor: '#F8F9FA',
              display: 'flex', flexDirection: 'column', gap: 1.75,
              '&::-webkit-scrollbar': { width: 5 },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#DDD', borderRadius: 2 },
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end', gap: 1,
                }}
              >
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 28, height: 28, flexShrink: 0,
                    bgcolor: msg.role === 'bot' ? '#FFFFFF' : '#1E1E1E',
                    border: msg.role === 'bot' ? '1.5px solid #EB0A1E' : 'none',
                    mb: 0.25,
                  }}
                >
                  {msg.role === 'bot'
                    ? <Box component="img" src="/images/logo.png" alt="Toyota" sx={{ width: 18, height: 18, objectFit: 'contain' }} />
                    : <PersonIcon sx={{ fontSize: 15 }} />}
                </Avatar>

                <Box sx={{ maxWidth: '82%', display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {/* Bubble */}
                  <Box
                    sx={{
                      bgcolor: msg.role === 'user' ? '#EB0A1E' : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFF' : '#1E1E1E',
                      px: 2, py: 1.25,
                      borderRadius: msg.role === 'user'
                        ? '14px 14px 4px 14px'
                        : '14px 14px 14px 4px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      border: msg.role === 'bot' ? '1px solid #EAEAEA' : 'none',
                    }}
                  >
                    {msg.role === 'bot'
                      ? <BotText text={msg.text} />
                      : <Typography variant="body2" sx={{ fontSize: '0.82rem', lineHeight: 1.5 }}>{msg.text}</Typography>}
                  </Box>

                  {/* Render Action Widgets if attached */}
                  {msg.actionWidget === 'quiz' && (
                    <ChatQuizWidget
                      onNavigate={handleLink}
                      onOpenLoan={(_p) => processInput('instant loan calculator')}
                    />
                  )}

                  {msg.actionWidget === 'calculator' && (
                    <ChatLoanEstimator
                      onNavigate={handleLink}
                    />
                  )}

                  {/* Timestamp */}
                  <Typography sx={{ fontSize: '0.62rem', color: '#AAA', px: 0.5 }}>
                    {formatTime(msg.timestamp)}
                  </Typography>

                  {/* Page link CTA */}
                  {msg.link && (
                    <Box
                      onClick={() => handleLink(msg.link!.path)}
                      sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 0.5,
                        bgcolor: '#FFF0F1', border: '1px solid #FFCDD2',
                        borderRadius: '8px', px: 1.5, py: 0.75,
                        cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, color: '#EB0A1E',
                        transition: 'all 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
                        '&:hover': { bgcolor: '#EB0A1E', color: '#FFF', borderColor: '#EB0A1E' },
                        '&:active': { transform: 'scale(0.97)' },
                      }}
                    >
                      <OpenInNewIcon sx={{ fontSize: 13 }} />
                      {msg.link.label}
                    </Box>
                  )}

                  {/* Quick reply chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.25 }}>
                      {msg.quickReplies.map((qr) => (
                        <Chip
                          key={qr.value}
                          label={qr.label}
                          size="small"
                          onClick={() => handleQuickReply(qr.value)}
                          sx={{
                            fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                            bgcolor: '#FFF', border: '1px solid #DCDCDC', color: '#1E1E1E',
                            borderRadius: '8px', height: 28,
                            transition: 'all 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
                            '&:hover': { bgcolor: '#EB0A1E', color: '#FFF', borderColor: '#EB0A1E' },
                            '&:active': { transform: 'scale(0.97)' },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}

            {/* Typing indicator */}
            {typing && (
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: '#EB0A1E' }}>
                  <SmartToyIcon sx={{ fontSize: 15 }} />
                </Avatar>
                <Box sx={{ bgcolor: '#FFF', border: '1px solid #EAEAEA', borderRadius: '14px 14px 14px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <TypingIndicator />
                </Box>
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input Section */}
          <Box
            sx={{
              flexShrink: 0, bgcolor: '#FFF',
              borderTop: '1px solid #EAEAEA', px: 1.5, py: 1.25,
              display: 'flex', alignItems: 'center', gap: 1,
            }}
          >
            <TextField
              inputRef={inputRef}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Ask about models, rebates, finance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', fontSize: '0.82rem',
                  '& fieldset': { borderColor: '#E0E0E0' },
                  '&:hover fieldset': { borderColor: '#EB0A1E' },
                  '&.Mui-focused fieldset': { borderColor: '#EB0A1E' },
                },
              }}
              slotProps={{
                input: {
                  endAdornment: typing ? (
                    <InputAdornment position="end">
                      <CircularProgress size={16} sx={{ color: '#EB0A1E' }} />
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || typing}
              sx={{
                bgcolor: input.trim() ? '#EB0A1E' : '#F0F0F0',
                color: input.trim() ? '#FFF' : '#AAA',
                width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                transition: 'all 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
                '&:hover': { bgcolor: '#C8081A', color: '#FFF' },
                '&:active': { transform: 'scale(0.95)' },
                '&.Mui-disabled': { bgcolor: '#F0F0F0', color: '#CCC' },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Footer */}
          <Box sx={{ bgcolor: '#FFF', borderTop: '1px solid #F5F5F5', py: 0.75, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.62rem', color: '#BBB' }}>
              Official Assistant · CFAO Toyota Zimbabwe
            </Typography>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default ToyotaChat;
