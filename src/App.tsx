import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import theme from './theme/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ComparisonDrawer from './components/organisms/ComparisonDrawer';
import ToyotaChat from './components/organisms/ToyotaChat';
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';

// Code-split every page — only Home loads eagerly, all others are lazy
import Home from './pages/Home';
const Vehicles        = lazy(() => import('./pages/Vehicles'));
const VehicleDetail   = lazy(() => import('./pages/VehicleDetail'));
const Listings        = lazy(() => import('./pages/Listings'));
const Services        = lazy(() => import('./pages/Services'));
const TestDrive       = lazy(() => import('./pages/TestDrive'));
const Promotions      = lazy(() => import('./pages/Promotions'));
const Finance         = lazy(() => import('./pages/Finance'));
const Parts           = lazy(() => import('./pages/Parts'));
const News            = lazy(() => import('./pages/News'));
const About           = lazy(() => import('./pages/About'));
const Contact         = lazy(() => import('./pages/Contact'));
const PrivacyPolicy   = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse      = lazy(() => import('./pages/TermsOfUse'));
const CookiePreferences = lazy(() => import('./pages/CookiePreferences'));

// Lightweight full-page loader shown during lazy route transitions
const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
    }}
    role="status"
    aria-label="Loading page"
  >
    <CircularProgress sx={{ color: '#EB0A1E' }} size={40} thickness={4} />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        {/* Skip-to-content link — hidden until focused, first accessibility fix */}
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            top: -100,
            left: 16,
            zIndex: 9999,
            bgcolor: '#EB0A1E',
            color: '#FFFFFF',
            px: 2,
            py: 1,
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.875rem',
            textDecoration: 'none',
            transition: 'top 0.2s',
            '&:focus': { top: 8 },
          }}
        >
          Skip to main content
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Header />
          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{ flexGrow: 1, outline: 'none' }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"                   element={<Home />} />
                <Route path="/vehicles"           element={<Vehicles />} />
                <Route path="/vehicles/:id"       element={<VehicleDetail />} />
                <Route path="/listings"           element={<Listings />} />
                <Route path="/services"           element={<Services />} />
                <Route path="/test-drive"         element={<TestDrive />} />
                <Route path="/promotions"         element={<Promotions />} />
                <Route path="/finance"            element={<Finance />} />
                <Route path="/parts"              element={<Parts />} />
                <Route path="/news"               element={<News />} />
                <Route path="/about"              element={<About />} />
                <Route path="/contact"            element={<Contact />} />
                <Route path="/privacy-policy"     element={<PrivacyPolicy />} />
                <Route path="/terms-of-use"       element={<TermsOfUse />} />
                <Route path="/cookie-preferences" element={<CookiePreferences />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
          <ComparisonDrawer />
          <ToyotaChat />
        </Box>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;
