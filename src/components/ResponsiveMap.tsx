import React, { useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface ResponsiveMapProps {
  /** Explicit Google Maps embed URL (pb=... or maps?q=...) */
  embedUrl?: string;
  /** Address, coordinates, or search query to auto-generate embed URL if embedUrl is not provided */
  searchQuery?: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Aspect ratio fallback (e.g. '16 / 9', '4 / 3') */
  aspectRatio?: string;
  /** Minimum height in pixels or CSS value */
  minHeight?: number | string;
  /** Optional container SX override */
  sx?: SxProps<Theme>;
}

export const ResponsiveMap: React.FC<ResponsiveMapProps> = ({
  embedUrl,
  searchQuery,
  title = 'Dealership Location Map',
  aspectRatio = '16 / 9',
  minHeight = 380,
  sx
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute final embed URL
  const resolvedUrl = embedUrl || (
    searchQuery 
      ? `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      : 'https://maps.google.com/maps?q=Harare,Zimbabwe&t=&z=13&ie=UTF8&iwloc=&output=embed'
  );

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight,
        aspectRatio: { xs: '4 / 3', md: aspectRatio },
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: '#F3F4F6',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        ...sx,
      }}
    >
      {/* Loading Skeleton / Placeholder Strategy */}
      {!isLoaded && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#EAEAEA',
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: '20px',
              bgcolor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <LocationOnIcon sx={{ color: '#EB0A1E', fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              Loading map…
            </Typography>
          </Box>
        </Box>
      )}

      {/* Responsive Interactive iFrame */}
      <Box
        component="iframe"
        title={title}
        src={resolvedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
          zIndex: 2,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />
    </Box>
  );
};
