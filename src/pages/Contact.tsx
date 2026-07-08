import React, { useState } from 'react';
import { Container, Grid, Typography, Box, TextField, Button, Stack, Alert, Divider, Tab, Tabs } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { branchLocations } from '../data/mockData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [activeBranchIdx, setActiveBranchIdx] = useState<number>(0);

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address format';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Visual Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url(https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            GET IN TOUCH
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            CONTACT OUR DEALERSHIPS
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Have a question about a model, parts supply, or test drive requests? Speak to our team.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {/* Dealership Details & Interactive Map Grid */}
        <Grid container spacing={8} sx={{ mb: 10 }}>
          {/* Interactive Map of Zimbabwe */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              NETWORK COVERAGE
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
              INTERACTIVE DEALER MAP
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Hover over or click the location nodes below to inspect branch details across Zimbabwe.
            </Typography>

            <Box
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid #EAEAEA',
                p: { xs: 2, md: 4 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Zimbabwe Map SVG Drawing */}
              <Box sx={{ width: '100%', maxWidth: 450 }}>
                <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ background: '#F9F9F9' }}>
                  {/* Outer Outline representing stylized Zimbabwe boundary */}
                  <path
                    d="M 220 50 C 270 50, 310 30, 350 70 C 400 120, 420 160, 450 180 C 470 200, 450 250, 430 280 C 410 310, 350 350, 300 370 C 250 380, 200 360, 150 330 C 100 300, 60 270, 50 220 C 40 180, 80 140, 110 110 C 140 80, 170 50, 220 50 Z"
                    fill="#E0E0E0"
                    stroke="#B0B0B0"
                    strokeWidth="2"
                    style={{ transition: 'all 0.5s ease' }}
                  />

                  {/* SVG Map Grid Lines for stylistic effect */}
                  <line x1="100" y1="0" x2="100" y2="400" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="400" y1="0" x2="400" y2="400" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#F0F0F0" strokeDasharray="3" />
                  <line x1="0" y1="300" x2="500" y2="300" stroke="#F0F0F0" strokeDasharray="3" />

                  {/* Harare (Top Right Region) */}
                  <g
                    onClick={() => setActiveBranchIdx(0)}
                    onMouseEnter={() => setHoveredBranch('Harare')}
                    onMouseLeave={() => setHoveredBranch(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx="330" cy="110" r={hoveredBranch === 'Harare' || activeBranchIdx === 0 ? 14 : 8} fill="#EB0A1E" opacity="0.3" style={{ transition: 'all 0.3s' }} />
                    <circle cx="330" cy="110" r="6" fill="#EB0A1E" />
                    <text x="345" y="115" fill="#1E1E1E" fontWeight="700" fontSize="12px">Harare (CFAO & Croco)</text>
                  </g>

                  {/* Bulawayo (Bottom Left Region) */}
                  <g
                    onClick={() => setActiveBranchIdx(1)}
                    onMouseEnter={() => setHoveredBranch('Bulawayo')}
                    onMouseLeave={() => setHoveredBranch(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx="150" cy="270" r={hoveredBranch === 'Bulawayo' || activeBranchIdx === 1 ? 14 : 8} fill="#EB0A1E" opacity="0.3" style={{ transition: 'all 0.3s' }} />
                    <circle cx="150" cy="270" r="6" fill="#EB0A1E" />
                    <text x="165" y="275" fill="#1E1E1E" fontWeight="700" fontSize="12px">Bulawayo (CFAO)</text>
                  </g>

                  {/* Masvingo (Bottom Right Region) */}
                  <g
                    onClick={() => setActiveBranchIdx(3)}
                    onMouseEnter={() => setHoveredBranch('Masvingo')}
                    onMouseLeave={() => setHoveredBranch(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx="280" cy="280" r={hoveredBranch === 'Masvingo' || activeBranchIdx === 3 ? 14 : 8} fill="#EB0A1E" opacity="0.3" style={{ transition: 'all 0.3s' }} />
                    <circle cx="280" cy="280" r="6" fill="#EB0A1E" />
                    <text x="295" y="285" fill="#1E1E1E" fontWeight="700" fontSize="12px">Masvingo (Byword)</text>
                  </g>
                </svg>
              </Box>

              {/* Dynamic Overlay HUD indicating hovered node or selected branch */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  bgcolor: 'rgba(0,0,0,0.85)',
                  color: 'white',
                  p: 1.5,
                  fontSize: '0.8rem',
                  borderLeft: '3px solid #EB0A1E'
                }}
              >
                <Typography variant="caption" sx={{ color: '#AAAAAA', display: 'block' }}>SELECTED NODE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {branchLocations[activeBranchIdx].name.split(' (')[0]}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Dealership Details Columns */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              LOCATIONS & DEPARTMENTS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 4 }}>
              OUR DEALERSHIPS
            </Typography>

            <Tabs
              value={activeBranchIdx}
              onChange={(_e, val) => setActiveBranchIdx(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: '1px solid #EAEAEA',
                mb: 4,
                '& .MuiTab-root': {
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderRadius: 0,
                }
              }}
            >
              {branchLocations.map((loc, idx) => (
                <Tab key={idx} label={loc.name.split(' ')[0] + ' ' + (loc.name.includes('CFAO') ? 'CFAO' : 'Dealer')} />
              ))}
            </Tabs>

            {/* Display Active Branch Details */}
            {branchLocations.map((branch, idx) => {
              if (idx !== activeBranchIdx) return null;
              return (
                <Box key={idx} sx={{ bgcolor: 'background.paper', p: 4, border: '1px solid #EAEAEA' }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
                    {branch.name}
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <LocationOnIcon color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>PHYSICAL ADDRESS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{branch.address}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <PhoneIcon color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>PHONE NUMBERS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{branch.phone}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <EmailIcon color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>DEALERSHIP EMAIL</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{branch.email}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <AccessTimeIcon color="primary" />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>OPERATING HOURS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{branch.hours}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* General Inquiry Form */}
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid size={{ xs: 12, md: 8, lg: 6 }}>
            <Box sx={{ bgcolor: 'background.paper', p: { xs: 4, md: 6 }, border: '1px solid #EAEAEA' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, textAlign: 'center' }}>
                CUSTOMER INQUIRY DESK
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 5, textAlign: 'center' }}>
                For general feedback, corporate partnership proposals, or customer care complaints.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ borderRadius: 0, mb: 4, fontWeight: 600 }}>
                  Thank you! Your general message has been received. Our customer relations desk will respond to you within 24 hours.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <TextField
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <TextField
                    label="Subject *"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={Boolean(errors.subject)}
                    helperText={errors.subject}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <TextField
                    label="Message Content *"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    multiline
                    rows={5}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5, fontWeight: 700 }}
                  >
                    SEND MESSAGE
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Contact;
