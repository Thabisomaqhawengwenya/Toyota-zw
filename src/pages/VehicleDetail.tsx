import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SpeedIcon from '@mui/icons-material/Speed';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import { mockVehicles } from '../data/mockData';
import { useComparisonStore } from '../store/comparisonStore';
import { useSavedStore } from '../store/savedStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = mockVehicles.find(v => v.id === id);

  const { selectedVehicles, addToComparison, removeFromComparison } = useComparisonStore();
  const { toggleSaved, isSaved } = useSavedStore();
  const [activeImg, setActiveImg] = useState(0);

  if (!vehicle) {
    return (
      <Box sx={{ py: 12, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Model Not Found</Typography>
          <Button component={Link} to="/vehicles" variant="contained" color="primary" sx={{ borderRadius: '7px' }}>
            Browse All Models
          </Button>
        </Container>
      </Box>
    );
  }

  const isCompared = selectedVehicles.some(v => v.id === vehicle.id);
  const saved = isSaved(vehicle.id);

  const handleCompareToggle = () => {
    if (isCompared) removeFromComparison(vehicle.id);
    else addToComparison(vehicle);
  };

  const handleSaveToggle = () => {
    toggleSaved({
      id: vehicle.id,
      modelName: vehicle.modelName,
      year: 2025,
      price: vehicle.priceRange,
      mileage: 'Brand New',
      location: 'Zimbabwe',
      imageUrl: vehicle.imageUrl,
      description: vehicle.description,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      category: vehicle.category,
      engineCc: vehicle.engineCc,
      powerHp: vehicle.powerHp,
      features: vehicle.features,
    });
  };

  // Use the same image multiple times to simulate a gallery (real site would have multiple angles)
  const images = [vehicle.imageUrl, vehicle.imageUrl, vehicle.imageUrl];

  const specs = [
    { icon: <ElectricBoltIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />, label: 'Engine Capacity', value: vehicle.engineCc },
    { icon: <SpeedIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />, label: 'Maximum Power', value: vehicle.powerHp },
    { icon: <SettingsIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />, label: 'Transmission', value: vehicle.transmission },
    { icon: <LocalGasStationIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />, label: 'Fuel Type', value: vehicle.fuelType },
    { icon: <DirectionsCarIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />, label: 'Vehicle Category', value: vehicle.category },
  ];

  // Related vehicles — same category, exclude self
  const related = mockVehicles.filter(v => v.category === vehicle.category && v.id !== vehicle.id).slice(0, 3);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>
      {/* Breadcrumb */}
      <Box sx={{ bgcolor: '#1E1E1E', py: 1.5 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ color: '#AAA', textTransform: 'none', fontWeight: 600, fontSize: '0.8rem', '&:hover': { color: '#FFF' } }}
            >
              Back
            </Button>
            <Typography sx={{ color: '#555', fontSize: '0.8rem' }}>/</Typography>
            <Typography component={Link} to="/vehicles" sx={{ color: '#AAA', fontSize: '0.8rem', textDecoration: 'none', '&:hover': { color: '#FFF' } }}>
              Models
            </Typography>
            <Typography sx={{ color: '#555', fontSize: '0.8rem' }}>/</Typography>
            <Typography sx={{ color: '#EB0A1E', fontSize: '0.8rem', fontWeight: 700 }}>{vehicle.modelName}</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* LEFT — Image Gallery */}
          <Grid size={{ xs: 12, lg: 7 }}>
            {/* Main Image */}
            <Box
              sx={{
                height: { xs: 280, sm: 400, md: 480 },
                overflow: 'hidden',
                bgcolor: '#F5F5F5',
                border: '1px solid #EAEAEA',
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={images[activeImg]}
                alt={vehicle.modelName}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            {/* Thumbnail Row */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {images.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  sx={{
                    width: 100, height: 70, overflow: 'hidden', cursor: 'pointer',
                    border: activeImg === idx ? '2px solid #EB0A1E' : '2px solid transparent',
                    bgcolor: '#F5F5F5', flexShrink: 0, transition: 'border-color 0.2s',
                  }}
                >
                  <Box component="img" src={img} alt={`View ${idx + 1}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImg === idx ? 1 : 0.6 }} />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* RIGHT — Details */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Chip label={vehicle.category.toUpperCase()} color="primary"
              sx={{ borderRadius: '5px', fontWeight: 700, fontSize: '0.7rem', mb: 2, height: 26 }} />

            <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.15, mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {vehicle.modelName}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, color: '#EB0A1E', mb: 2.5, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
              {vehicle.priceRange}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
              {vehicle.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Specs */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '0.08em', mb: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
              TECHNICAL SPECIFICATIONS
            </Typography>
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              {specs.map((spec, idx) => (
                <Grid size={6} key={idx}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, bgcolor: '#F6F6F8', p: 1.5 }}>
                    {spec.icon}
                    <Box>
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
                        {spec.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3 }}>
                        {spec.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {/* Features */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '0.08em', mb: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
              KEY FEATURES & HIGHLIGHTS
            </Typography>
            <Stack spacing={1} sx={{ mb: 4 }}>
              {vehicle.features.map((f, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 17, mt: 0.2, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#3A3A3A', lineHeight: 1.5 }}>{f}</Typography>
                </Box>
              ))}
            </Stack>

            {/* Action Buttons */}
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to="/test-drive"
                size="large"
                sx={{ py: 1.75, fontWeight: 800, borderRadius: '7px', textTransform: 'none', fontSize: '0.95rem', boxShadow: 'none', '&:hover': { boxShadow: '0 4px 20px rgba(235,10,30,0.4)' } }}
              >
                Book a Test Drive
              </Button>

              <Grid container spacing={1.5}>
                <Grid size={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to="/contact"
                    startIcon={<ContactSupportIcon />}
                    sx={{ fontWeight: 700, borderRadius: '7px', textTransform: 'none', borderColor: '#DCDCDC', color: 'text.primary', py: 1.4, '&:hover': { borderColor: '#1E1E1E' } }}
                  >
                    Enquire
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleCompareToggle}
                    startIcon={<CompareArrowsIcon />}
                    sx={{
                      fontWeight: 700, borderRadius: '7px', textTransform: 'none', py: 1.4,
                      borderColor: isCompared ? '#EB0A1E' : '#DCDCDC',
                      color: isCompared ? '#FFFFFF' : 'text.primary',
                      bgcolor: isCompared ? '#EB0A1E' : 'transparent',
                      '&:hover': { borderColor: '#EB0A1E', bgcolor: '#EB0A1E', color: '#FFF' },
                    }}
                  >
                    {isCompared ? 'Added' : 'Compare'}
                  </Button>
                </Grid>
              </Grid>

              <Button
                variant="text"
                fullWidth
                onClick={handleSaveToggle}
                startIcon={saved ? <FavoriteIcon sx={{ color: '#EB0A1E' }} /> : <FavoriteBorderIcon />}
                sx={{ fontWeight: 700, textTransform: 'none', color: saved ? '#EB0A1E' : 'text.secondary', '&:hover': { color: '#EB0A1E', bgcolor: 'transparent' } }}
              >
                {saved ? 'Saved to Favourites' : 'Save to Favourites'}
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Related Models */}
        {related.length > 0 && (
          <>
            <Divider sx={{ my: 8 }} />
            <Box>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
                SAME CATEGORY
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>
                RELATED MODELS
              </Typography>
              <Grid container spacing={3}>
                {related.map(v => (
                  <Grid size={{ xs: 12, sm: 4 }} key={v.id}>
                    <Card
                      component={Link}
                      to={`/vehicles/${v.id}`}
                      sx={{
                        display: 'block', textDecoration: 'none', border: '1px solid #EAEAEA',
                        boxShadow: 'none', borderRadius: '10px', overflow: 'hidden',
                        transition: 'transform 0.25s, box-shadow 0.25s',
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 28px rgba(0,0,0,0.1)' },
                      }}
                    >
                      <Box sx={{ height: 160, overflow: 'hidden', bgcolor: '#F5F5F5' }}>
                        <Box component="img" src={v.imageUrl} alt={v.modelName}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>{v.modelName}</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#EB0A1E' }}>{v.priceRange}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default VehicleDetail;
