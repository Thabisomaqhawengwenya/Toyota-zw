import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ComparisonDrawer from './components/organisms/ComparisonDrawer';
import ToyotaChat from './components/organisms/ToyotaChat';
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from "@vercel/analytics/react";

// Pages
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Listings from './pages/Listings';
import TestDrive from './pages/TestDrive';
import Promotions from './pages/Promotions';
import Finance from './pages/Finance';
import News from './pages/News';
import Parts from './pages/Parts';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiePreferences from './pages/CookiePreferences';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetail />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/services" element={<Services />} />
              <Route path="/test-drive" element={<TestDrive />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/cookie-preferences" element={<CookiePreferences />} />
            </Routes>
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
