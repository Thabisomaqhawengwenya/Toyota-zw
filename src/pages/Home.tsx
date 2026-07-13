import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import HandymanIcon from '@mui/icons-material/Handyman';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import HeroSlider from '../components/organisms/HeroSlider';
import CarListingCard from '../components/organisms/CarListingCard';
import CarListingModal from '../components/organisms/CarListingModal';
import { mockVehicles } from '../data/mockData';
import { vehiclesToListings } from '../utils/vehicleToListing';
import type { CarListing } from '../types';

const catalogueListings = vehiclesToListings(mockVehicles);

export const Home: React.FC = () => {
  const [selectedListing, setSelectedListing] = useState<CarListing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const featuredListings = catalogueListings.filter((l) => l.featured);

  const handleReadMore = (listing: CarListing) => { 
    setSelectedListing(listing); 
    setModalOpen(true); 
  };
  
  const handleCloseModal = () => { 
    setSelectedListing(null); 
    setModalOpen(false); 
  };

  const featuresList = [
    { 
      icon: <VerifiedIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
      title: '3-Year Manufacturer Warranty', 
      desc: 'All brand new vehicles sold through CFAO Toyota Zimbabwe include a comprehensive 3-year or 100,000 km warranty for absolute peace of mind.' 
    },
    { 
      icon: <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
      title: '100% Genuine Spare Parts', 
      desc: 'Protect your engine and safety. We use and distribute exclusively official Toyota components imported directly from the manufacturer.' 
    },
    { 
      icon: <HandymanIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
      title: 'Certified Master Technicians', 
      desc: 'Our workshops are staffed by expert technicians trained extensively under the official global Toyota Service training standards.' 
    },
    { 
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
      title: 'Official CFAO Network', 
      desc: 'As an authorized distributor, we offer full coverage, customer support, and vehicle recalls, protecting your investment long-term.' 
    },
  ];

  return (
    <Box>
      <HeroSlider />

      {/* ── Category Quick Filters ── */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 3, md: 4 }, borderBottom: '1px solid #EAEAEA' }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                EXPLORE VEHICLES BY CATEGORY
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Select a class to filter our premium lineup
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  justifyContent: { xs: 'flex-start', md: 'flex-end' }
                }}
              >
                {[
                  { label: 'SUVS', path: '/vehicles?category=SUV' },
                  { label: '4X4 OFF-ROAD', path: '/vehicles?category=4x4' },
                  { label: 'PICK-UPS', path: '/vehicles?category=Pick-up' },
                ].map((btn) => (
                  <Button
                    key={btn.label}
                    component={Link}
                    to={btn.path}
                    variant="outlined"
                    size="small"
                    sx={{ 
                      color: 'black', 
                      borderColor: 'rgba(0,0,0,0.15)', 
                      borderRadius: '7px', 
                      whiteSpace: 'nowrap', 
                      '&:hover': { 
                        borderColor: 'primary.main', 
                        bgcolor: 'primary.main', 
                        color: 'white' 
                      } 
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
                <Button 
                  component={Link} 
                  to="/vehicles" 
                  variant="contained" 
                  color="primary" 
                  size="small" 
                  sx={{ borderRadius: '7px', whiteSpace: 'nowrap' }}
                >
                  ALL MODELS
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Featured Lineup ── */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px' }}>
                EXECUTIVE SELECTIONS
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.75rem', md: '3rem' } }}>
                FEATURED TOYOTA LINEUP
              </Typography>
            </Box>
            <Button 
              component={Link} 
              to="/vehicles" 
              endIcon={<ArrowForwardIcon />} 
              sx={{ fontWeight: 700, borderRadius: '7px', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
            >
              VIEW ENTIRE CATALOG
            </Button>
          </Box>
          <Grid container spacing={3}>
            {featuredListings.map((listing) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={listing.id}>
                <CarListingCard listing={listing} onReadMore={handleReadMore} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Promo Banner ── */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: { xs: 'auto', md: 450 } }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(/images/hilux.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: { xs: 220, sm: 300, md: 'auto' },
          }}
        />
        <Box
          sx={{
            flex: 1,
            bgcolor: 'primary.main',
            color: 'white',
            p: { xs: 4, sm: 6, md: 8, lg: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '3px', mb: 1, opacity: 0.9, fontSize: { xs: '0.7rem', md: '0.875rem' } }}>
            AFTER-SALES SERVICE SPECIAL
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, lineHeight: 1.1, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' } }}>
            KEEP YOUR TOYOTA RUNNING AT 100% PERFORMANCE
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.85, lineHeight: 1.6, fontSize: { xs: '0.875rem', md: '1rem' } }}>
            Ensure the durability, safety, and official resale value of your vehicle. Book an appointment today at our Harare or Bulawayo workshops for certified maintenance, oil changes, engine diagnostics, or genuine filter replacements.
          </Typography>
          <Box>
            <Button 
              component={Link} 
              to="/services" 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontWeight: 800, 
                bgcolor: 'black', 
                borderRadius: '7px', 
                '&:hover': { bgcolor: '#222222' } 
              }}
            >
              BOOK A SERVICE NOW
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Why Toyota ── */}
      <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              THE CFAO TOYOTA DIFFERENCE
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '1.75rem', md: '3rem' } }}>
              WHY BUY AN OFFICIAL TOYOTA?
            </Typography>
            <Divider sx={{ width: 60, height: 4, bgcolor: 'primary.main', mx: 'auto' }} />
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {featuresList.map((item, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card sx={{ 
                  height: '100%', 
                  border: '1px solid #EAEAEA', 
                  borderRadius: '16px', 
                  boxShadow: 'none', 
                  transition: 'none', 
                  '&:hover': { transform: 'none', boxShadow: 'none' } 
                }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ mb: 3 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CarListingModal listing={selectedListing} open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default Home;