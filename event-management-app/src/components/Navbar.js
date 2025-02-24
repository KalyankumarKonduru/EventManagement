import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputAdornment,
  Popover,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

// Import from @react-google-maps/api
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const NavBar = ({
  user,
  onLogout,
  onSearch,
  onLocationChange,
  onToggleView,
  currentViewMode = 'list'
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // For calendar popover
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const autocompleteRef = useRef(null);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleToggleView = (mode) => {
    if (onToggleView) onToggleView(mode);
  };

  // Called when user selects a place in autocomplete
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        // Pass lat/lng to parent
        if (onLocationChange) {
          onLocationChange({ lat, lng });
        }
      }
    }
  };

  // Drawer content for "My Account"
  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {user ? `Hello, ${user.name}` : 'My Account'}
      </Typography>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="My Tickets" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Upcoming Events" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Past Events" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="My Listings" />
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem button>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="My Settings" />
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem button>
          <ListItemText primary="Need Help?" />
        </ListItem>
        <ListItem button onClick={onLogout}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  // Handle calendar icon click
  const handleCalendarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'calendar-popover' : undefined;

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <AppBar position="static" sx={{ bgcolor: '#0a67bf' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Event Management
          </Typography>

          {/* Google Places Autocomplete for location */}
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Location"
              style={{
                width: 150,
                height: 35,
                fontSize: 14,
                marginRight: '1rem',
                borderRadius: 4,
                border: '1px solid #ccc',
                padding: '0 8px'
              }}
            />
          </Autocomplete>

          {/* Calendar icon (popover with date fields) */}
          <IconButton sx={{ color: '#fff', mr: 2 }} onClick={handleCalendarClick}>
            <CalendarMonthIcon />
          </IconButton>

          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseCalendar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="body1">Start Date</Typography>
              <TextField
                type="date"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Typography variant="body1">End Date</Typography>
              <TextField
                type="date"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" onClick={handleCloseCalendar}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    // You could pass date range back to parent here
                    console.log('Selected date range:', startDate, endDate);
                    handleCloseCalendar();
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Popover>

          {/* Main Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              mr: 2,
              bgcolor: 'white',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              p: '0 8px'
            }}
          >
            <input
              type="text"
              placeholder="Search events, artists, or venues"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                flexGrow: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Toggle list or grid view */}
          <IconButton
            sx={{ color: currentViewMode === 'list' ? '#fff' : 'rgba(255,255,255,0.7)', mr: 1 }}
            onClick={() => handleToggleView('list')}
          >
            <ViewListIcon />
          </IconButton>
          <IconButton
            sx={{ color: currentViewMode === 'grid' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            onClick={() => handleToggleView('grid')}
          >
            <ViewModuleIcon />
          </IconButton>

          {/* My Account Drawer */}
          <IconButton sx={{ color: '#fff', ml: 2 }} onClick={toggleDrawer(true)}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </LoadScript>
  );
};

export default NavBar;
