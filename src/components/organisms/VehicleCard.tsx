import React from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Vehicle } from '../../types';
import { useComparisonStore } from '../../store/comparisonStore';
import { useSavedStore } from '../../store/savedStore';

const BTN_RADIUS = '6px';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}

interface SpecColProps {
  label: string;
  value: string;
}

const SpecCol: React.FC<SpecColProps> = ({ label, value }) => (
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Typography
      sx={{
        fontSize: '0.62rem',
        fontWeight: 700,
        color: '#EB0A1E',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        lineHeight: 1.2,
        mb: 0.5,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: '0.9rem',
        fontWeight: 700,
        color: '#1E1E1E',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {value}
    </Typography>
  </Box>
);

// Convert Vehicle to a minimal CarListing shape for the saved store
const vehicleToSaveable = (v: Vehicle) => ({
  id: v.id,
  modelName: v.modelName,
  year: new Date().getFullYear(),
  price: v.priceRange,
  mileage: 'Brand New',
  location: 'Zimbabwe',
  imageUrl: v.imageUrl,
  description: v.description,
  transmission: v.transmission,
  fuelType: v.fuelType,
  category: v.category,
  engineCc: v.engineCc,
  powerHp: v.powerHp,
  features: v.features,
});

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onViewDetails: _onViewDetails }) => {
  const { selectedVehicles, addToComparison, removeFromComparison } = useComparisonStore();
  const { toggleSaved, isSaved } = useSavedStore();

  const isCompared = selectedVehicles.some((v) => v.id === vehicle.id);
  const saved = isSaved(vehicle.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(vehicle.id);
    } else {
      addToComparison(vehicle);
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaved(vehicleToSaveable(vehicle));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #E8E8E8',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        height: '100%',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 32px rgba(0,0,0,0.11)',
        },
      }}
    >
      {/* ── Image ── */}
      <Box sx={{ position: 'relative', height: 210, overflow: 'hidden', bgcolor: '#F5F5F5' }}>
        <Box
          component="img"
          src={vehicle.imageUrl}
          alt={vehicle.modelName}
          loading="lazy"
          width={600}
          height={420}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.45s ease',
            '&:hover': { transform: 'scale(1.04)' },
          }}
        />

        {/* Heart button — top right on image */}
        <IconButton
          aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
          onClick={handleSaveToggle}
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
      </Box>

      {/* ── Content ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, px: 2.5, pt: 2.25, pb: 2.5 }}>

        {/* Model name */}
        <Typography
          component="h3"
          sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1E1E', lineHeight: 1.25, mb: 0.5 }}
        >
          {vehicle.modelName}
        </Typography>

        {/* Price range */}
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1E1E', mb: 1.25 }}>
          {vehicle.priceRange}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#555759',
            lineHeight: 1.55,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {vehicle.description}
        </Typography>

        <Divider sx={{ mb: 2, borderColor: '#EFEFEF' }} />

        {/* Spec Columns */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2.25 }}>
          <SpecCol label="Engine" value={vehicle.engineCc} />
          <SpecCol label="Gearbox" value={vehicle.transmission} />
          <SpecCol label="Fuel" value={vehicle.fuelType.split(' ')[0]} />
        </Box>

        <Divider sx={{ mb: 2.25, borderColor: '#EFEFEF' }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1.25, mt: 'auto' }}>
          {/* Details */}
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to={`/vehicles/${vehicle.id}`}
            startIcon={<InfoOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              borderRadius: BTN_RADIUS,
              borderColor: '#1E1E1E',
              color: '#1E1E1E',
              py: 1.1,
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#1E1E1E', color: '#FFFFFF', borderColor: '#1E1E1E' },
            }}
          >
            Details
          </Button>

          {/* COMPARE */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleCompareToggle}
            startIcon={
              isCompared
                ? <RemoveCircleOutlineIcon sx={{ fontSize: '1rem !important' }} />
                : <CompareArrowsIcon sx={{ fontSize: '1rem !important' }} />
            }
            sx={{
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              borderRadius: BTN_RADIUS,
              borderColor: '#EB0A1E',
              color: isCompared ? '#FFFFFF' : '#EB0A1E',
              bgcolor: isCompared ? '#EB0A1E' : 'transparent',
              py: 1.1,
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: isCompared ? '#C8081A' : '#EB0A1E',
                color: '#FFFFFF',
                borderColor: '#EB0A1E',
              },
            }}
          >
            {isCompared ? 'Added' : 'Compare'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleCard;
