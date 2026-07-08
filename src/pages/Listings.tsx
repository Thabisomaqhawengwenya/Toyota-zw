import React, { useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CarListingCard from '../components/organisms/CarListingCard';
import CarListingModal from '../components/organisms/CarListingModal';
import { carListings } from '../data/carListings';
import type { CarListing } from '../types';

const CATEGORIES = ['All', 'Pick-up', '4x4', 'SUV', 'Sedan', 'LCV'];

export const Listings: React.FC = () => {
  const [selectedListing, setSelectedListing] = useState<CarListing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleReadMore = (listing: CarListing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
  };

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) setActiveCategory(newCategory);
  };

  const filteredListings = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return carListings.filter((listing) => {
      const matchesCategory =
        activeCategory === 'All' || listing.category === activeCategory;
      const matchesSearch =
        listing.modelName.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.fuelType.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container maxWidth="xl">

        {/* ── Page Header ── */}
        <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px' }}>
              AVAILABLE NOW
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>
              TOYOTA VEHICLE LISTINGS
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
              Browse verified Toyota listings across Zimbabwe — Hilux, Land Cruiser, Fortuner, Corolla, RAV4, Prado, and Hiace.
            </Typography>
          </Box>

          {/* Search */}
          <TextField
            variant="outlined"
            size="medium"
            placeholder="Search model, location, fuel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: '100%', md: 320 },
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
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

        {/* ── Category Filter ── */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Filter:
          </Typography>
          <ToggleButtonGroup
            value={activeCategory}
            exclusive
            onChange={handleCategoryChange}
            size="small"
            sx={{
              flexWrap: 'wrap',
              gap: 0.75,
              '& .MuiToggleButtonGroup-grouped': {
                border: '1px solid #DCDCDC !important',
                borderRadius: '7px !important',
                mx: 0,
                px: 2,
                py: 0.75,
                fontWeight: 700,
                fontSize: '0.78rem',
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  bgcolor: '#EB0A1E',
                  color: '#FFFFFF',
                  borderColor: '#EB0A1E !important',
                  '&:hover': { bgcolor: '#C8081A' },
                },
                '&:hover': {
                  borderColor: '#EB0A1E !important',
                  color: '#EB0A1E',
                },
              },
            }}
          >
            {CATEGORIES.map((cat) => (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="caption" sx={{ color: 'text.secondary', ml: 'auto' }}>
            {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>

        <Divider sx={{ mb: 5 }} />

        {/* ── Listings Grid ── */}
        {filteredListings.length > 0 ? (
          <Grid container spacing={3}>
            {filteredListings.map((listing) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={listing.id}>
                <CarListingCard listing={listing} onReadMore={handleReadMore} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ borderRadius: '8px', py: 3 }}>
            No listings match your search or filter. Try a different category or clear your search.
          </Alert>
        )}
      </Container>

      <CarListingModal listing={selectedListing} open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default Listings;
