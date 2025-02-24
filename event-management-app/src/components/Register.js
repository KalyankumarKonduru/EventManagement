// src/components/Register.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { registerUser } from '../utils/api';
import { Box, Card, CardContent, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dob: '', role: 'attendee' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await registerUser(formData);
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
          <Typography variant="h4" textAlign="center" gutterBottom>
            Register
          </Typography>
          {errorMsg && <Typography color="error" sx={{ mb: 2 }}>{errorMsg}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" variant="outlined" fullWidth required sx={{ mb: 2 }} value={formData.name} onChange={handleChange} />
            <TextField label="Email" name="email" variant="outlined" fullWidth required sx={{ mb: 2 }} value={formData.email} onChange={handleChange} />
            <TextField label="Password" name="password" variant="outlined" type="password" fullWidth required sx={{ mb: 2 }} value={formData.password} onChange={handleChange} />
            <TextField label="Date of Birth" name="dob" variant="outlined" type="date" fullWidth required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Select Role:
            </Typography>
            <RadioGroup row name="role" value={formData.role} onChange={handleChange} sx={{ mb: 2 }}>
              <FormControlLabel value="attendee" control={<Radio />} label="Attendee" />
              <FormControlLabel value="organizer" control={<Radio />} label="Organizer" />
            </RadioGroup>
            <Button variant="contained" type="submit" fullWidth>
              Register
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
