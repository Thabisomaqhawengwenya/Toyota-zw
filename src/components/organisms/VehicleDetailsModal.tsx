import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Grid, Box, Chip, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CompareIcon from '@mui/icons-material/Compare';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import type { Vehicle } from '../../types';
import { useComparisonStore } from '../../store/comparisonStore';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, open, onClose }) => {
  const { selectedVehicles, addToComparison, removeFromComparison } = useComparisonStore();

  if (!vehicle) return null;

  const isCompared = selectedVehicles.some((v) => v.id === vehicle.id);

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromComparison(vehicle.id);
    } else {
      addToComparison(vehicle);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 0 } } }}>
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'secondary.main', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{vehicle.modelName}</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={vehicle.imageUrl}
              alt={vehicle.modelName}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                border: '1px solid #EAEAEA',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip label={vehicle.category} color="primary" sx={{ borderRadius: 0, fontWeight: 700, mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{vehicle.modelName}</Typography>
            <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700, mb: 3 }}>{vehicle.priceRange}</Typography>
            
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              {vehicle.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>ENGINE CAPACITY</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{vehicle.engineCc}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>TRANSMISSION</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{vehicle.transmission}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>FUEL TYPE</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{vehicle.fuelType}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>HORSEPOWER</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{vehicle.powerHp}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>KEY HIGHLIGHTS & FEATURES</Typography>
            <Grid container spacing={2}>
              {vehicle.features.map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Box sx={{ p: 3, borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: '#F9F9F9' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCompareToggle}
          startIcon={isCompared ? <RemoveCircleOutlineIcon /> : <CompareIcon />}
          sx={{ fontWeight: 700 }}
        >
          {isCompared ? 'REMOVE FROM COMPARISON' : 'ADD TO COMPARISON'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose} sx={{ fontWeight: 700 }}>
          CLOSE
        </Button>
      </Box>
    </Dialog>
  );
};
export default VehicleDetailsModal;
