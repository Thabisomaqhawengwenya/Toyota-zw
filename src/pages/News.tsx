import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Tooltip,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import RssFeedIcon from '@mui/icons-material/RssFeed';

import {
  fetchToyotaZimbabweNews,
  type NewsArticle,
  CURATED_ZIMBABWE_NEWS,
} from '../services/newsService';

const CATEGORIES = ['All', 'LAUNCH', 'CORPORATE', 'PARTNERSHIP', 'ENVIRONMENT', 'DEALERSHIP', 'COMMUNITY'];

export const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(CURATED_ZIMBABWE_NEWS);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSource, setActiveSource] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Load news on mount
  const loadNews = useCallback(async (force = false) => {
    setLoading(true);
    try {
      const result = await fetchToyotaZimbabweNews({ forceRefresh: force });
      setArticles(result.articles);
      setLastUpdated(result.lastUpdated);
    } catch {
      // Graceful fallback to default
      setArticles(CURATED_ZIMBABWE_NEWS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews(false);
  }, [loadNews]);

  // Extract unique sources for filter
  const uniqueSources = useMemo(() => {
    const set = new Set(articles.map((a) => a.source));
    return ['All', ...Array.from(set)];
  }, [articles]);

  // Filtered list
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
      const matchesSource = activeSource === 'All' || a.source === activeSource;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q);

      return matchesCategory && matchesSource && matchesQuery;
    });
  }, [articles, activeCategory, activeSource, searchQuery]);

  const featured = useMemo(() => {
    return filtered.find((a) => a.featured) || filtered[0] || articles[0];
  }, [filtered, articles]);

  const nonFeatured = useMemo(() => {
    return filtered.filter((a) => a.id !== featured?.id);
  }, [filtered, featured]);

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {
        // Ignored
      });
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* ── Visual Banner ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: '#1E1E1E',
          color: 'white',
          py: { xs: 7, md: 10 },
          textAlign: 'center',
          borderBottom: '4px solid #EB0A1E',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <RssFeedIcon sx={{ color: '#EB0A1E', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px' }}>
              ZIMBABWE AUTOMOTIVE DESK
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            TOYOTA ZIMBABWE NEWS
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 620, mx: 'auto' }}>
            Live updates on new Toyota launches, CFAO Mobility Zimbabwe announcements, mining and corporate fleet deliveries, and national sports partnerships.
          </Typography>
        </Container>
      </Box>

      {/* ── Live Status & Search Action Bar ───────────────────────────────── */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #EAEAEA', py: 2.5 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', md: 'center' },
              gap: 2,
            }}
          >
            {/* Live Feed Status Pill */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#4CAF50',
                  boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.25)',
                  animation: 'pulseDot 2s infinite',
                  '@keyframes pulseDot': {
                    '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' },
                    '70%': { transform: 'scale(1)', boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)' },
                    '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
                  },
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '0.82rem', color: '#1E1E1E', lineHeight: 1.2 }}>
                  LIVE ZIMBABWE NEWS FEED
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
                  Updated: {lastUpdated} · {articles.length} verified stories
                </Typography>
              </Box>
            </Box>

            {/* Search and Refresh Action */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search models, Sables, mining..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  minWidth: { xs: '100%', sm: 260 },
                  bgcolor: '#FFF',
                  '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '0.85rem' },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Tooltip title="Fetch latest news updates">
                <span>
                  <Button
                    variant="contained"
                    onClick={() => loadNews(true)}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      bgcolor: '#EB0A1E',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                      borderRadius: '6px',
                      px: 2,
                      py: 1,
                      textTransform: 'none',
                      transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.15s',
                      '&:hover': { bgcolor: '#C8081A' },
                      '&:active': { transform: 'scale(0.97)' },
                    }}
                  >
                    {loading ? 'Fetching...' : 'Fetch News'}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Main Content Area ─────────────────────────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Category Filters */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase', mr: 0.5 }}>
            Categories:
          </Typography>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActiveCategory(cat)}
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                borderRadius: '6px',
                cursor: 'pointer',
                bgcolor: activeCategory === cat ? '#EB0A1E' : '#FFF',
                color: activeCategory === cat ? '#FFF' : 'text.primary',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#EB0A1E' : '#E0E0E0',
                transition: 'all 0.15s ease-out',
                '&:hover': {
                  bgcolor: activeCategory === cat ? '#C8081A' : '#F6F6F6',
                  borderColor: '#EB0A1E',
                  color: activeCategory === cat ? '#FFF' : '#EB0A1E',
                },
                '&:active': { transform: 'scale(0.97)' },
              }}
            />
          ))}
        </Box>

        {/* Source Filters */}
        <Box sx={{ mb: 5, display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase', mr: 0.5 }}>
            Sources:
          </Typography>
          {uniqueSources.map((source) => (
            <Chip
              key={source}
              label={source}
              size="small"
              onClick={() => setActiveSource(source)}
              sx={{
                fontSize: '0.68rem',
                fontWeight: activeSource === source ? 800 : 500,
                borderRadius: '4px',
                cursor: 'pointer',
                bgcolor: activeSource === source ? '#1E1E1E' : '#FAFAFA',
                color: activeSource === source ? '#FFF' : 'text.secondary',
                border: '1px solid',
                borderColor: activeSource === source ? '#1E1E1E' : '#EAEAEA',
                '&:hover': { borderColor: '#1E1E1E' },
              }}
            />
          ))}
        </Box>

        {/* ── Featured Story Banner ────────────────────────────────────────── */}
        {featured && (
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px' }}>
                ⭐ FEATURED STORY
              </Typography>
              <Chip
                label={featured.source}
                size="small"
                sx={{ bgcolor: '#FFF', border: '1px solid #E0E0E0', fontWeight: 700, fontSize: '0.7rem' }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                border: '1px solid #EAEAEA',
                overflow: 'hidden',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.25s, transform 0.25s',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  '& img': { transform: 'scale(1.03)' },
                },
              }}
              onClick={() => setSelectedArticle(featured)}
            >
              <Box sx={{ flex: '0 0 50%', height: { xs: 240, md: 400 }, overflow: 'hidden', bgcolor: '#F0F0F0' }}>
                <Box
                  component="img"
                  src={featured.image}
                  alt={featured.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
              </Box>

              <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={featured.category}
                    size="small"
                    sx={{
                      bgcolor: featured.categoryColor,
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: '0.65rem',
                      borderRadius: '4px',
                      height: 22,
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 13, color: '#888' }} />
                    <Typography variant="caption" color="text.secondary">{featured.date}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 13, color: '#888' }} />
                    <Typography variant="caption" color="text.secondary">{featured.readTime}</Typography>
                  </Box>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.25, fontSize: { xs: '1.4rem', md: '1.85rem' } }}>
                  {featured.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                  {featured.excerpt}
                </Typography>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    fontWeight: 800,
                    color: '#EB0A1E',
                    textTransform: 'none',
                    alignSelf: 'flex-start',
                    p: 0,
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                  }}
                >
                  Read Full Story
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 6 }} />

        {/* ── Articles Grid ───────────────────────────────────────────────── */}
        <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '2px', color: 'text.secondary', mb: 3 }}>
          ALL ARTICLES ({nonFeatured.length})
        </Typography>

        {nonFeatured.length > 0 ? (
          <Grid container spacing={3.5}>
            {nonFeatured.map((article) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                <Card
                  onClick={() => setSelectedArticle(article)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: '1px solid #EAEAEA',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    transition: 'transform 0.22s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.22s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.1)',
                      '& img': { transform: 'scale(1.04)' },
                    },
                  }}
                >
                  <Box sx={{ height: 210, overflow: 'hidden', bgcolor: '#F0F0F0', position: 'relative' }}>
                    <Box
                      component="img"
                      src={article.image}
                      alt={article.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                    />
                    <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.75 }}>
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          bgcolor: article.categoryColor,
                          color: '#FFF',
                          fontWeight: 800,
                          fontSize: '0.62rem',
                          borderRadius: '4px',
                          height: 20,
                        }}
                      />
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 2.75, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#EB0A1E', fontSize: '0.72rem' }}>
                        {article.source}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>
                        {article.date}
                      </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.35, mb: 1.5 }}>
                      {article.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2.5, flexGrow: 1, fontSize: '0.82rem' }}>
                      {article.excerpt}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px solid #F0F0F0' }}>
                      <Typography variant="caption" color="text.secondary">
                        {article.readTime}
                      </Typography>
                      <Button
                        size="small"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                        sx={{
                          fontWeight: 700,
                          color: '#EB0A1E',
                          textTransform: 'none',
                          p: 0,
                          fontSize: '0.78rem',
                          '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                        }}
                      >
                        Read
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ borderRadius: '8px', my: 4 }}>
            No news articles match your search or selected filter. Try choosing "All" or refining your search term.
          </Alert>
        )}
      </Container>

      {/* ── Article Detail Modal ──────────────────────────────────────────── */}
      <Dialog
        open={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiPaper-root': { borderRadius: '12px', overflow: 'hidden' },
        }}
      >
        {selectedArticle && (
          <>
            <DialogTitle
              sx={{
                bgcolor: '#1E1E1E',
                color: '#FFF',
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={selectedArticle.category}
                  size="small"
                  sx={{ bgcolor: selectedArticle.categoryColor, color: '#FFF', fontWeight: 800, fontSize: '0.65rem' }}
                />
                <Typography variant="caption" sx={{ color: '#AAA' }}>
                  Source: <strong>{selectedArticle.source}</strong>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title={copied ? 'Copied link!' : 'Share article'}>
                  <IconButton size="small" onClick={() => handleShare(selectedArticle)} sx={{ color: '#FFF' }}>
                    {copied ? <CheckIcon fontSize="small" sx={{ color: '#4CAF50' }} /> : <ShareIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                <IconButton size="small" onClick={() => setSelectedArticle(null)} sx={{ color: '#FFF' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Box
                component="img"
                src={selectedArticle.image}
                alt={selectedArticle.title}
                sx={{
                  width: '100%',
                  height: { xs: 220, md: 340 },
                  objectFit: 'cover',
                  borderRadius: '8px',
                  mb: 3,
                }}
              />

              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5, lineHeight: 1.25, fontSize: { xs: '1.4rem', md: '1.85rem' } }}>
                {selectedArticle.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2, borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap' }}>
                <Typography variant="caption" color="text.secondary">
                  Published: <strong>{selectedArticle.date}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reading time: <strong>{selectedArticle.readTime}</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 700 }}>
                  {selectedArticle.source}
                </Typography>
              </Box>

              {/* Body Paragraphs */}
              {selectedArticle.body.split('\n\n').map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ color: '#333', lineHeight: 1.8, mb: 2, fontSize: '0.95rem' }}
                >
                  {paragraph}
                </Typography>
              ))}

              {/* Source Link & CTAs */}
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                {selectedArticle.sourceUrl ? (
                  <Button
                    variant="outlined"
                    size="small"
                    component="a"
                    href={selectedArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      borderColor: '#CCC',
                      color: '#1E1E1E',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      textTransform: 'none',
                      borderRadius: '6px',
                      '&:hover': { borderColor: '#EB0A1E', color: '#EB0A1E' },
                    }}
                  >
                    View Original on {selectedArticle.source}
                  </Button>
                ) : (
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Official CFAO Mobility Zimbabwe Press Bulletin
                  </Typography>
                )}

                <Button
                  variant="contained"
                  onClick={() => setSelectedArticle(null)}
                  sx={{
                    bgcolor: '#1E1E1E',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    borderRadius: '6px',
                    '&:hover': { bgcolor: '#333' },
                  }}
                >
                  Close Story
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default News;
