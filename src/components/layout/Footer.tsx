import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, TextField, Button, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'secondary.main', color: '#FFFFFF', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Col */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                component="img"
                src="/images/logo.png"
                alt="Toyota Emblem"
                sx={{ height: 32, objectFit: 'contain' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '1px' }}>
                TOYOTA ZIMBABWE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
              Toyota Zimbabwe is the official representative and importer of brand new Toyota vehicles, genuine parts, and after-sales support via CFAO.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: 'primary.main' } }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: 'primary.main' } }} aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: 'primary.main' } }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: 'primary.main' } }} aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: 'primary.main' } }} aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              QUICK LINKS
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink component={Link} to="/" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Home
              </MuiLink>
              <MuiLink component={Link} to="/vehicles" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Model Lineup
              </MuiLink>
              <MuiLink component={Link} to="/listings" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Vehicle Listings
              </MuiLink>
              <MuiLink component={Link} to="/services" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Services & Bookings
              </MuiLink>
              <MuiLink component={Link} to="/about" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/contact" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Contact & Branches
              </MuiLink>
            </Stack>
          </Grid>

          {/* Vehicle Categories */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              VEHICLES
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink component={Link} to="/vehicles?category=City" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                City Cars
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=Sedan" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Sedans
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=SUV" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                SUVs & Crossovers
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=4x4" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                4x4 & Off-Road
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=Pick-up" sx={{ color: '#A0A0A0', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>
                Pick-ups
              </MuiLink>
            </Stack>
          </Grid>

          {/* Newsletter / Contact snippet */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
              Subscribe to stay updated with official Toyota promotions, vehicle launches, and service specials.
            </Typography>
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Your email address"
                fullWidth
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                  }
                }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ px: 3 }}>
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333333', my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#888888' }}>
            © {new Date().getFullYear()} Toyota Zimbabwe by CFAO. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <MuiLink href="#" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: '#FFFFFF' } }}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: '#FFFFFF' } }}>
              Terms of Use
            </MuiLink>
            <MuiLink href="#" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: '#FFFFFF' } }}>
              Cookie Preferences
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
