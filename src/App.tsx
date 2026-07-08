import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ComparisonDrawer from './components/organisms/ComparisonDrawer';

// Pages
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Listings from './pages/Listings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <Footer />
          <ComparisonDrawer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
