import React, { useState } from 'react';
import { Box, Drawer, Typography, Button, IconButton, Avatar, Stack, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useComparisonStore } from '../../store/comparisonStore';

export const ComparisonDrawer: React.FC = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } = useComparisonStore();
  const [modalOpen, setModalOpen] = useState(false);

  if (selectedVehicles.length === 0) return null;

  return (
    <>
      <Drawer
        anchor="bottom"
        open={selectedVehicles.length > 0}
        variant="persistent"
        sx={{
          zIndex: 1100,
          '& .MuiDrawer-paper': {
            bgcolor: 'secondary.main',
            color: '#FFFFFF',
            py: 2,
            px: { xs: 2, md: 4 },
            borderTop: '3px solid #EB0A1E',
            borderRadius: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <CompareArrowsIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                VEHICLE COMPARISON ({selectedVehicles.length}/3)
              </Typography>
              <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
                Select up to 3 vehicles to compare specs side by side
              </Typography>
            </Box>
          </Stack>

          {/* Selected Vehicles List */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {selectedVehicles.map((vehicle) => (
              <Box
                key={vehicle.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  px: 2,
                  py: 0.5,
                  border: '1px solid rgba(255,255,255,0.1)',
                  gap: 1.5,
                }}
              >
                <Avatar src={vehicle.imageUrl} alt={vehicle.modelName} variant="square" sx={{ width: 45, height: 30 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {vehicle.modelName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888888', display: 'block' }}>
                    {vehicle.category}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: '#AAAAAA', '&:hover': { color: 'primary.main' } }}
                  onClick={() => removeFromComparison(vehicle.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              sx={{ color: '#AAAAAA', '&:hover': { color: 'white' } }}
              onClick={clearComparison}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedVehicles.length < 2}
              onClick={() => setModalOpen(true)}
              sx={{
                fontWeight: 700,
                px: 3,
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              COMPARE NOW
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Comparison Specifications Modal Table */}
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        slotProps={{
          paper: { sx: { borderRadius: 0 } }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'secondary.main', color: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            VEHICLE SPECIFICATION COMPARISON
          </Typography>
          <IconButton onClick={() => setModalOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, border: '1px solid #EAEAEA' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F6F6F6' }}>
                  <TableCell sx={{ fontWeight: 700, minWidth: 150 }}>Model Specifications</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ fontWeight: 800, textAlign: 'center', minWidth: 200 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <img src={vehicle.imageUrl} alt={vehicle.modelName} style={{ width: 120, height: 80, objectFit: 'cover' }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{vehicle.modelName}</Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            removeFromComparison(vehicle.id);
                            if (selectedVehicles.length <= 1) {
                              setModalOpen(false);
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Vehicle Category</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center' }}>{vehicle.category}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Price Range</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center', fontWeight: 700, color: 'primary.main' }}>
                      {vehicle.priceRange}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Fuel Type</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center' }}>{vehicle.fuelType}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Transmission</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center' }}>{vehicle.transmission}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Engine Displacement</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center' }}>{vehicle.engineCc}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Maximum Power</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ textAlign: 'center' }}>{vehicle.powerHp}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Key Highlights</TableCell>
                  {selectedVehicles.map((vehicle) => (
                    <TableCell key={vehicle.id} sx={{ py: 2 }}>
                      <Box sx={{ pl: 2 }}>
                        {vehicle.features.map((feat, fidx) => (
                          <Typography key={fidx} variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5, listStyleType: 'disc', display: 'list-item' }}>
                            {feat}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ComparisonDrawer;
