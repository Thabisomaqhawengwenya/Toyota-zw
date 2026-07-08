import React from 'react';
import { Box, Typography, Button, Chip, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import type { CarListing } from '../../types';
import { useSavedStore } from '../../store/savedStore';

const RADIUS = '7px';

interface CarListingCardProps {
  listing: CarListing;
  onReadMore: (listing: CarListing) => void;
}

interface SpecPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SpecPill: React.FC<SpecPillProps> = ({ icon, label, value }) => (
  <Tooltip title={label} placement="top" arrow>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        bgcolor: '#F6F6F8',
        borderRadius: '6px',
        px: 1.25,
        py: 0.75,
        flex: 1,
        minWidth: 0,
      }}
    >
      <Box sx={{ color: '#58595B', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            color: '#888',
            fontWeight: 500,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.8rem',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#1E1E1E',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  </Tooltip>
);

export const CarListingCard: React.FC<CarListingCardProps> = ({ listing, onReadMore }) => {
  const { toggleSaved, isSaved } = useSavedStore();
  const saved = isSaved(listing.id);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '14px',
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid #EBEBEB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        height: '100%',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.11)',
        },
      }}
    >
      {/* ── Image Section ── */}
      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', bgcolor: '#F0F0F0' }}>
        <Box
          component="img"
          src={listing.imageUrl}
          alt={listing.modelName}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.45s ease',
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
          }}
        />

        {/* Featured badge */}
        {listing.featured && (
          <Chip
            label="FEATURED"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: '#EB0A1E',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              height: 24,
              borderRadius: '6px',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        )}

        {/* Heart / Save button — wired to global savedStore */}
        <IconButton
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
          onClick={() => toggleSaved(listing)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            bgcolor: 'rgba(255,255,255,0.92)',
            borderRadius: '8px',
            backdropFilter: 'blur(4px)',
            color: saved ? '#EB0A1E' : '#888',
            transition: 'color 0.2s, transform 0.15s',
            '&:hover': {
              bgcolor: '#FFFFFF',
              color: '#EB0A1E',
              transform: 'scale(1.1)',
            },
          }}
        >
          {saved
            ? <FavoriteIcon sx={{ fontSize: 18 }} />
            : <FavoriteBorderIcon sx={{ fontSize: 18 }} />
          }
        </IconButton>

        {/* Year badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 12,
            bgcolor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: '6px',
            px: 1,
            py: 0.25,
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E1E1E' }}>
            {listing.year}
          </Typography>
        </Box>
      </Box>

      {/* ── Body ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2.5 }}>

        {/* Model name + price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Typography
            component="h3"
            sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.25, color: '#1E1E1E', flex: 1 }}
          >
            {listing.modelName}
          </Typography>
          <Typography
            sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#EB0A1E', whiteSpace: 'nowrap', lineHeight: 1.25 }}
          >
            {listing.price}
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#6B6C6E',
            lineHeight: 1.55,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 40,
          }}
        >
          {listing.description}
        </Typography>

        {/* Spec Pills Row 1 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <SpecPill icon={<SpeedOutlinedIcon sx={{ fontSize: 15 }} />} label="Mileage" value={listing.mileage} />
          <SpecPill icon={<LocationOnOutlinedIcon sx={{ fontSize: 15 }} />} label="Location" value={listing.location} />
        </Box>

        {/* Spec Pills Row 2 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
          <SpecPill icon={<LocalGasStationOutlinedIcon sx={{ fontSize: 15 }} />} label="Fuel" value={listing.fuelType} />
          <SpecPill icon={<SettingsOutlinedIcon sx={{ fontSize: 15 }} />} label="Gearbox" value={listing.transmission} />
        </Box>

        <Box sx={{ height: '1px', bgcolor: '#F0F0F0', mb: 2.5 }} />

        {/* Read More */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onReadMore(listing)}
          sx={{
            mt: 'auto',
            py: 1.3,
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.04em',
            borderRadius: RADIUS,
            textTransform: 'none',
            bgcolor: '#EB0A1E',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#C8081A', boxShadow: '0 4px 14px rgba(235,10,30,0.3)' },
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
};

export default CarListingCard;
