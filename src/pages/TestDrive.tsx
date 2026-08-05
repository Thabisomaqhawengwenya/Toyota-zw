import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { mockVehicles, branchLocations } from '../data/mockData';

interface TestDriveForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleModel: string;
  preferredDate: string;
  preferredTime: string;
  branch: string;
  licenseNumber: string;
  message: string;
}

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

const steps = [
  { icon: <DirectionsCarIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Choose Your Model', desc: 'Select the Toyota model you wish to experience on the road.' },
  { icon: <LocationOnIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Pick a Branch', desc: 'Select the nearest CFAO Toyota dealership to your location.' },
  { icon: <CalendarMonthIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Select Date & Time', desc: 'Book a convenient slot — our team will confirm within 24 hours.' },
  { icon: <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Drive & Decide', desc: 'Arrive with your valid driver\'s licence and enjoy the full Toyota experience.' },
];

export const TestDrive: React.FC = () => {
  const [formData, setFormData] = useState<TestDriveForm>({
    firstName: '', lastName: '', email: '', phone: '',
    vehicleModel: '', preferredDate: '', preferredTime: '',
    branch: '', licenseNumber: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.lastName.trim()) e.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      e.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      e.phone = 'Invalid phone number';
    }
    if (!formData.vehicleModel) e.vehicleModel = 'Please select a vehicle model';
    if (!formData.branch) e.branch = 'Please select a branch';
    if (!formData.preferredDate) {
      e.preferredDate = 'Please select a date';
    } else {
      const selected = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) e.preferredDate = 'Date must be in the future';
    }
    if (!formData.preferredTime) e.preferredTime = 'Please select a time slot';
    if (!formData.licenseNumber.trim()) e.licenseNumber = 'Driver\'s licence number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        vehicleModel: '', preferredDate: '', preferredTime: '',
        branch: '', licenseNumber: '', message: '',
      });
      setTimeout(() => setSubmitted(false), 10000);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.75) 100%), url(/images/prado.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 13 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            EXPERIENCE THE DIFFERENCE
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            BOOK A TEST DRIVE
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 600, mx: 'auto' }}>
            Get behind the wheel of your favourite Toyota. Visit any of our dealerships across Zimbabwe for a complimentary, no-obligation test drive.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {/* How It Works */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1, textAlign: 'center' }}>
            HOW IT WORKS
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textAlign: 'center', fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            4 SIMPLE STEPS
          </Typography>
          <Grid container spacing={3}>
            {steps.map((step, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #EAEAEA', boxShadow: 'none', transition: 'none' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 56, height: 56, borderRadius: '50%',
                        bgcolor: '#FFF0F1', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', mb: 2,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.75rem', color: '#EB0A1E', letterSpacing: '2px', mb: 1 }}>
                      STEP {idx + 1}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{step.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{step.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 10 }} />

        {/* Form */}
        <Grid container spacing={8} sx={{ justifyContent: 'center' }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ bgcolor: 'background.paper', p: { xs: 4, md: 6 }, border: '1px solid #EAEAEA' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                TEST DRIVE REQUEST FORM
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Complete the form below. Our team will confirm your booking within 24 hours. Please bring a valid driver's licence on the day.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ borderRadius: 0, mb: 4, fontWeight: 600 }}>
                  Your test drive request has been submitted! Our team will call you within 24 hours to confirm your slot.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="First Name *" name="firstName" value={formData.firstName}
                        onChange={handleChange} error={Boolean(errors.firstName)} helperText={errors.firstName}
                        fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Last Name *" name="lastName" value={formData.lastName}
                        onChange={handleChange} error={Boolean(errors.lastName)} helperText={errors.lastName}
                        fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Email Address *" name="email" type="email" value={formData.email}
                        onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}
                        fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Phone Number *" name="phone" value={formData.phone}
                        onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone}
                        placeholder="+263..." fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                  </Grid>

                  <FormControl fullWidth error={Boolean(errors.vehicleModel)}>
                    <InputLabel>Select Vehicle Model *</InputLabel>
                    <Select label="Select Vehicle Model *" value={formData.vehicleModel}
                      onChange={(e) => handleSelect('vehicleModel', e.target.value)} sx={{ borderRadius: 0 }}>
                      {mockVehicles.map(v => (
                        <MenuItem key={v.id} value={v.modelName}>{v.modelName}</MenuItem>
                      ))}
                    </Select>
                    {errors.vehicleModel && <FormHelperText>{errors.vehicleModel}</FormHelperText>}
                  </FormControl>

                  <FormControl fullWidth error={Boolean(errors.branch)}>
                    <InputLabel>Preferred Branch *</InputLabel>
                    <Select label="Preferred Branch *" value={formData.branch}
                      onChange={(e) => handleSelect('branch', e.target.value)} sx={{ borderRadius: 0 }}>
                      {branchLocations.map((b, i) => (
                        <MenuItem key={i} value={b.name}>{b.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.branch && <FormHelperText>{errors.branch}</FormHelperText>}
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Preferred Date *" name="preferredDate" type="date" value={formData.preferredDate}
                        onChange={handleChange} error={Boolean(errors.preferredDate)} helperText={errors.preferredDate}
                        fullWidth slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth error={Boolean(errors.preferredTime)}>
                        <InputLabel>Preferred Time *</InputLabel>
                        <Select label="Preferred Time *" value={formData.preferredTime}
                          onChange={(e) => handleSelect('preferredTime', e.target.value)} sx={{ borderRadius: 0 }}>
                          {TIME_SLOTS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </Select>
                        {errors.preferredTime && <FormHelperText>{errors.preferredTime}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField label="Driver's Licence Number *" name="licenseNumber" value={formData.licenseNumber}
                    onChange={handleChange} error={Boolean(errors.licenseNumber)} helperText={errors.licenseNumber}
                    fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <TextField label="Additional Notes (Optional)" name="message" value={formData.message}
                    onChange={handleChange} multiline rows={3} fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth
                    sx={{ py: 1.75, fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.08em' }}>
                    SUBMIT TEST DRIVE REQUEST
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

export default TestDrive;
