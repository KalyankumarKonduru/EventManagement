// src/components/Purchase.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { EventContext } from '../context/EventContext';

const Purchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAttendee } = useContext(EventContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    // Process payment logic here (if any)
    alert('Purchase completed!');
    
    // Add this user as an attendee for the event
    const eventId = parseInt(id, 10); // ensure id is a number
    const attendeeData = { 
      name: formData.name, 
      email: formData.email, 
      dob: formData.dob 
    };
    addAttendee(eventId, attendeeData);
    
    // Redirect to the attendee's profile or confirmation page
    navigate('/profile');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Purchase Ticket for Event #{id}
      </Typography>
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <form onSubmit={handlePurchase}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              variant="outlined"
              type="date"
              fullWidth
              required
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" fullWidth>
              Purchase
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Purchase;
