import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, TextField, Button, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CodeIcon from '@mui/icons-material/Code';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'secondary.main', color: '#FFFFFF', pt: 8, pb: 0, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Col */}
          <Grid size={{ xs: 12, md: 3 }}>
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

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              QUICK LINKS
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink component={Link} to="/" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Home
              </MuiLink>
              <MuiLink component={Link} to="/vehicles" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Model Lineup
              </MuiLink>
              <MuiLink component={Link} to="/listings" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Vehicle Listings
              </MuiLink>
              <MuiLink component={Link} to="/services" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Services & Bookings
              </MuiLink>
              <MuiLink component={Link} to="/test-drive" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Book a Test Drive
              </MuiLink>
              <MuiLink component={Link} to="/finance" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Vehicle Finance
              </MuiLink>
              <MuiLink component={Link} to="/promotions" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Promotions
              </MuiLink>
              <MuiLink component={Link} to="/parts" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Spare Parts
              </MuiLink>
              <MuiLink component={Link} to="/news" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                News & Media
              </MuiLink>
              <MuiLink component={Link} to="/about" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/contact" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
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
              <MuiLink component={Link} to="/vehicles?category=City" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                City Cars
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=Sedan" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Sedans
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=SUV" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                SUVs & Crossovers
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=4x4" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                4x4 & Off-Road
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=Pick-up" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Pick-ups
              </MuiLink>
              <MuiLink component={Link} to="/vehicles?category=LCV" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Light Commercials
              </MuiLink>
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              LEGAL
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink component={Link} to="/privacy-policy" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/terms-of-use" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Terms of Use
              </MuiLink>
              <MuiLink component={Link} to="/cookie-preferences" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Cookie Policy
              </MuiLink>
              <MuiLink component={Link} to="/terms-of-use" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Disclaimer
              </MuiLink>
              <MuiLink component={Link} to="/privacy-policy" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                Data Protection
              </MuiLink>
              <MuiLink component={Link} to="/privacy-policy" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#FFFFFF' } }}>
                POPIA Compliance
              </MuiLink>
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, borderLeft: '3px solid #EB0A1E', pl: 1.5 }}>
              NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2, lineHeight: 1.7 }}>
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
                  '& .MuiOutlinedInput-root': { borderRadius: 0 }
                }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ px: 3, flexShrink: 0 }}>
                GO
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#555' }}>
            © {new Date().getFullYear()} Toyota Zimbabwe by CFAO. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <MuiLink component={Link} to="/privacy-policy" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.72rem', '&:hover': { color: '#FFFFFF' } }}>
              Privacy Policy
            </MuiLink>
            <MuiLink component={Link} to="/terms-of-use" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.72rem', '&:hover': { color: '#FFFFFF' } }}>
              Terms of Use
            </MuiLink>
            <MuiLink component={Link} to="/cookie-preferences" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.72rem', '&:hover': { color: '#FFFFFF' } }}>
              Cookie Preferences
            </MuiLink>
          </Stack>
        </Box>

        {/* Mockup Credit Bar */}
        <Box
          sx={{
            bgcolor: '#111111',
            py: 2,
            mx: -3,
            px: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <CodeIcon sx={{ fontSize: 15, color: '#EB0A1E' }} />
            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.72rem' }}>
              This website is a UI/UX mockup concept. Designed & developed by{' '}
            </Typography>
          </Box>
          <MuiLink
            href="https://maqhawe-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#EB0A1E',
              fontWeight: 700,
              fontSize: '0.72rem',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline', color: '#FF3347' },
            }}
          >
            Maqhawe Ngwenya
          </MuiLink>
          <Typography variant="caption" sx={{ color: '#444', fontSize: '0.72rem' }}>
            — Not an official Toyota Zimbabwe product.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
