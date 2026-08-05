import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, Typography, IconButton, TextField, InputAdornment,
  Chip, Fade, Avatar, CircularProgress, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MinimizeIcon from '@mui/icons-material/Remove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  matchIntent,
  GREETING_RESPONSE,
  FALLBACK_RESPONSES,
  type QuickReply,
} from '../../data/chatbotKnowledge';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
  link?: { label: string; path: string };
  timestamp: Date;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
let msgCounter = 0;
const makeId = () => `msg_${++msgCounter}_${Date.now()}`;

/** Convert **bold** markers to JSX */
const renderText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
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

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 1 }}>
    {[0, 1, 2].map(i => (
      <Box
        key={i}
        sx={{
          width: 7, height: 7, borderRadius: '50%', bgcolor: '#EB0A1E',
          animation: 'bounce 1.2s infinite',
          animationDelay: `${i * 0.2}s`,
          '@keyframes bounce': {
            '0%, 80%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
            '40%': { transform: 'translateY(-6px)', opacity: 1 },
          },
        }}
      />
    ))}
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────────
export const ToyotaChat: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [unread, setUnread] = useState(0);
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
  ) => {
    const msg: Message = { id: makeId(), role: 'bot', text, quickReplies, link, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
    if (!open || minimised) setUnread(n => n + 1);
  }, [open, minimised]);

  const handleOpen = () => {
    setOpen(true);
    setMinimised(false);
    setUnread(0);
    if (!hasOpened) {
      setHasOpened(true);
      // Send greeting after brief delay
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          addBotMessage(
            GREETING_RESPONSE.text,
            GREETING_RESPONSE.quickReplies,
          );
        }, 900);
      }, 300);
    }
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

    // Show typing indicator
    setTyping(true);

    // Simulate processing delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      const intent = matchIntent(trimmed);
      if (intent) {
        addBotMessage(intent.response, intent.quickReplies, intent.link);
      } else {
        // Rotate fallback messages
        const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        addBotMessage(fallback, [
          { label: '🚗 Browse Models', value: 'show me your vehicles' },
          { label: '📅 Test Drive', value: 'book a test drive' },
          { label: '📍 Branches', value: 'branch locations' },
          { label: '📞 Contact Us', value: 'contact' },
        ]);
      }
    }, delay);
  }, [addBotMessage]);

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
                  '&:hover': { bgcolor: '#2A2A2A' },
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
          <Tooltip title="Chat with us" placement="left">
            <Box
              onClick={handleOpen}
              sx={{
                width: 60, height: 60, borderRadius: '50%',
                bgcolor: '#EB0A1E', color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 6px 24px rgba(235,10,30,0.45)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.1)', boxShadow: '0 8px 32px rgba(235,10,30,0.55)' },
              }}
            >
              {unread > 0 && !minimised && (
                <Box sx={{ position: 'absolute', top: -4, right: -4, bgcolor: '#1E1E1E', color: '#FFF', borderRadius: '50%', width: 20, height: 20, fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #EB0A1E' }}>
                  {unread}
                </Box>
              )}
              <ChatIcon sx={{ fontSize: 26 }} />
            </Box>
          </Tooltip>
        </Box>
      </Fade>

      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <Fade in={open && !minimised}>
        <Box
          sx={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 1400,
            width: { xs: 'calc(100vw - 32px)', sm: 380 },
            maxHeight: { xs: 'calc(100vh - 60px)', sm: 620 },
            display: open && !minimised ? 'flex' : 'none',
            flexDirection: 'column',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 16px 60px rgba(0,0,0,0.22)',
            border: '1px solid #EAEAEA',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: '#1E1E1E', px: 2, py: 1.5,
              display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0,
            }}
          >
            <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#EB0A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <SmartToyIcon sx={{ color: '#FFF', fontSize: 20 }} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.875rem', lineHeight: 1.2 }}>
                Toyota Assistant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                <Typography sx={{ color: '#AAA', fontSize: '0.7rem' }}>Online — CFAO Toyota Zimbabwe</Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={handleMinimise} sx={{ color: '#AAA', '&:hover': { color: '#FFF' } }}>
              <MinimizeIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleClose} sx={{ color: '#AAA', '&:hover': { color: '#EB0A1E' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flexGrow: 1, overflowY: 'auto', p: 2,
              bgcolor: '#F8F8F8',
              display: 'flex', flexDirection: 'column', gap: 1.5,
              '&::-webkit-scrollbar': { width: 4 },
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
                    bgcolor: msg.role === 'bot' ? '#EB0A1E' : '#1E1E1E',
                    mb: 0.25,
                  }}
                >
                  {msg.role === 'bot'
                    ? <SmartToyIcon sx={{ fontSize: 15 }} />
                    : <PersonIcon sx={{ fontSize: 15 }} />}
                </Avatar>

                <Box sx={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {/* Bubble */}
                  <Box
                    sx={{
                      bgcolor: msg.role === 'user' ? '#EB0A1E' : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFF' : '#1E1E1E',
                      px: 2, py: 1.25,
                      borderRadius: msg.role === 'user'
                        ? '14px 14px 4px 14px'
                        : '14px 14px 14px 4px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      border: msg.role === 'bot' ? '1px solid #EAEAEA' : 'none',
                    }}
                  >
                    {msg.role === 'bot'
                      ? <BotText text={msg.text} />
                      : <Typography variant="body2" sx={{ fontSize: '0.82rem', lineHeight: 1.5 }}>{msg.text}</Typography>}
                  </Box>

                  {/* Timestamp */}
                  <Typography sx={{ fontSize: '0.62rem', color: '#AAA', px: 0.5 }}>
                    {formatTime(msg.timestamp)}
                  </Typography>

                  {/* Page link */}
                  {msg.link && (
                    <Box
                      onClick={() => handleLink(msg.link!.path)}
                      sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 0.5,
                        bgcolor: '#FFF0F1', border: '1px solid #FFCDD2',
                        borderRadius: '8px', px: 1.5, py: 0.75,
                        cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, color: '#EB0A1E',
                        '&:hover': { bgcolor: '#EB0A1E', color: '#FFF', borderColor: '#EB0A1E' },
                        transition: 'all 0.2s',
                      }}
                    >
                      <OpenInNewIcon sx={{ fontSize: 13 }} />
                      {msg.link.label}
                    </Box>
                  )}

                  {/* Quick replies */}
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
                            '&:hover': { bgcolor: '#EB0A1E', color: '#FFF', borderColor: '#EB0A1E' },
                            transition: 'all 0.18s',
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

          {/* Input */}
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
              placeholder="Ask me anything about Toyota..."
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
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#C8081A', color: '#FFF' },
                '&.Mui-disabled': { bgcolor: '#F0F0F0', color: '#CCC' },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Footer */}
          <Box sx={{ bgcolor: '#FFF', borderTop: '1px solid #F5F5F5', py: 0.75, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.62rem', color: '#CCC' }}>
              Powered by Toyota Zimbabwe · CFAO Group
            </Typography>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default ToyotaChat;
