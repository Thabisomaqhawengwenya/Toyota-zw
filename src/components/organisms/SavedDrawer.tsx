import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';
import { useSavedStore } from '../../store/savedStore';

interface SavedDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({ open, onClose }) => {
  const { savedListings, toggleSaved, clearSaved } = useSavedStore();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100vw', sm: 420 },
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #EFEFEF',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteIcon sx={{ color: '#EB0A1E', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem' }}>
            SAVED VEHICLES
          </Typography>
          <Box
            sx={{
              bgcolor: '#EB0A1E',
              color: '#fff',
              borderRadius: '50%',
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 800,
            }}
          >
            {savedListings.length}
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* ── Content ── */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {savedListings.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 300,
              gap: 2,
              color: '#888',
            }}
          >
            <FavoriteIcon sx={{ fontSize: 56, color: '#E0E0E0' }} />
            <Typography sx={{ fontWeight: 700, color: '#555' }}>No saved vehicles yet</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 260 }}>
              Tap the heart icon on any listing to save it here for later.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/listings"
              onClick={onClose}
              sx={{
                mt: 1,
                bgcolor: '#EB0A1E',
                borderRadius: '7px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#C8081A' },
              }}
            >
              Browse Listings
            </Button>
          </Box>
        ) : (
          <Grid container spacing={1.5}>
            {savedListings.map((listing) => (
              <Grid size={12} key={listing.id}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    bgcolor: '#FAFAFA',
                    border: '1px solid #EFEFEF',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    alignItems: 'center',
                    pr: 1.5,
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    component="img"
                    src={listing.imageUrl}
                    alt={listing.modelName}
                    sx={{
                      width: 100,
                      height: 72,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  {/* Info */}
                  <Box sx={{ flexGrow: 1, minWidth: 0, py: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        lineHeight: 1.2,
                        mb: 0.25,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {listing.modelName}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>
                      {listing.year} · {listing.location}
                    </Typography>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#EB0A1E', mt: 0.25 }}>
                      {listing.price}
                    </Typography>
                  </Box>

                  {/* Remove */}
                  <IconButton
                    size="small"
                    onClick={() => toggleSaved(listing)}
                    aria-label="Remove from saved"
                    sx={{ color: '#EB0A1E', flexShrink: 0 }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* ── Footer ── */}
      {savedListings.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={clearSaved}
              sx={{
                borderRadius: '7px',
                fontWeight: 700,
                textTransform: 'none',
                borderColor: '#DCDCDC',
                color: 'text.primary',
                '&:hover': { borderColor: '#1E1E1E' },
              }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to="/listings"
              onClick={onClose}
              sx={{
                borderRadius: '7px',
                fontWeight: 700,
                textTransform: 'none',
                bgcolor: '#EB0A1E',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#C8081A' },
              }}
            >
              View Listings
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default SavedDrawer;
