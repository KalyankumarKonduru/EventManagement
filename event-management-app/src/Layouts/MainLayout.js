// src/Layouts/MainLayout.js
import React, { useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { UserContext } from '../context/UserContext';
import NavBar from '../components/Navbar';

const MainLayout = ({
  children,
  onSearch,
  onLocationChange,
  onToggleView,
}) => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar
        user={user}
        onLogout={handleLogout}
        onSearch={onSearch}
        onLocationChange={onLocationChange}
        onToggleView={onToggleView}
      />
      <Container sx={{ flexGrow: 1, mt: 2 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 Event Management</Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
