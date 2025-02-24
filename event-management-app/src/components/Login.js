// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../utils/api';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await loginUser({ email, password });
      login(data.user);
      navigate(data.user.role === 'organizer' ? '/organizer' : '/map');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {errorMsg && <Typography color="error" sx={{ mb: 2 }}>{errorMsg}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField label="Email" variant="outlined" fullWidth required sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" variant="outlined" type="password" fullWidth required sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" type="submit" fullWidth>Login</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
