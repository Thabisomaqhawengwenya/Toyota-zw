import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'THE ALL-NEW LAND CRUISER PRADO',
    subtitle: 'UNLEASH THE LEGEND',
    desc: "Indomitable heritage met with executive luxury. Build your legacy on Zimbabwe's roads with unparalleled performance and terrain control.",
    image: '/images/prado.png',
    link: '/vehicles?category=4x4',
    cta: 'EXPLORE LAND CRUISER RANGE',
    position: 'center right',
  },
  {
    title: 'TOYOTA HILUX DOUBLE CAB',
    subtitle: 'LEGENDARY TOUGHNESS',
    desc: 'For business, farming, and recreation — the Hilux is engineered to carry any load, conquer any trail, and outlast the competition.',
    image: '/images/hilux.png',
    link: '/vehicles?category=Pick-up',
    cta: 'VIEW HILUX MODELS',
    position: 'center right',
  },
  {
    title: 'COROLLA CROSS HYBRID (HEV)',
    subtitle: 'EFFICIENCY MEETS STYLE',
    desc: 'The perfect compact SUV. Advanced self-charging hybrid technology, maximizing fuel economy and lowering carbon emissions without plugging in.',
    image: '/images/corolla-cross-hev.png',
    link: '/vehicles?category=SUV',
    cta: 'DISCOVER HYBRID TECHNOLOGY',
    position: 'center center',
  },
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '100vw', sm: '75vh', md: '85vh' },
        minHeight: { xs: 480, sm: 500 },
        maxHeight: { xs: 680, md: 900 },
        overflow: 'hidden',
        bgcolor: '#000000',
      }}
    >
      {slides.map((slide, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: idx === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: idx === current ? 1 : 0,
          }}
        >
          {/* Background image — fills 100% with object-fit cover */}
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            // First slide is the LCP element — load eagerly and hint high priority
            // Subsequent slides are off-screen at load time — defer them
            {...(idx === 0
              ? { fetchPriority: 'high' as const }
              : { loading: 'lazy' as const }
            )}
            width={1600}
            height={900}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: slide.position,
              display: 'block',
            }}
          />

          {/* Dark gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: {
                xs: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.9) 100%)',
                md: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)',
              },
            }}
          />

          {/* Content */}
          {idx === current && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: { xs: 'flex-end', md: 'center' },
                px: { xs: 3, sm: 5, md: 10 },
                pb: { xs: 8, md: 0 },
              }}
            >
              <Box sx={{ color: 'white', maxWidth: { xs: '100%', md: 640 } }}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    letterSpacing: '3px',
                    fontSize: { xs: '0.7rem', md: '0.85rem' },
                    mb: 1.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {slide.subtitle}
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    letterSpacing: '-0.5px',
                  }}
                >
                  {slide.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#CCCCCC',
                    fontSize: { xs: '0.875rem', md: '1.05rem' },
                    lineHeight: 1.7,
                    mb: 3.5,
                    maxWidth: 500,
                  }}
                >
                  {slide.desc}
                </Typography>

                <Button
                  component={Link}
                  to={slide.link}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: { xs: 3, md: 4 },
                    fontWeight: 700,
                    borderRadius: '7px',
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                    letterSpacing: '0.06em',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#C8081A',
                      boxShadow: '0 4px 20px rgba(235,10,30,0.4)',
                    },
                  }}
                >
                  {slide.cta}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ))}

      {/* Slide indicator dots */}
      <Box
        role="tablist"
        aria-label="Slide navigation"
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 28 },
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          zIndex: 2,
        }}
      >
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Slide ${idx + 1}: ${slide.title}`}
            tabIndex={0}
            onClick={() => setCurrent(idx)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setCurrent(idx)}
            sx={{
              width: idx === current ? 30 : 10,
              height: 10,
              bgcolor: idx === current ? 'primary.main' : 'rgba(255,255,255,0.4)',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:focus-visible': {
                outline: '2px solid #FFFFFF',
                outlineOffset: '2px',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlider;
