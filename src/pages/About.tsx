import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const About: React.FC = () => {
  const values = [
    { icon: <FlagIcon sx={{ fontSize: 35, color: 'primary.main' }} />, title: 'Our Mission', desc: 'To deliver superior quality Toyota vehicles and after-sales services that meet the diverse needs of Zimbabwean motorists, ensuring exceptional customer safety, reliability, and lifetime value.' },
    { icon: <VisibilityIcon sx={{ fontSize: 35, color: 'primary.main' }} />, title: 'Our Vision', desc: 'To remain the most trusted automotive brand in Zimbabwe, pioneering sustainable mobility solutions, hybrid technology adoption, and world-class service center benchmarks.' },
    { icon: <FavoriteIcon sx={{ fontSize: 35, color: 'primary.main' }} />, title: 'Our Core Values', desc: 'Built on Customer First, Continuous Improvement (Kaizen), Respect for People, Integrity, and absolute Quality in every vehicle transaction and maintenance procedure.' },
  ];

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 7, md: 12 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '3px', mb: 1, fontSize: { xs: '0.7rem', md: '0.875rem' } }}>
            WHO WE ARE
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' } }}>
            ABOUT TOYOTA ZIMBABWE
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: 1.6 }}>
            Official distributor of brand new Toyota passenger vehicles, workhorses, heavy commercials, and genuine spare parts.
          </Typography>
        </Container>
      </Box>

      {/* Main Narrative */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              ESTABLISHED IN AFRICA
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '1.75rem', md: '3rem' } }}>
              CFAO & TOYOTA PARTNERSHIP
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Toyota Zimbabwe operates under the official umbrella of the CFAO Group. CFAO is the leading multi-brand distributor in Africa, bringing over a century of industrial, logistics, and retail experience.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Through this robust partnership, we guarantee that every vehicle imported conforms to strict regional specifications (tropicalized cooling systems, heavy suspension set-ups, and optimized engine tuning) designed specifically to withstand local terrain and environmental conditions.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              From individual city commuters to large mining and agricultural utility fleets, our mission is to ensure Zimbabwe keeps moving forward with minimum downtime and optimal fuel efficiency.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="img" src="/images/corolla.png" alt="Toyota Corolla"
              sx={{ width: '100%', height: { xs: 250, sm: 350, md: 400 }, objectFit: 'contain', border: '1px solid #EAEAEA', boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 6, md: 10 } }} />

        {/* Mission Vision Values */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {values.map((item, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card sx={{ height: '100%', border: '1px solid #EAEAEA', boxShadow: 'none', transition: 'none' }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Box sx={{ mb: 3 }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: { xs: 6, md: 10 } }} />

        {/* Environmental Challenge */}
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Box component="img" src="/images/hilux.png" alt="Toyota Hilux"
              sx={{ width: '100%', height: { xs: 220, sm: 300, md: 380 }, objectFit: 'contain', border: '1px solid #EAEAEA' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              TOWARDS CARBON NEUTRALITY
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '1.75rem', md: '3rem' } }}>
              TOYOTA ENVIRONMENTAL CHALLENGE 2050
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              We are committed to reducing our environmental footprint. Toyota Zimbabwe is actively promoting the deployment of self-charging Hybrid Electric Vehicles (HEVs) like the Corolla Cross HEV and RAV4 Hybrid.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              By transitioning to hybrid platforms, Zimbabwean drivers save up to 40% on fuel costs while significantly reducing tailpipe CO2 emissions—no charging grid connection required. We also run eco-friendly workshop disposal systems for batteries, oils, and chemical filters.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default About;
