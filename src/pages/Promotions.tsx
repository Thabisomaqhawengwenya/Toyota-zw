import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  image: string;
  expires: string;
  description: string;
  fullDetail: string;
  cta: string;
  ctaLink: string;
}

const promotions: Promotion[] = [
  {
    id: 'hilux-fleet-deal',
    title: 'Hilux Fleet Advantage',
    subtitle: 'Special pricing for orders of 3+ Hilux units',
    tag: 'FLEET DEAL',
    tagColor: '#1565C0',
    image: '/images/hilux.png',
    expires: '31 August 2026',
    description: 'Purchase 3 or more Toyota Hilux Double Cab units and receive preferential fleet pricing plus complimentary 2-year service plans on each vehicle.',
    fullDetail: 'Exclusive for corporate, mining, and agricultural fleet buyers. Available on Hilux 2.8 GD-6 Double Cab models. Includes free 2-year/30,000 km service plans per vehicle, dedicated fleet account manager, priority workshop service across all branches, and zero-cost delivery to any Zimbabwe location. Contact our fleet desk at fleet@cfao.com or call +263 (24) 2750031.',
    cta: 'ENQUIRE FLEET DEAL',
    ctaLink: '/contact',
  },
  {
    id: 'corolla-cross-hev-launch',
    title: 'Corolla Cross HEV Launch Offer',
    subtitle: "Save on Zimbabwe's most fuel-efficient SUV",
    tag: 'LIMITED OFFER',
    tagColor: '#EB0A1E',
    image: '/images/corolla-cross-hev.png',
    expires: '30 September 2026',
    description: 'Introductory pricing on the Corolla Cross Hybrid. Take advantage of reduced deposit requirements and extended 5-year warranty coverage.',
    fullDetail: 'For a limited period, the Corolla Cross HEV is available with a reduced 10% deposit (standard: 20%), a complimentary extended 5-year/100,000 km warranty, free window tinting at any CFAO branch, and a complimentary first scheduled service. Offer valid while stocks last. Available at Harare and Bulawayo branches only.',
    cta: 'CLAIM THIS OFFER',
    ctaLink: '/contact',
  },
  {
    id: 'service-winter-special',
    title: 'Mid-Year Service Special',
    subtitle: '15% off all scheduled maintenance services',
    tag: 'SERVICE DEAL',
    tagColor: '#2E7D32',
    image: '/images/Toyota_Fortuner.jpeg',
    expires: '31 July 2026',
    description: 'Book any scheduled maintenance service at a CFAO Toyota workshop during this period and receive a 15% discount plus a complimentary multi-point vehicle inspection.',
    fullDetail: 'Valid for all Toyota models. The promotion covers 10,000 km, 20,000 km, 40,000 km, and 80,000 km scheduled services. Includes 15% discount on all labour and genuine parts, a complimentary 50-point vehicle health check, free tyre rotation, and free battery test. Book through the Services page or call your nearest branch. Cannot be combined with other workshop offers.',
    cta: 'BOOK SERVICE NOW',
    ctaLink: '/services',
  },
  {
    id: 'prado-test-drive',
    title: 'Prado VIP Test Drive Event',
    subtitle: 'Exclusive off-road experience at Harare',
    tag: 'EVENT',
    tagColor: '#6A1B9A',
    image: '/images/prado.png',
    expires: '15 August 2026',
    description: 'Register for an exclusive guided off-road Land Cruiser Prado experience at our Harare dealership. Limited spaces available.',
    fullDetail: 'Join us at CFAO Toyota Harare (59-61 Coventry Road) for an exclusive hands-on off-road experience with the all-new Land Cruiser Prado. The event includes a guided off-road track experience, full vehicle demonstration with our master technicians, light refreshments, and exclusive pricing available on the day only. Saturday, 9 August 2026, 09:00 AM – 1:00 PM. Pre-registration mandatory. Spaces limited to 30 guests.',
    cta: 'REGISTER NOW',
    ctaLink: '/test-drive',
  },
  {
    id: 'lc300-executive',
    title: 'Land Cruiser 300 Executive Package',
    subtitle: 'Complimentary accessories worth $3,500',
    tag: 'NEW OFFER',
    tagColor: '#EB0A1E',
    image: '/images/lc300.png',
    expires: '30 October 2026',
    description: 'Purchase a Land Cruiser 300 and receive a complimentary premium accessories package including bull bar, side steps, and roof rack.',
    fullDetail: 'On any new LC300 purchase, receive a complimentary Toyota accessories pack valued at $3,500 including: heavy-duty steel bull bar, side steps, roof rack system, rubber cargo liner, and all-weather floor mats. Accessories are installed by our certified technicians at no extra cost. Vehicle registration and number plates are also included. Available at all CFAO branches. Offer cannot be combined with fleet pricing.',
    cta: 'ENQUIRE NOW',
    ctaLink: '/contact',
  },
  {
    id: 'rav4-finance',
    title: 'RAV4 Easy Finance Package',
    subtitle: 'Low deposit, flexible repayments',
    tag: 'FINANCE DEAL',
    tagColor: '#E65100',
    image: '/images/rav4.png',
    expires: '31 December 2026',
    description: 'Drive away a brand new RAV4 with just 15% deposit and enjoy flexible repayment terms up to 60 months through our banking partners.',
    fullDetail: 'In partnership with CBZ Bank and ZB Bank, CFAO Toyota is offering a special RAV4 finance package: 15% minimum deposit, repayment terms of 24 to 60 months, competitive interest rates, and no early settlement penalties. Vehicle comprehensive insurance facilitated by our team. Applicable to Zimbabwean citizens and residents with valid proof of income. Visit any branch with 3 months bank statements, payslip, and national ID to apply.',
    cta: 'APPLY FOR FINANCE',
    ctaLink: '/finance',
  },
];

export const Promotions: React.FC = () => {
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.8) 100%), url(/images/corolla-cross-hev.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 13 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            EXCLUSIVE DEALS
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            CURRENT PROMOTIONS
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 580, mx: 'auto' }}>
            Explore our latest offers on new vehicles, service specials, fleet deals, and finance packages — available for a limited time.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 0.5 }}>
              AVAILABLE NOW
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              ACTIVE OFFERS
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {promotions.length} promotions currently active
          </Typography>
        </Box>

        <Divider sx={{ mb: 6 }} />

        <Grid container spacing={4}>
          {promotions.map((promo) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={promo.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #EAEAEA',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 32px rgba(0,0,0,0.11)' },
                }}
              >
                {/* Image */}
                <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', bgcolor: '#F0F0F0' }}>
                  <Box
                    component="img"
                    src={promo.image}
                    alt={promo.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                  <Chip
                    label={promo.tag}
                    size="small"
                    sx={{
                      position: 'absolute', top: 12, left: 12,
                      bgcolor: promo.tagColor, color: '#FFFFFF',
                      fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.06em',
                      height: 24, borderRadius: '6px', '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.75, lineHeight: 1.3 }}>
                    {promo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {promo.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2.5, mt: 'auto' }}>
                    <AccessTimeIcon sx={{ fontSize: 15, color: '#EB0A1E' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#555' }}>
                      Expires: {promo.expires}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setSelectedPromo(promo)}
                      sx={{
                        fontWeight: 700, borderRadius: '7px', textTransform: 'none',
                        borderColor: '#DCDCDC', color: 'text.primary', fontSize: '0.8rem',
                        '&:hover': { borderColor: '#1E1E1E' },
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      to={promo.ctaLink}
                      sx={{
                        fontWeight: 700, borderRadius: '7px', textTransform: 'none',
                        bgcolor: '#EB0A1E', boxShadow: 'none', fontSize: '0.8rem',
                        '&:hover': { bgcolor: '#C8081A' },
                      }}
                    >
                      {promo.cta}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Terms note */}
        <Box sx={{ mt: 8, bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <LocalOfferIcon sx={{ color: '#EB0A1E', mt: 0.25, flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>TERMS & CONDITIONS</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                All promotions are subject to availability and may be withdrawn without prior notice. Offers cannot be combined unless otherwise stated. 
                Vehicle images are for illustrative purposes only. Final pricing is confirmed at the dealership. 
                Finance offers are subject to credit approval by respective banking partners. 
                CFAO Toyota Zimbabwe reserves the right to amend offer terms at any time.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Promotion Detail Dialog */}
      <Dialog
        open={Boolean(selectedPromo)}
        onClose={() => setSelectedPromo(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '14px', overflow: 'hidden' } } }}
      >
        {selectedPromo && (
          <>
            <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', bgcolor: '#1E1E1E' }}>
              <Box
                component="img"
                src={selectedPromo.image}
                alt={selectedPromo.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              <IconButton
                onClick={() => setSelectedPromo(null)}
                sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.5)', color: '#FFF', borderRadius: '8px', '&:hover': { bgcolor: '#EB0A1E' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 3, pb: 2.5 }}>
                <Chip label={selectedPromo.tag} size="small"
                  sx={{ bgcolor: selectedPromo.tagColor, color: '#FFF', fontWeight: 700, fontSize: '0.65rem', borderRadius: '6px', mb: 0.75, '& .MuiChip-label': { px: 1 } }} />
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#FFF', lineHeight: 1.2 }}>
                  {selectedPromo.title}
                </Typography>
              </Box>
            </Box>
            <DialogTitle sx={{ pt: 3, pb: 1 }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                <AccessTimeIcon sx={{ fontSize: 16, color: '#EB0A1E' }} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#555' }}>
                  Expires: {selectedPromo.expires}
                </Typography>
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 3 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#3A3A3A', mb: 3 }}>
                {selectedPromo.fullDetail}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to={selectedPromo.ctaLink}
                onClick={() => setSelectedPromo(null)}
                sx={{
                  fontWeight: 700, bgcolor: '#EB0A1E', borderRadius: '8px',
                  textTransform: 'none', py: 1.5, boxShadow: 'none',
                  '&:hover': { bgcolor: '#C8081A' },
                }}
              >
                {selectedPromo.cta}
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Promotions;
