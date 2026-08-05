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
  Chip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { mockVehicles, branchLocations } from '../data/mockData';

interface PartsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleModel: string;
  modelYear: string;
  partDescription: string;
  partNumber: string;
  branch: string;
  urgency: string;
}

const PART_CATEGORIES = [
  { label: 'Engine & Drivetrain', parts: ['Oil Filters', 'Air Filters', 'Fuel Filters', 'Timing Belts', 'Spark Plugs', 'Gaskets & Seals'] },
  { label: 'Brakes & Suspension', parts: ['Brake Pads', 'Brake Discs', 'Shock Absorbers', 'Coil Springs', 'Ball Joints', 'Tie Rod Ends'] },
  { label: 'Electrical & Lighting', parts: ['Batteries', 'Alternators', 'Starters', 'Headlight Assemblies', 'Sensors', 'Fuses & Relays'] },
  { label: 'Body & Exterior', parts: ['Bumpers', 'Body Panels', 'Mirrors', 'Windscreens', 'Door Handles', 'Grilles'] },
  { label: 'Interior & Comfort', parts: ['Seat Covers', 'Floor Mats', 'Dashboard Components', 'Climate Control Parts', 'Audio Units', 'Safety Belts'] },
  { label: 'Accessories', parts: ['Bull Bars', 'Side Steps', 'Roof Racks', 'Tow Bars', 'Running Boards', 'Cargo Liners'] },
];

const WHY_GENUINE = [
  { icon: <VerifiedIcon sx={{ fontSize: 32, color: '#EB0A1E' }} />, title: 'OEM Certified', desc: 'Every genuine Toyota part is manufactured to exact OEM specifications — engineered for your specific model.' },
  { icon: <SettingsIcon sx={{ fontSize: 32, color: '#EB0A1E' }} />, title: 'Perfect Fit', desc: 'Genuine parts are designed to fit perfectly first time. No modifications, no compromise on safety.' },
  { icon: <VerifiedIcon sx={{ fontSize: 32, color: '#EB0A1E' }} />, title: 'Warranty Protected', desc: 'Using genuine parts preserves your manufacturer warranty. Aftermarket parts can void your coverage.' },
  { icon: <LocalShippingIcon sx={{ fontSize: 32, color: '#EB0A1E' }} />, title: 'Parts Import Direct', desc: 'We import directly from Toyota\'s global parts network, ensuring authenticity and competitive pricing.' },
];

const YEARS = Array.from({ length: 20 }, (_, i) => String(2026 - i));

export const Parts: React.FC = () => {
  const [formData, setFormData] = useState<PartsForm>({
    firstName: '', lastName: '', email: '', phone: '',
    vehicleModel: '', modelYear: '', partDescription: '',
    partNumber: '', branch: '', urgency: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.lastName.trim()) e.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      e.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      e.phone = 'Invalid phone number';
    }
    if (!formData.vehicleModel) e.vehicleModel = 'Please select a vehicle model';
    if (!formData.modelYear) e.modelYear = 'Please select the model year';
    if (!formData.partDescription.trim()) e.partDescription = 'Please describe the part(s) required';
    if (!formData.branch) e.branch = 'Please select a branch';
    if (!formData.urgency) e.urgency = 'Please select urgency';
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
      setFormData({ firstName: '', lastName: '', email: '', phone: '', vehicleModel: '', modelYear: '', partDescription: '', partNumber: '', branch: '', urgency: '' });
      setTimeout(() => setSubmitted(false), 10000);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%), url(/images/lc300.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 13 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            GENUINE TOYOTA COMPONENTS
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            SPARE PARTS & ACCESSORIES
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 580, mx: 'auto' }}>
            Only genuine Toyota parts guarantee perfect fitment, maintain your warranty, and ensure the safety your vehicle was engineered to deliver.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {/* Why Genuine */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1, textAlign: 'center' }}>
            WHY GENUINE TOYOTA PARTS
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textAlign: 'center', fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            THE GENUINE ADVANTAGE
          </Typography>
          <Grid container spacing={3}>
            {WHY_GENUINE.map((item, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #EAEAEA', boxShadow: 'none', transition: 'none' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 10 }} />

        {/* Parts Catalogue Overview + Enquiry Form */}
        <Grid container spacing={6}>
          {/* Parts Categories */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              WHAT WE STOCK
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              PARTS CATEGORIES
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              We maintain extensive stock of genuine Toyota parts for all models sold in Zimbabwe. If we don't have it on the shelf, we can source it directly from Toyota's global parts network within 5–14 business days.
            </Typography>

            <Stack spacing={2}>
              {PART_CATEGORIES.map((cat) => (
                <Box key={cat.label} sx={{ bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: 3 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.875rem', mb: 1.5, color: '#1E1E1E' }}>
                    {cat.label}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {cat.parts.map(part => (
                      <Chip key={part} label={part} size="small"
                        sx={{ fontSize: '0.72rem', fontWeight: 600, bgcolor: '#F6F6F8', color: '#555', borderRadius: '5px', height: 24, '& .MuiChip-label': { px: 1 } }} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box sx={{ mt: 4, bgcolor: '#1E1E1E', color: '#FFF', p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <SupportAgentIcon sx={{ color: '#EB0A1E', flexShrink: 0, mt: 0.25 }} />
                <Box>
                  <Typography sx={{ fontWeight: 800, mb: 0.5 }}>Can't Find Your Part?</Typography>
                  <Typography variant="body2" sx={{ color: '#AAA', lineHeight: 1.7 }}>
                    Submit an enquiry with your vehicle model, year, and part number (if known). Our parts specialists will source it and provide a quotation within 2 business days.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Enquiry Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              REQUEST A QUOTE
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              PARTS ENQUIRY FORM
            </Typography>

            <Box sx={{ bgcolor: 'background.paper', p: { xs: 3, md: 5 }, border: '1px solid #EAEAEA' }}>
              {submitted && (
                <Alert severity="success" sx={{ borderRadius: 0, mb: 4, fontWeight: 600 }}>
                  Your parts enquiry has been submitted. Our parts team will contact you with a quote within 2 business days.
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

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 8 }}>
                      <FormControl fullWidth error={Boolean(errors.vehicleModel)}>
                        <InputLabel>Vehicle Model *</InputLabel>
                        <Select label="Vehicle Model *" value={formData.vehicleModel}
                          onChange={(e) => handleSelect('vehicleModel', e.target.value)} sx={{ borderRadius: 0 }}>
                          {mockVehicles.map(v => (
                            <MenuItem key={v.id} value={v.modelName}>{v.modelName}</MenuItem>
                          ))}
                        </Select>
                        {errors.vehicleModel && <FormHelperText>{errors.vehicleModel}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControl fullWidth error={Boolean(errors.modelYear)}>
                        <InputLabel>Model Year *</InputLabel>
                        <Select label="Model Year *" value={formData.modelYear}
                          onChange={(e) => handleSelect('modelYear', e.target.value)} sx={{ borderRadius: 0 }}>
                          {YEARS.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                        </Select>
                        {errors.modelYear && <FormHelperText>{errors.modelYear}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField label="Part Description *" name="partDescription" value={formData.partDescription}
                    onChange={handleChange} error={Boolean(errors.partDescription)} helperText={errors.partDescription}
                    placeholder="e.g. Front brake pads, oil filter, shock absorber rear left..."
                    multiline rows={3} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <TextField label="Toyota Part Number (if known)" name="partNumber" value={formData.partNumber}
                    onChange={handleChange} placeholder="e.g. 04465-0K350"
                    fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 7 }}>
                      <FormControl fullWidth error={Boolean(errors.branch)}>
                        <InputLabel>Collection Branch *</InputLabel>
                        <Select label="Collection Branch *" value={formData.branch}
                          onChange={(e) => handleSelect('branch', e.target.value)} sx={{ borderRadius: 0 }}>
                          {branchLocations.map((b, i) => (
                            <MenuItem key={i} value={b.name}>{b.name}</MenuItem>
                          ))}
                        </Select>
                        {errors.branch && <FormHelperText>{errors.branch}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <FormControl fullWidth error={Boolean(errors.urgency)}>
                        <InputLabel>Urgency *</InputLabel>
                        <Select label="Urgency *" value={formData.urgency}
                          onChange={(e) => handleSelect('urgency', e.target.value)} sx={{ borderRadius: 0 }}>
                          <MenuItem value="Standard">Standard (5–14 days)</MenuItem>
                          <MenuItem value="Urgent">Urgent (2–5 days)</MenuItem>
                          <MenuItem value="In Stock Check">In-Stock Check Only</MenuItem>
                        </Select>
                        {errors.urgency && <FormHelperText>{errors.urgency}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth
                    sx={{ py: 1.75, fontWeight: 800, letterSpacing: '0.08em' }}>
                    SUBMIT PARTS ENQUIRY
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* Genuine parts assurance */}
            <Box sx={{ mt: 3, bgcolor: '#FFF0F1', border: '1px solid #FFCDD2', p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineIcon sx={{ color: '#EB0A1E', flexShrink: 0, mt: 0.25 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 0.5 }}>Guaranteed Genuine</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: 'block' }}>
                  All parts supplied by CFAO Toyota Zimbabwe are 100% genuine Toyota OEM components imported directly from authorised Toyota distribution channels. We do not supply aftermarket or counterfeit parts.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Parts;
