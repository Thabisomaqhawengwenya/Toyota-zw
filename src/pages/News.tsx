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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  image: string;
  excerpt: string;
  body: string;
}

const articles: NewsArticle[] = [
  {
    id: 'prado-2024-launch',
    title: 'All-New Land Cruiser Prado Officially Launched in Zimbabwe',
    category: 'LAUNCH',
    categoryColor: '#EB0A1E',
    date: 'March 12, 2026',
    image: '/images/prado.png',
    excerpt: 'CFAO Toyota Zimbabwe officially unveils the all-new Land Cruiser Prado at a glittering event in Harare, marking a new chapter in off-road luxury.',
    body: `CFAO Toyota Zimbabwe officially unveiled the all-new Land Cruiser Prado at an exclusive media and VIP event held at the Harare International Conference Centre on 12 March 2026. The event was attended by over 300 guests including government officials, corporate fleet buyers, media personalities, and loyal Toyota customers.

The all-new Prado represents a generational redesign of the iconic model, featuring a more rugged exterior, a completely redesigned luxury interior, and advanced off-road electronics including the Multi-Terrain Select (MTS) system, Crawl Control, and the new e-KDSS electronic kinetic dynamic suspension system.

"The Land Cruiser Prado has always been the benchmark for luxury off-road capability in Zimbabwe," said the CFAO Toyota Managing Director. "The new generation takes everything our customers love about it and elevates it to a completely new level."

The new Prado is available in Zimbabwe in the 2.8L GD-6 diesel configuration with an 8-speed automatic transmission, seating for 7 passengers, and the new 12.3-inch Toyota Audio Multimedia system with wireless Apple CarPlay and Android Auto. Pricing starts from $85,000 and the vehicle is available for viewing and test drives at all CFAO Toyota branches nationwide.`,
  },
  {
    id: 'hev-eco-challenge',
    title: 'Toyota Hybrid Vehicle Sales Surge as Zimbabwe Embraces Eco-Mobility',
    category: 'ENVIRONMENT',
    categoryColor: '#2E7D32',
    date: 'January 28, 2026',
    image: '/images/corolla-cross-hev.png',
    excerpt: 'Hybrid vehicle sales at CFAO Toyota Zimbabwe grew by 47% in 2025, driven by rising fuel costs and increasing environmental awareness among Zimbabwean motorists.',
    body: `Hybrid Electric Vehicle (HEV) sales at CFAO Toyota Zimbabwe recorded a remarkable 47% year-on-year growth in 2025, reflecting a growing shift in consumer purchasing behaviour driven by fuel economy concerns and environmental responsibility.

The Corolla Cross HEV and the RAV4 Hybrid remain the top-performing models in the hybrid segment. Both vehicles use Toyota's renowned self-charging hybrid system, requiring no external charging infrastructure — a key advantage given Zimbabwe's evolving energy grid.

"Our customers are increasingly making the switch to hybrid because the numbers simply make sense," noted the CFAO Toyota Sales Director. "The Corolla Cross HEV delivers fuel economy of 4.3L/100km — that's a 40% saving for the average Harare motorist compared to a conventional petrol SUV."

CFAO Toyota Zimbabwe is also committed to responsible end-of-life battery disposal, partnering with certified recycling facilities in line with Toyota's global Environmental Challenge 2050 commitments. The company plans to expand its hybrid range in Zimbabwe during the second half of 2026 with the introduction of additional electrified models.`,
  },
  {
    id: 'cfao-fleet-mining',
    title: 'CFAO Toyota Secures Major Mining Fleet Contract',
    category: 'CORPORATE',
    categoryColor: '#1565C0',
    date: 'November 5, 2025',
    image: '/images/Toyota_Land_Cruiser_79_Pickup.jpeg',
    excerpt: 'CFAO Toyota Zimbabwe announces a landmark fleet supply agreement with a major Zimbabwean mining corporation, covering over 120 Land Cruiser 79 and Hilux units.',
    body: `CFAO Toyota Zimbabwe has announced the successful signing of a landmark fleet supply agreement with one of Zimbabwe's largest mining corporations, covering the supply of over 120 Toyota Land Cruiser 79 Pickups and Hilux Double Cab units to be deployed across mine sites in the Midlands and Matabeleland South provinces.

The contract, valued at over $8 million USD, represents the single largest fleet transaction in CFAO Toyota Zimbabwe's history and underscores the brand's dominant position in the Zimbabwean commercial and industrial vehicle segment.

"The LC79 and Hilux are the undisputed workhorses of Zimbabwe's mining industry," said the CFAO Fleet Manager. "Their bulletproof reliability, minimal downtime, and easy serviceability in remote locations make them the only choice for serious operations."

As part of the agreement, CFAO Toyota will provide a dedicated fleet maintenance programme with quarterly scheduled services, priority parts availability, and an on-site support team during the initial fleet commissioning period. The vehicles will be delivered in batches over a 6-month period beginning February 2026.`,
  },
  {
    id: 'bulawayo-expansion',
    title: 'CFAO Toyota Bulawayo Completes Major Workshop Expansion',
    category: 'DEALERSHIP',
    categoryColor: '#6A1B9A',
    date: 'October 14, 2025',
    image: '/images/Toyota_Fortuner.jpeg',
    excerpt: 'The Bulawayo branch now features a state-of-the-art 16-bay workshop, a dedicated fleet service lane, and an expanded customer lounge — doubling its servicing capacity.',
    body: `CFAO Toyota Zimbabwe's Bulawayo branch on Corner 12th Avenue & Fife Street has completed a major workshop and customer facilities expansion project, effectively doubling its vehicle servicing capacity to serve the rapidly growing demand in Matabeleland and surrounding provinces.

The expanded facility now includes:
- 16 modern service bays (up from 8)
- A dedicated 4-bay fleet express service lane
- Toyota Genuine Parts superstore with full stock holding
- New 4-wheel alignment and tyre-fitment centre
- A premium customer waiting lounge with refreshments and complimentary WiFi
- A children's play area for families

"Bulawayo is a critical hub for our operations," said the CFAO Operations Director. "This expansion is our commitment to delivering a Harare-equivalent service experience in Zimbabwe's second city."

The expansion was completed over 14 months and represents a $2.3 million investment by CFAO. The branch is now accepting bookings for the new expanded service lanes via the CFAO website or by telephone.`,
  },
  {
    id: 'hilux-facelift-2026',
    title: 'Toyota Hilux 2026 Facelift Arrives at CFAO Zimbabwe Showrooms',
    category: 'LAUNCH',
    categoryColor: '#EB0A1E',
    date: 'September 3, 2025',
    image: '/images/hilux.png',
    excerpt: 'The updated 2026 Toyota Hilux arrives with a refreshed face, upgraded infotainment, enhanced safety features, and new colour options — now available for viewing nationwide.',
    body: `The eagerly anticipated 2026 model year Toyota Hilux facelift has arrived in Zimbabwe and is now on display at all CFAO Toyota showrooms nationwide. The updated model brings meaningful improvements across several areas while retaining the legendary durability and performance that has made the Hilux the best-selling pickup in Zimbabwe for over two decades.

Key updates on the 2026 Hilux include:
- Revised front fascia with new LED daytime running light signature
- Larger 9-inch infotainment screen with wireless Apple CarPlay and Android Auto
- Toyota Safety Sense 2.0 as standard across all grades (Pre-Collision System, Lane Departure Alert, Automatic High Beams)
- New Wild Rush exterior colour option alongside 5 carry-over colours
- Updated premium leather interior on GR Sport and Legend grades
- Revised suspension tuning for improved ride quality without compromising load capacity

The 2026 Hilux continues with the proven 2.8L GD-6 turbodiesel engine paired with either 6-speed manual or 6-speed automatic transmission. Pricing for the updated range starts from $40,000 for the Single Cab and $52,000 for the Double Cab GR Sport. Test drives are available at all CFAO Toyota branches — no appointment necessary.`,
  },
  {
    id: 'toyota-safety-workshop',
    title: 'CFAO Toyota Hosts Road Safety Awareness Workshop in Harare',
    category: 'COMMUNITY',
    categoryColor: '#E65100',
    date: 'July 22, 2025',
    image: '/images/corolla.png',
    excerpt: 'CFAO Toyota Zimbabwe partnered with the Zimbabwe Traffic Safety Council to host a free road safety and defensive driving workshop for over 200 young drivers in Harare.',
    body: `CFAO Toyota Zimbabwe, in partnership with the Zimbabwe Traffic Safety Council (ZTSC) and the Traffic Safety Council of Zimbabwe, hosted a free one-day road safety and defensive driving awareness workshop at the Borrowdale Racecourse in Harare on 22 July 2025.

The event was attended by over 200 participants, predominantly young drivers between the ages of 18 and 30, and featured:
- Live demonstrations of Toyota Safety Sense technology
- Defensive driving theory and practical presentations by certified instructors
- Emergency braking and evasive manoeuvre simulations
- Tyre safety and vehicle maintenance talks
- Free vehicle safety inspections for all participants' vehicles

"Road safety is not just a corporate responsibility for us — it is deeply personal. Too many lives are lost on Zimbabwean roads every year, and we believe Toyota's safety technology and education are two of the most powerful tools in changing that narrative," said CFAO's Managing Director.

CFAO Toyota Zimbabwe plans to expand this programme to Bulawayo and Gweru in the second quarter of 2026, targeting over 1,000 young drivers annually.`,
  },
];

const CATEGORIES = ['All', 'LAUNCH', 'CORPORATE', 'ENVIRONMENT', 'DEALERSHIP', 'COMMUNITY'];

export const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured = articles[0];
  // rest of articles available for filtered grid below

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          bgcolor: '#1E1E1E',
          color: 'white',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          borderBottom: '4px solid #EB0A1E',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            LATEST UPDATES
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            NEWS & MEDIA
          </Typography>
          <Typography variant="body1" sx={{ color: '#CCCCCC', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 560, mx: 'auto' }}>
            Stay informed with the latest Toyota Zimbabwe announcements, model launches, community initiatives, and dealership news.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {/* Featured Article */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', mb: 3 }}>
            FEATURED STORY
          </Typography>
          <Box
            sx={{
              display: 'flex', flexDirection: { xs: 'column', md: 'row' },
              border: '1px solid #EAEAEA', overflow: 'hidden', bgcolor: 'background.paper',
              cursor: 'pointer',
              '&:hover img': { transform: 'scale(1.03)' },
            }}
            onClick={() => setSelectedArticle(featured)}
          >
            <Box sx={{ flex: '0 0 50%', height: { xs: 240, md: 380 }, overflow: 'hidden', bgcolor: '#F0F0F0' }}>
              <Box
                component="img"
                src={featured.image}
                alt={featured.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
              />
            </Box>
            <Box sx={{ flex: 1, p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Chip label={featured.category} size="small"
                  sx={{ bgcolor: featured.categoryColor, color: '#FFF', fontWeight: 700, fontSize: '0.65rem', borderRadius: '5px', height: 22, '& .MuiChip-label': { px: 1 } }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 13, color: '#888' }} />
                  <Typography variant="caption" color="text.secondary">{featured.date}</Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.3, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {featured.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                {featured.excerpt}
              </Typography>
              <Button endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 700, color: '#EB0A1E', textTransform: 'none', alignSelf: 'flex-start', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                Read Full Story
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Category Filter */}
        <Box sx={{ mb: 5, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase', mr: 1 }}>
            Filter:
          </Typography>
          {CATEGORIES.map(cat => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActiveCategory(cat)}
              sx={{
                fontWeight: 700, fontSize: '0.75rem', borderRadius: '7px', cursor: 'pointer',
                bgcolor: activeCategory === cat ? '#EB0A1E' : 'transparent',
                color: activeCategory === cat ? '#FFF' : 'text.secondary',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#EB0A1E' : '#DCDCDC',
                '&:hover': { bgcolor: activeCategory === cat ? '#C8081A' : '#F6F6F6', borderColor: '#EB0A1E', color: activeCategory === cat ? '#FFF' : '#EB0A1E' },
              }}
            />
          ))}
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {filtered.map(article => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={article.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column',
                  border: '1px solid #EAEAEA', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' },
                }}
                onClick={() => setSelectedArticle(article)}
              >
                <Box sx={{ height: 190, overflow: 'hidden', bgcolor: '#F0F0F0' }}>
                  <Box component="img" src={article.image} alt={article.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.04)' } }} />
                </Box>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Chip label={article.category} size="small"
                      sx={{ bgcolor: article.categoryColor, color: '#FFF', fontWeight: 700, fontSize: '0.6rem', borderRadius: '5px', height: 20, '& .MuiChip-label': { px: 0.75 } }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 11, color: '#888' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{article.date}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.4, mb: 1.5 }}>{article.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                  </Typography>
                  <Button endIcon={<ArrowForwardIcon />} size="small"
                    sx={{ mt: 2, fontWeight: 700, color: '#EB0A1E', textTransform: 'none', alignSelf: 'flex-start', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Article Dialog */}
      <Dialog
        open={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '14px', overflow: 'hidden' } } }}
      >
        {selectedArticle && (
          <>
            <Box sx={{ position: 'relative', height: 280, overflow: 'hidden', bgcolor: '#1E1E1E' }}>
              <Box component="img" src={selectedArticle.image} alt={selectedArticle.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
              <IconButton onClick={() => setSelectedArticle(null)}
                sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.55)', color: '#FFF', borderRadius: '8px', '&:hover': { bgcolor: '#EB0A1E' } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 4, pb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Chip label={selectedArticle.category} size="small"
                    sx={{ bgcolor: selectedArticle.categoryColor, color: '#FFF', fontWeight: 700, fontSize: '0.65rem', borderRadius: '5px', '& .MuiChip-label': { px: 1 } }} />
                  <Typography variant="caption" sx={{ color: '#CCC' }}>{selectedArticle.date}</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#FFF', lineHeight: 1.25 }}>{selectedArticle.title}</Typography>
              </Box>
            </Box>
            <DialogTitle sx={{ pt: 3, pb: 1 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                {selectedArticle.excerpt}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 1, pb: 4 }}>
              <Divider sx={{ mb: 3 }} />
              {selectedArticle.body.split('\n\n').map((para, idx) => (
                <Typography key={idx} variant="body1" sx={{ lineHeight: 1.85, mb: 2, color: '#333', whiteSpace: 'pre-line' }}>
                  {para}
                </Typography>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default News;
