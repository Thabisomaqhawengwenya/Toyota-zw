import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Tabs, Tab, TextField, InputAdornment, Alert, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CarListingCard from '../components/organisms/CarListingCard';
import CarListingModal from '../components/organisms/CarListingModal';
import { mockVehicles } from '../data/mockData';
import { vehiclesToListings } from '../utils/vehicleToListing';
import type { CarListing } from '../types';

const catalogueListings = vehiclesToListings(mockVehicles);

export const Vehicles: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedListing, setSelectedListing] = useState<CarListing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if (newValue === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newValue);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleReadMore = (listing: CarListing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
    setModalOpen(false);
  };

  const filteredListings = useMemo(() => {
    return catalogueListings.filter((listing) => {
      const matchesCategory = activeTab === 'All' || listing.category === activeTab;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        listing.modelName.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.fuelType.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const categories = ['All', 'City', 'Sedan', 'SUV', '4x4', 'Pick-up', 'LCV'];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px' }}>
              OFFICIAL LINEUP
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }}>
              TOYOTA VEHICLE CATALOGUE
            </Typography>
          </Box>

          <TextField
            variant="outlined"
            size="medium"
            placeholder="Search models, specs, location..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: { xs: '100%', md: 350 },
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': { borderRadius: '7px' },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6, bgcolor: 'background.paper', borderRadius: '7px' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '0.95rem',
                py: 2.5,
                color: 'text.primary',
                '&.Mui-selected': { color: 'primary.main' },
              },
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat === 'All' ? 'ALL VEHICLES' : `${cat.toUpperCase()} LINEUP`} value={cat} />
            ))}
          </Tabs>
        </Box>

        {filteredListings.length > 0 ? (
          <Grid container spacing={3}>
            {filteredListings.map((listing) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={listing.id}>
                <CarListingCard listing={listing} onReadMore={handleReadMore} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ borderRadius: '7px', py: 3 }}>
            No vehicles match your filters or search query. Please try selecting a different category or refining your search.
          </Alert>
        )}
      </Container>

      <CarListingModal listing={selectedListing} open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};
export default Vehicles;
