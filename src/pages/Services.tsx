import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert, FormHelperText, Stack } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedIcon from '@mui/icons-material/Verified';
import ConstructionIcon from '@mui/icons-material/Construction';
import SpeedIcon from '@mui/icons-material/Speed';

import { mockServices, mockVehicles } from '../data/mockData';
import type { ServiceBooking } from '../types';

// Helper component to render icons dynamically
const ServiceIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconStyle = { fontSize: 40, color: 'primary.main', mb: 2 };
  switch (name) {
    case 'Build':
      return <BuildIcon sx={iconStyle} />;
    case 'Settings':
      return <SettingsIcon sx={iconStyle} />;
    case 'Verified':
      return <VerifiedIcon sx={iconStyle} />;
    case 'Construction':
      return <ConstructionIcon sx={iconStyle} />;
    case 'Speed':
      return <SpeedIcon sx={iconStyle} />;
    default:
      return <BuildIcon sx={iconStyle} />;
  }
};

export const Services: React.FC = () => {
  const [formData, setFormData] = useState<ServiceBooking>({
    customerName: '',
    email: '',
    phone: '',
    preferredDate: '',
    vehicleModel: '',
    serviceType: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) tempErrors.customerName = 'Customer name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address format';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      tempErrors.phone = 'Invalid phone number format';
    }
    if (!formData.preferredDate) {
      tempErrors.preferredDate = 'Preferred appointment date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.preferredDate = 'Appointment date must be in the future';
      }
    }
    if (!formData.vehicleModel) tempErrors.vehicleModel = 'Please select a vehicle model';
    if (!formData.serviceType) tempErrors.serviceType = 'Please select a service type';

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Reset form fields
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        preferredDate: '',
        vehicleModel: '',
        serviceType: '',
        message: ''
      });
      // Clear success notification after 10 seconds
      setTimeout(() => setSubmitted(false), 10000);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.7) 100%), url(/images/Toyota_Fortuner.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            AFTER-SALES SUPPORT
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            MAINTENANCE & WORKSHOPS
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Keep your engine running in peak condition with factory-approved diagnostic tools and expert mechanics.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={8} sx={{ alignItems: 'flex-start' }}>
          {/* Services Offered List */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              CERTIFIED PROCEDURES
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 5 }}>
              OUR SERVICES
            </Typography>

            <Grid container spacing={4}>
              {mockServices.map((service) => (
                <Grid size={{ xs: 12, sm: 6 }} key={service.id}>
                  <Card sx={{ height: '100%', border: '1px solid #EAEAEA', boxShadow: 'none', transition: 'none' }}>
                    <CardContent sx={{ p: 4 }}>
                      <ServiceIcon name={service.iconName} />
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Service Booking Form */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ bgcolor: 'background.paper', p: { xs: 4, md: 5 }, border: '1px solid #EAEAEA', mt: { lg: '80px' } }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                BOOK A SERVICE
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill out this form to request a maintenance slot. Our service team in Coventry Road or Bulawayo will contact you to confirm timing.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ borderRadius: 0, mb: 4, fontWeight: 600 }}>
                  Thank you! Your booking enquiry has been received. Our service representative will call you back shortly to finalize details.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Customer Name *"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    error={Boolean(errors.customerName)}
                    helperText={errors.customerName}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Phone Number *"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        fullWidth
                        placeholder="+263..."
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Preferred Date *"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    error={Boolean(errors.preferredDate)}
                    helperText={errors.preferredDate}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />

                  <FormControl fullWidth error={Boolean(errors.vehicleModel)}>
                    <InputLabel id="vehicle-model-label">Select Vehicle Model *</InputLabel>
                    <Select
                      labelId="vehicle-model-label"
                      label="Select Vehicle Model *"
                      value={formData.vehicleModel}
                      onChange={(e) => handleSelectChange('vehicleModel', e.target.value as string)}
                      sx={{ borderRadius: 0 }}
                    >
                      {mockVehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle.modelName}>
                          {vehicle.modelName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.vehicleModel && <FormHelperText>{errors.vehicleModel}</FormHelperText>}
                  </FormControl>

                  <FormControl fullWidth error={Boolean(errors.serviceType)}>
                    <InputLabel id="service-type-label">Select Service Type *</InputLabel>
                    <Select
                      labelId="service-type-label"
                      label="Select Service Type *"
                      value={formData.serviceType}
                      onChange={(e) => handleSelectChange('serviceType', e.target.value as string)}
                      sx={{ borderRadius: 0 }}
                    >
                      <MenuItem value="Scheduled Maintenance">Scheduled Maintenance & Servicing</MenuItem>
                      <MenuItem value="Parts Install">Genuine Parts Installation</MenuItem>
                      <MenuItem value="Warranty Check">Manufacturer Warranty Diagnostics</MenuItem>
                      <MenuItem value="Heavy Repair">Engine, Gearbox or Suspension Repair</MenuItem>
                      <MenuItem value="Fleet Care">Corporate & Mining Fleet Care</MenuItem>
                    </Select>
                    {errors.serviceType && <FormHelperText>{errors.serviceType}</FormHelperText>}
                  </FormControl>

                  <TextField
                    label="Additional Message / Requirements (Optional)"
                    name="message"
                    value={formData.message || ''}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
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
                    SUBMIT APPOINTMENT REQUEST
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
export default Services;
