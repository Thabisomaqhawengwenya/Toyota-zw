import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Collapse,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSavedStore } from '../../store/savedStore';
import { SavedDrawer } from '../organisms/SavedDrawer';

export const Header: React.FC = () => {
  const [modelsAnchorEl, setModelsAnchorEl] = useState<null | HTMLElement>(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileModelsOpen, setMobileModelsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { savedListings } = useSavedStore();

  const handleModelsClick = (event: React.MouseEvent<HTMLButtonElement>) => setModelsAnchorEl(event.currentTarget);
  const handleModelsClose = () => setModelsAnchorEl(null);

  const handleServicesClick = (event: React.MouseEvent<HTMLButtonElement>) => setServicesAnchorEl(event.currentTarget);
  const handleServicesClose = () => setServicesAnchorEl(null);

  const handleCategorySelect = (category: string) => {
    handleModelsClose();
    navigate(`/vehicles?category=${category}`);
  };

  const vehicleCategories = ['City', 'Sedan', 'SUV', '4x4', 'Pick-up', 'LCV'];

  const isActive = (path: string) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const navButtonSx = (path: string) => ({
    color: isActive(path) ? 'primary.main' : 'text.primary',
    fontWeight: 600,
    borderBottom: isActive(path) ? '3px solid #EB0A1E' : '3px solid transparent',
    borderRadius: 0,
    px: 1.5,
    py: 2.5,
    fontSize: '0.82rem',
    whiteSpace: 'nowrap',
    '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
  });

  const dropdownSx = {
    '& .MuiPaper-root': { borderRadius: 0, mt: 0.5, minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
  };

  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: '#FFFFFF', color: '#000000' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 70 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                display: 'flex', alignItems: 'center', fontWeight: 800,
                textDecoration: 'none', color: 'secondary.main', gap: 1.5,
              }}
            >
              <Box component="img" src="/images/logo.png" alt="Toyota Logo"
                sx={{ height: 35, objectFit: 'contain' }} />
              <Typography component="span" variant="h6"
                sx={{ fontWeight: 900, color: 'secondary.main', letterSpacing: '1px', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                TOYOTA
                <Box component="span"
                  sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: '1px', borderLeft: '1px solid #E0E0E0', pl: 1, display: { xs: 'none', sm: 'inline-block' } }}>
                  ZIMBABWE
                </Box>
              </Typography>
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0 }}>
              {/* Models dropdown */}
              <Box>
                <Button
                  aria-controls="models-menu"
                  aria-haspopup="true"
                  onClick={handleModelsClick}
                  endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem !important', transform: Boolean(modelsAnchorEl) ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />}
                  sx={navButtonSx('/vehicles')}
                >
                  Models
                </Button>
                <Menu id="models-menu" anchorEl={modelsAnchorEl} keepMounted
                  open={Boolean(modelsAnchorEl)} onClose={handleModelsClose}
                  elevation={3} sx={dropdownSx}>
                  <MenuItem onClick={() => { handleModelsClose(); navigate('/vehicles'); }} sx={{ fontWeight: 700 }}>
                    All Models
                  </MenuItem>
                  <Divider />
                  {vehicleCategories.map(cat => (
                    <MenuItem key={cat} onClick={() => handleCategorySelect(cat)}>
                      {cat} Lineup
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={() => { handleModelsClose(); navigate('/listings'); }}>
                    Pre-Owned Listings
                  </MenuItem>
                </Menu>
              </Box>

              <Button component={Link} to="/test-drive" sx={navButtonSx('/test-drive')}>Test Drive</Button>
              <Button component={Link} to="/finance" sx={navButtonSx('/finance')}>Finance</Button>

              {/* After Sales dropdown */}
              <Box>
                <Button
                  aria-controls="services-menu"
                  aria-haspopup="true"
                  onClick={handleServicesClick}
                  endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem !important', transform: Boolean(servicesAnchorEl) ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />}
                  sx={{
                    ...navButtonSx('/services'),
                    color: (isActive('/services') || isActive('/parts')) ? 'primary.main' : 'text.primary',
                    borderBottom: (isActive('/services') || isActive('/parts')) ? '3px solid #EB0A1E' : '3px solid transparent',
                  }}
                >
                  After Sales
                </Button>
                <Menu id="services-menu" anchorEl={servicesAnchorEl} keepMounted
                  open={Boolean(servicesAnchorEl)} onClose={handleServicesClose}
                  elevation={3} sx={dropdownSx}>
                  <MenuItem onClick={() => { handleServicesClose(); navigate('/services'); }}>
                    Workshop & Servicing
                  </MenuItem>
                  <MenuItem onClick={() => { handleServicesClose(); navigate('/parts'); }}>
                    Spare Parts & Accessories
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => { handleServicesClose(); navigate('/promotions'); }}>
                    Current Promotions
                  </MenuItem>
                </Menu>
              </Box>

              <Button component={Link} to="/news" sx={navButtonSx('/news')}>News</Button>
              <Button component={Link} to="/contact" sx={navButtonSx('/contact')}>Contact</Button>
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Saved Heart */}
              <IconButton
                onClick={() => setSavedOpen(true)}
                aria-label="Saved vehicles"
                sx={{
                  color: savedListings.length > 0 ? '#EB0A1E' : 'text.secondary',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#EB0A1E' },
                }}
              >
                <Badge
                  badgeContent={savedListings.length}
                  sx={{ '& .MuiBadge-badge': { bgcolor: '#EB0A1E', color: '#fff', fontWeight: 800, fontSize: '0.65rem' } }}
                >
                  <FavoriteIcon sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { lg: 'none' }, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, borderRadius: 0 },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>NAVIGATION</Typography>
            <IconButton onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <List sx={{ pt: 0 }}>
            {/* Home */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={() => setMobileOpen(false)} selected={location.pathname === '/'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Home</Typography>} />
              </ListItemButton>
            </ListItem>

            {/* Models accordion */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setMobileModelsOpen(!mobileModelsOpen)}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Models</Typography>} />
                <KeyboardArrowDownIcon sx={{ transform: mobileModelsOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileModelsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3, bgcolor: '#FAFAFA' }}>
                <ListItemButton onClick={() => { setMobileOpen(false); navigate('/vehicles'); }}>
                  <ListItemText primary="All Models" />
                </ListItemButton>
                {vehicleCategories.map(cat => (
                  <ListItemButton key={cat} onClick={() => { setMobileOpen(false); navigate(`/vehicles?category=${cat}`); }}>
                    <ListItemText primary={`${cat} Lineup`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/listings" onClick={() => setMobileOpen(false)} selected={location.pathname === '/listings'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Listings</Typography>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/test-drive" onClick={() => setMobileOpen(false)} selected={location.pathname === '/test-drive'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Book a Test Drive</Typography>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/promotions" onClick={() => setMobileOpen(false)} selected={location.pathname === '/promotions'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Promotions</Typography>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/finance" onClick={() => setMobileOpen(false)} selected={location.pathname === '/finance'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Vehicle Finance</Typography>} />
              </ListItemButton>
            </ListItem>

            {/* After Sales accordion */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>After Sales</Typography>} />
                <KeyboardArrowDownIcon sx={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3, bgcolor: '#FAFAFA' }}>
                <ListItemButton onClick={() => { setMobileOpen(false); navigate('/services'); }}>
                  <ListItemText primary="Workshop & Servicing" />
                </ListItemButton>
                <ListItemButton onClick={() => { setMobileOpen(false); navigate('/parts'); }}>
                  <ListItemText primary="Spare Parts & Accessories" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/news" onClick={() => setMobileOpen(false)} selected={location.pathname === '/news'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>News & Media</Typography>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about" onClick={() => setMobileOpen(false)} selected={location.pathname === '/about'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>About Us</Typography>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact" onClick={() => setMobileOpen(false)} selected={location.pathname === '/contact'}>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Contact Us</Typography>} />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Mobile CTA */}
          <Box sx={{ p: 2, borderTop: '1px solid #EAEAEA', mt: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/test-drive"
              onClick={() => setMobileOpen(false)}
              sx={{ fontWeight: 700, textTransform: 'none', py: 1.25 }}
            >
              Book a Test Drive
            </Button>
          </Box>
        </Drawer>
      </AppBar>

      {/* Saved Vehicles Drawer */}
      <SavedDrawer open={savedOpen} onClose={() => setSavedOpen(false)} />
    </>
  );
};

export default Header;
