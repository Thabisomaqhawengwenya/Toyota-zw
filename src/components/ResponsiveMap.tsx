import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Typography, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PhoneIcon from '@mui/icons-material/Phone';

import { TOYOTA_ZIMBABWE_DEALERSHIPS } from '../data/dealerships';
import type { DealershipLocation } from '../data/dealerships';

export interface ResponsiveMapProps {
  /** Explicit Google Maps embed URL (pb=... or maps?q=...) */
  embedUrl?: string;
  /** Address, coordinates, or search query to auto-generate embed URL */
  searchQuery?: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Aspect ratio fallback (e.g. '16 / 9', '4 / 3') */
  aspectRatio?: string;
  /** Minimum height in pixels or CSS value */
  minHeight?: number | string;
  /** Whether to show the fast branch location selector pills above/inside the map */
  showBranchSelector?: boolean;
  /** Currently selected branch ID (defaults to 'cfao-harare') */
  selectedBranchId?: string;
  /** Callback fired when a branch pill is clicked */
  onSelectBranch?: (branch: DealershipLocation) => void;
  /** Optional container SX override */
  sx?: SxProps<Theme>;
}

export const ResponsiveMap: React.FC<ResponsiveMapProps> = ({
  embedUrl,
  searchQuery,
  title = 'Toyota Dealership Location Map',
  aspectRatio = '16 / 9',
  minHeight = 400,
  showBranchSelector = true,
  selectedBranchId = 'cfao-harare',
  onSelectBranch,
  sx
}) => {
  const [activeBranchId, setActiveBranchId] = useState(selectedBranchId);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync external prop if changed
  useEffect(() => {
    if (selectedBranchId) {
      setActiveBranchId(selectedBranchId);
      setIsLoaded(false);
    }
  }, [selectedBranchId]);

  const activeBranch = TOYOTA_ZIMBABWE_DEALERSHIPS.find(b => b.id === activeBranchId) || TOYOTA_ZIMBABWE_DEALERSHIPS[0];

  // Compute final embed URL
  const resolvedUrl = embedUrl || (
    searchQuery
      ? `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(`${activeBranch.name}, ${activeBranch.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  );

  const handleBranchClick = (branch: DealershipLocation) => {
    if (branch.id === activeBranchId) return;
    setIsLoaded(false);
    setActiveBranchId(branch.id);
    if (onSelectBranch) {
      onSelectBranch(branch);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, ...sx }}>
      {/* Branch selector quick pills across Zimbabwe */}
      {showBranchSelector && (
        <Box sx={{ overflowX: 'auto', pb: 0.5 }}>
          <Stack direction="row" spacing={1} sx={{ minWidth: 'max-content', py: 0.5 }}>
            {TOYOTA_ZIMBABWE_DEALERSHIPS.map((branch) => {
              const isSelected = branch.id === activeBranchId;
              return (
                <Chip
                  key={branch.id}
                  label={branch.shortName}
                  size="small"
                  onClick={() => handleBranchClick(branch)}
                  icon={<LocationOnIcon sx={{ fontSize: '14px !important', color: isSelected ? '#FFFFFF !important' : '#EB0A1E !important' }} />}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    borderRadius: '4px',
                    px: 0.5,
                    bgcolor: isSelected ? '#EB0A1E' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#1E1E1E',
                    border: isSelected ? '1px solid #EB0A1E' : '1px solid #E0E0E0',
                    boxShadow: isSelected ? '0 2px 8px rgba(235, 10, 30, 0.25)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                    '&:hover': {
                      bgcolor: isSelected ? '#C8081A' : '#F5F5F5',
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Main Map Box */}
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
                bgcolor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <LocationOnIcon sx={{ color: '#EB0A1E', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                Loading {activeBranch.city} map…
              </Typography>
            </Box>
          </Box>
        )}

        {/* Responsive Interactive iFrame */}
        <Box
          component="iframe"
          key={resolvedUrl}
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

        {/* HUD Info Badge: Active Branch Detail */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            right: { xs: 12, sm: 'auto' },
            maxWidth: { sm: 380 },
            bgcolor: 'rgba(15, 15, 15, 0.90)',
            color: 'white',
            p: 1.5,
            borderRadius: '4px',
            borderLeft: '3px solid #EB0A1E',
            zIndex: 3,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '1px', display: 'block', textTransform: 'uppercase', fontSize: '0.65rem' }}>
              {activeBranch.city} Dealership
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeBranch.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeBranch.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
            <Tooltip title={`Call ${activeBranch.phone}`}>
              <IconButton
                size="small"
                component="a"
                href={`tel:${activeBranch.phone}`}
                sx={{ color: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in Google Maps">
              <IconButton
                size="small"
                component="a"
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#FFFFFF', bgcolor: '#EB0A1E', '&:hover': { bgcolor: '#C8081A' } }}
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
