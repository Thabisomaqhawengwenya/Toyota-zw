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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSavedStore } from '../../store/savedStore';
import { SavedDrawer } from '../organisms/SavedDrawer';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileModelsOpen, setMobileModelsOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { savedListings } = useSavedStore();

  const handleModelsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModelsClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: string) => {
    handleModelsClose();
    navigate(`/vehicles?category=${category}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Models', path: '/vehicles', hasDropdown: true },
    { label: 'Listings', path: '/listings' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const vehicleCategories = ['City', 'Sedan', 'SUV', '4x4', 'Pick-up', 'LCV'];

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
                display: 'flex',
                alignItems: 'center',
                fontWeight: 800,
                textDecoration: 'none',
                color: 'secondary.main',
                gap: 1.5,
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Toyota Logo"
                sx={{ height: 35, objectFit: 'contain' }}
              />
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: 'secondary.main',
                  letterSpacing: '1px',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                TOYOTA
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    fontSize: '0.8rem',
                    letterSpacing: '1px',
                    borderLeft: '1px solid #E0E0E0',
                    pl: 1,
                    display: { xs: 'none', sm: 'inline-block' },
                  }}
                >
                  ZIMBABWE
                </Box>
              </Typography>
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                if (item.hasDropdown) {
                  return (
                    <Box key={item.label}>
                      <Button
                        aria-controls="models-menu"
                        aria-haspopup="true"
                        onClick={handleModelsClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: 600,
                          borderBottom: isActive ? '3px solid #EB0A1E' : '3px solid transparent',
                          borderRadius: 0,
                          px: 2,
                          py: 2.5,
                          '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
                        }}
                      >
                        {item.label}
                      </Button>
                      <Menu
                        id="models-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleModelsClose}
                        elevation={3}
                        sx={{
                          '& .MuiPaper-root': { borderRadius: 0, mt: 0.5, minWidth: 180 },
                        }}
                      >
                        <MenuItem
                          onClick={() => { handleModelsClose(); navigate('/vehicles'); }}
                          sx={{ fontWeight: 700 }}
                        >
                          All Models
                        </MenuItem>
                        {vehicleCategories.map((cat) => (
                          <MenuItem key={cat} onClick={() => handleCategorySelect(cat)}>
                            {cat} Lineup
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  );
                }

                return (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? 'primary.main' : 'text.primary',
                      fontWeight: 600,
                      borderBottom: isActive ? '3px solid #EB0A1E' : '3px solid transparent',
                      borderRadius: 0,
                      px: 2,
                      py: 2.5,
                      '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Saved / Favourites Heart Icon */}
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
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#EB0A1E',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.65rem',
                    },
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, color: 'text.primary' }}
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
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, borderRadius: 0 },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              NAVIGATION
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <Box key={item.label}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => setMobileModelsOpen(!mobileModelsOpen)}>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>}
                        />
                        <KeyboardArrowDownIcon
                          sx={{
                            transform: mobileModelsOpen ? 'rotate(180deg)' : 'none',
                            transition: '0.2s',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={mobileModelsOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ pl: 3, bgcolor: '#fbfbfb' }}>
                        <ListItemButton
                          onClick={() => { handleDrawerToggle(); navigate('/vehicles'); }}
                        >
                          <ListItemText primary="All Models" />
                        </ListItemButton>
                        {vehicleCategories.map((cat) => (
                          <ListItemButton
                            key={cat}
                            onClick={() => { handleDrawerToggle(); navigate(`/vehicles?category=${cat}`); }}
                          >
                            <ListItemText primary={`${cat} Lineup`} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={handleDrawerToggle}
                    selected={location.pathname === item.path}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </AppBar>

      {/* Saved Vehicles Drawer */}
      <SavedDrawer open={savedOpen} onClose={() => setSavedOpen(false)} />
    </>
  );
};

export default Header;
