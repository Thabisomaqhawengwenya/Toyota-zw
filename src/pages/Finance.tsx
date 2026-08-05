import React, { useState, useMemo } from 'react';
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
  Slider,
  Chip,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalculateIcon from '@mui/icons-material/Calculate';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { mockVehicles } from '../data/mockData';

interface FinanceForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentType: string;
  vehicleModel: string;
  message: string;
}

const BANKING_PARTNERS = [
  { name: 'CBZ Bank', logo: '/images/cbz.jpg', desc: 'Zimbabwe\'s largest commercial bank. Competitive rates, up to 60-month terms.' },
  { name: 'ZB Bank', logo: '/images/zb.jpeg', desc: 'Flexible vehicle finance packages with personalised repayment plans.' },
  { name: 'Steward Bank', logo: '/images/steward.jpeg', desc: 'Fast approval process. Digital-first finance experience.' },
  { name: 'FBC Bank', logo: '/images/fbc.jpeg', desc: 'Fleet and individual vehicle finance specialists in Zimbabwe.' },
];

const BENEFITS = [
  { icon: <AccountBalanceIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Low Deposit Options', desc: 'Finance your Toyota with deposits starting from as low as 15% of the vehicle price, subject to credit approval.' },
  { icon: <CalculateIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Flexible Repayment Terms', desc: 'Choose repayment periods from 12 to 60 months to match your monthly cash flow.' },
  { icon: <VerifiedIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Competitive Interest Rates', desc: 'We negotiate preferential rates with our banking partners to keep your monthly instalment manageable.' },
  { icon: <SupportAgentIcon sx={{ fontSize: 36, color: '#EB0A1E' }} />, title: 'Dedicated Finance Desk', desc: 'Our finance consultants guide you through every step — from application to key handover.' },
];

export const Finance: React.FC = () => {
  // --- Calculator state ---
  const [vehiclePrice, setVehiclePrice] = useState<number>(45000);
  const [depositPercent, setDepositPercent] = useState<number>(20);
  const [termMonths, setTermMonths] = useState<number>(48);
  const [interestRate, setInterestRate] = useState<number>(18);

  const depositAmount = useMemo(() => (vehiclePrice * depositPercent) / 100, [vehiclePrice, depositPercent]);
  const loanAmount = useMemo(() => vehiclePrice - depositAmount, [vehiclePrice, depositAmount]);
  const monthlyRate = useMemo(() => interestRate / 100 / 12, [interestRate]);
  const monthlyInstalment = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / termMonths;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }, [loanAmount, monthlyRate, termMonths]);
  const totalRepayable = useMemo(() => monthlyInstalment * termMonths + depositAmount, [monthlyInstalment, termMonths, depositAmount]);

  // --- Application form state ---
  const [formData, setFormData] = useState<FinanceForm>({
    firstName: '', lastName: '', email: '', phone: '',
    employmentType: '', vehicleModel: '', message: '',
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
    if (!formData.employmentType) e.employmentType = 'Please select employment type';
    if (!formData.vehicleModel) e.vehicleModel = 'Please select a vehicle';
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
      setFormData({ firstName: '', lastName: '', email: '', phone: '', employmentType: '', vehicleModel: '', message: '' });
      setTimeout(() => setSubmitted(false), 10000);
    }
  };

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.75) 100%), url(/images/corolla.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 13 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            DRIVE NOW, PAY OVER TIME
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            VEHICLE FINANCE
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 580, mx: 'auto' }}>
            We partner with Zimbabwe's leading banks to offer flexible, affordable vehicle finance solutions for individuals, businesses, and fleets.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {/* Benefits */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1, textAlign: 'center' }}>
            WHY FINANCE WITH US
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textAlign: 'center', fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            FINANCE BENEFITS
          </Typography>
          <Grid container spacing={3}>
            {BENEFITS.map((b, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #EAEAEA', boxShadow: 'none', transition: 'none' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      {b.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{b.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{b.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 10 }} />

        {/* Payment Calculator + Form */}
        <Grid container spacing={6}>
          {/* Calculator */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              ESTIMATE YOUR REPAYMENTS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              PAYMENT CALCULATOR
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              Use this calculator to estimate your monthly instalment. Actual rates and terms are confirmed by our banking partners based on credit assessment.
            </Typography>

            <Box sx={{ bgcolor: 'background.paper', p: 4, border: '1px solid #EAEAEA' }}>
              <Stack spacing={4}>
                {/* Vehicle Price */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Vehicle Price</Typography>
                    <Typography sx={{ fontWeight: 800, color: '#EB0A1E' }}>{fmt(vehiclePrice)}</Typography>
                  </Box>
                  <Slider
                    value={vehiclePrice}
                    onChange={(_, v) => setVehiclePrice(v as number)}
                    min={15000} max={145000} step={500}
                    sx={{ color: '#EB0A1E', '& .MuiSlider-thumb': { borderRadius: 0 } }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">$15,000</Typography>
                    <Typography variant="caption" color="text.secondary">$145,000</Typography>
                  </Box>
                </Box>

                {/* Deposit */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Deposit ({depositPercent}%)</Typography>
                    <Typography sx={{ fontWeight: 800, color: '#EB0A1E' }}>{fmt(depositAmount)}</Typography>
                  </Box>
                  <Slider
                    value={depositPercent}
                    onChange={(_, v) => setDepositPercent(v as number)}
                    min={10} max={50} step={5}
                    sx={{ color: '#EB0A1E', '& .MuiSlider-thumb': { borderRadius: 0 } }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">10%</Typography>
                    <Typography variant="caption" color="text.secondary">50%</Typography>
                  </Box>
                </Box>

                {/* Term */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Repayment Term</Typography>
                    <Typography sx={{ fontWeight: 800, color: '#EB0A1E' }}>{termMonths} months</Typography>
                  </Box>
                  <Slider
                    value={termMonths}
                    onChange={(_, v) => setTermMonths(v as number)}
                    min={12} max={60} step={12}
                    marks sx={{ color: '#EB0A1E', '& .MuiSlider-thumb': { borderRadius: 0 } }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">12 mo</Typography>
                    <Typography variant="caption" color="text.secondary">60 mo</Typography>
                  </Box>
                </Box>

                {/* Interest Rate */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Interest Rate (Annual)</Typography>
                    <Typography sx={{ fontWeight: 800, color: '#EB0A1E' }}>{interestRate}%</Typography>
                  </Box>
                  <Slider
                    value={interestRate}
                    onChange={(_, v) => setInterestRate(v as number)}
                    min={8} max={35} step={0.5}
                    sx={{ color: '#EB0A1E', '& .MuiSlider-thumb': { borderRadius: 0 } }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">8%</Typography>
                    <Typography variant="caption" color="text.secondary">35%</Typography>
                  </Box>
                </Box>

                <Divider />

                {/* Result */}
                <Box sx={{ bgcolor: '#1E1E1E', color: '#FFF', p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: '#AAA', display: 'block', mb: 0.5 }}>LOAN AMOUNT</Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{fmt(loanAmount)}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: '#AAA', display: 'block', mb: 0.5 }}>TOTAL REPAYABLE</Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{fmt(totalRepayable)}</Typography>
                    </Grid>
                    <Grid size={12}>
                      <Divider sx={{ borderColor: '#333', my: 1 }} />
                      <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 700, letterSpacing: '1px', display: 'block', mb: 0.5 }}>
                        ESTIMATED MONTHLY INSTALMENT
                      </Typography>
                      <Typography sx={{ fontWeight: 900, fontSize: '2rem', color: '#EB0A1E' }}>
                        {fmt(monthlyInstalment)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: 'block' }}>
                  * This calculator provides an estimate only. Final monthly instalments, interest rates, and terms are subject to credit assessment and confirmation by the lending institution. Rates are indicative and may vary.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Application Form */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>
              GET PRE-QUALIFIED
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              FINANCE APPLICATION
            </Typography>

            <Box sx={{ bgcolor: 'background.paper', p: 4, border: '1px solid #EAEAEA' }}>
              {submitted && (
                <Alert severity="success" sx={{ borderRadius: 0, mb: 3, fontWeight: 600 }}>
                  Your finance enquiry has been received. A finance consultant will contact you within 24 hours.
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

                  <TextField label="Email Address *" name="email" type="email" value={formData.email}
                    onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}
                    fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <TextField label="Phone Number *" name="phone" value={formData.phone}
                    onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone}
                    placeholder="+263..." fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <FormControl fullWidth error={Boolean(errors.employmentType)}>
                    <InputLabel>Employment Type *</InputLabel>
                    <Select label="Employment Type *" value={formData.employmentType}
                      onChange={(e) => handleSelect('employmentType', e.target.value)} sx={{ borderRadius: 0 }}>
                      <MenuItem value="Salaried Employee">Salaried Employee</MenuItem>
                      <MenuItem value="Self Employed">Self Employed / Business Owner</MenuItem>
                      <MenuItem value="Government">Government / Parastatal</MenuItem>
                      <MenuItem value="Corporate Fleet">Corporate Fleet Purchase</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.employmentType && <FormHelperText>{errors.employmentType}</FormHelperText>}
                  </FormControl>

                  <FormControl fullWidth error={Boolean(errors.vehicleModel)}>
                    <InputLabel>Vehicle of Interest *</InputLabel>
                    <Select label="Vehicle of Interest *" value={formData.vehicleModel}
                      onChange={(e) => handleSelect('vehicleModel', e.target.value)} sx={{ borderRadius: 0 }}>
                      {mockVehicles.map(v => (
                        <MenuItem key={v.id} value={v.modelName}>{v.modelName} — {v.priceRange}</MenuItem>
                      ))}
                    </Select>
                    {errors.vehicleModel && <FormHelperText>{errors.vehicleModel}</FormHelperText>}
                  </FormControl>

                  <TextField label="Additional Notes (Optional)" name="message" value={formData.message}
                    onChange={handleChange} multiline rows={3} fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />

                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth
                    sx={{ py: 1.75, fontWeight: 800, letterSpacing: '0.08em' }}>
                    SUBMIT FINANCE ENQUIRY
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* Banking Partners */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary', letterSpacing: '0.08em' }}>
                OUR BANKING PARTNERS
              </Typography>
              <Grid container spacing={2}>
                {BANKING_PARTNERS.map((bank) => (
                  <Grid size={{ xs: 6 }} key={bank.name}>
                    <Box sx={{
                      bgcolor: '#FFFFFF',
                      border: '1px solid #EAEAEA',
                      borderRadius: '8px',
                      p: 2.5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 1.5,
                      transition: 'box-shadow 0.2s, border-color 0.2s',
                      '&:hover': {
                        borderColor: '#EB0A1E',
                        boxShadow: '0 4px 16px rgba(235,10,30,0.08)',
                      },
                    }}>
                      {/* Logo area — fixed height so all cards align */}
                      <Box sx={{ height: 52, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                          component="img"
                          src={bank.logo}
                          alt={`${bank.name} logo`}
                          sx={{
                            maxWidth: '100%',
                            maxHeight: 52,
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: 'block', fontSize: '0.72rem' }}>
                        {bank.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* What You Need */}
        <Divider sx={{ my: 10 }} />
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 1 }}>DOCUMENTATION REQUIRED</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>WHAT TO BRING</Typography>
        </Box>
        <Grid container spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
          {[
            'Valid Zimbabwe National ID or Passport',
            '3 months recent bank statements',
            'Latest payslip or proof of income',
            'Proof of residence (utility bill, lease agreement)',
            'Driver\'s licence (valid)',
            'Company registration documents (for business purchases)',
          ].map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6 }} key={idx}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: 2 }}>
                <Chip label={idx + 1} size="small" sx={{ bgcolor: '#EB0A1E', color: '#FFF', fontWeight: 800, height: 24, minWidth: 24, borderRadius: '50%', '& .MuiChip-label': { px: 0.75, fontSize: '0.75rem' } }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Finance;
