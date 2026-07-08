import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import type { CarListing } from '../../types';

const RADIUS = '8px';

interface CarListingModalProps {
  listing: CarListing | null;
  open: boolean;
  onClose: () => void;
}

interface SpecRowItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SpecRowItem: React.FC<SpecRowItemProps> = ({ icon, label, value }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      bgcolor: '#F6F6F8',
      borderRadius: RADIUS,
      px: 1.75,
      py: 1.25,
    }}
  >
    <Box sx={{ color: '#EB0A1E', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: 1.1,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1E1E', lineHeight: 1.3 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export const CarListingModal: React.FC<CarListingModalProps> = ({ listing, open, onClose }) => {
  if (!listing) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* ── Image Banner ── */}
      <Box sx={{ position: 'relative', height: 250, bgcolor: '#1E1E1E', overflow: 'hidden' }}>
        <Box
          component="img"
          src={listing.imageUrl}
          alt={listing.modelName}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
        />

        {/* Dark gradient so text is readable */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%)',
          }}
        />

        {/* Close button */}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#FFFFFF',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px',
            width: 36,
            height: 36,
            '&:hover': { bgcolor: '#EB0A1E' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Category + Featured badges */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {listing.category && (
            <Chip
              label={listing.category.toUpperCase()}
              size="small"
              sx={{
                bgcolor: 'rgba(0,0,0,0.65)',
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
          {listing.featured && (
            <Chip
              label="FEATURED"
              size="small"
              sx={{
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
        </Box>

        {/* Model name + price overlaid on image bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            px: 3,
            pb: 2.5,
            pt: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {listing.modelName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: '1.4rem',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              {listing.price}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Body ── */}
      <DialogContent sx={{ p: 3 }}>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7, mb: 3 }}
        >
          {listing.description}
        </Typography>

        {/* ── Spec Grid ── */}
        <Grid container spacing={1.25} sx={{ mb: listing.features && listing.features.length > 0 ? 3 : 0 }}>
          <Grid size={6}>
            <SpecRowItem
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Year"
              value={String(listing.year)}
            />
          </Grid>
          <Grid size={6}>
            <SpecRowItem
              icon={<SpeedOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Mileage"
              value={listing.mileage}
            />
          </Grid>
          <Grid size={6}>
            <SpecRowItem
              icon={<LocationOnOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Location"
              value={listing.location}
            />
          </Grid>
          <Grid size={6}>
            <SpecRowItem
              icon={<LocalGasStationOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Fuel Type"
              value={listing.fuelType}
            />
          </Grid>
          <Grid size={6}>
            <SpecRowItem
              icon={<SettingsOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Transmission"
              value={listing.transmission}
            />
          </Grid>
          {listing.engineCc && (
            <Grid size={6}>
              <SpecRowItem
                icon={<ElectricBoltOutlinedIcon sx={{ fontSize: 18 }} />}
                label="Engine"
                value={listing.engineCc}
              />
            </Grid>
          )}
          {listing.powerHp && !listing.engineCc && (
            <Grid size={6}>
              <SpecRowItem
                icon={<ElectricBoltOutlinedIcon sx={{ fontSize: 18 }} />}
                label="Power"
                value={listing.powerHp}
              />
            </Grid>
          )}
        </Grid>

        {/* ── Key Features ── */}
        {listing.features && listing.features.length > 0 && (
          <>
            <Box sx={{ height: '1px', bgcolor: '#F0F0F0', mb: 2.5 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Key Features
            </Typography>
            <Grid container spacing={1}>
              {listing.features.map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleOutlineIcon
                      color="primary"
                      sx={{ fontSize: 16, mt: 0.2, flexShrink: 0 }}
                    />
                    <Typography variant="body2" sx={{ color: '#3A3A3A', lineHeight: 1.4 }}>
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>

      {/* ── Footer Actions ── */}
      <Box
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
          display: 'flex',
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          sx={{
            borderRadius: RADIUS,
            fontWeight: 700,
            textTransform: 'none',
            borderColor: '#DCDCDC',
            color: 'text.primary',
            '&:hover': { borderColor: '#1E1E1E', bgcolor: 'transparent' },
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/contact"
          onClick={onClose}
          sx={{
            borderRadius: RADIUS,
            fontWeight: 700,
            textTransform: 'none',
            bgcolor: '#EB0A1E',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#C8081A',
              boxShadow: '0 4px 14px rgba(235,10,30,0.3)',
            },
          }}
        >
          Enquire Now
        </Button>
      </Box>
    </Dialog>
  );
};

export default CarListingModal;
