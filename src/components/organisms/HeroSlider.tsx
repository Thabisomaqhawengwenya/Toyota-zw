import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'THE ALL-NEW LAND CRUISER PRADO',
    subtitle: 'UNLEASH THE LEGEND',
    desc: 'Indomitable heritage met with executive luxury. Build your legacy on Zimbabwe\'s roads with unparalleled performance and terrain control.',
    image: '/images/prado.png',
    link: '/vehicles?category=4x4',
    cta: 'EXPLORE LAND CRUISER RANGE'
  },
  {
    title: 'TOYOTA HILUX DOUBLE CAB',
    subtitle: 'LEGENDARY TOUGHNESS',
    desc: 'For business, farming, and recreation—the Hilux is engineered to carry any load, conquer any trail, and outlast the competition.',
    image: '/images/hilux.png',
    link: '/vehicles?category=Pick-up',
    cta: 'VIEW HILUX MODELS'
  },
  {
    title: 'COROLLA CROSS HYBRID (HEV)',
    subtitle: 'EFFICIENCY MEETS STYLE',
    desc: 'The perfect compact SUV. Advanced self-charging hybrid technology, maximizing fuel economy and lowering carbon emissions without plugging in.',
    image: '/images/corolla-cross-hev.png',
    link: '/vehicles?category=SUV',
    cta: 'DISCOVER HYBRID TECHNOLOGY'
  }
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
        height: { xs: '70vh', md: '85vh' },
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
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.7) 100%), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {idx === current && (
            <Box
              sx={{
                color: 'white',
                px: { xs: 4, md: 10 },
                maxWidth: { xs: '100%', md: 680 },
              }}
            >
              {/* Subtitle */}
              <Typography
                sx={{
                  color: 'primary.main',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  fontSize: '0.85rem',
                  mb: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                {slide.subtitle}
              </Typography>

              {/* Title */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  mb: 2.5,
                  letterSpacing: '-0.5px',
                }}
              >
                {slide.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: '#CCCCCC',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                {slide.desc}
              </Typography>

              {/* CTA Button */}
              <Button
                component={Link}
                to={slide.link}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 700,
                  borderRadius: '7px',
                  fontSize: '0.875rem',
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
          )}
        </Box>
      ))}

      {/* Slide Indicator Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 28,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          zIndex: 2,
        }}
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrent(idx)}
            sx={{
              width: idx === current ? 30 : 10,
              height: 10,
              bgcolor: idx === current ? 'primary.main' : 'rgba(255,255,255,0.4)',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlider;
