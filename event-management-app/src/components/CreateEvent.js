// src/components/CreateEvent.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Autocomplete, 
  Card, 
  CardContent 
} from '@mui/material';

const states = [
  { title: 'Alabama' },
  { title: 'Alaska' },
  { title: 'Arizona' },
  { title: 'Arkansas' },
  { title: 'California' },
  { title: 'Colorado' },
  { title: 'Connecticut' },
  { title: 'Delaware' },
  { title: 'Florida' },
  { title: 'Georgia' },
  { title: 'Hawaii' },
  { title: 'Idaho' },
  { title: 'Illinois' },
  { title: 'Indiana' },
  { title: 'Iowa' },
  { title: 'Kansas' },
  { title: 'Kentucky' },
  { title: 'Louisiana' },
  { title: 'Maine' },
  { title: 'Maryland' },
  { title: 'Massachusetts' },
  { title: 'Michigan' },
  { title: 'Minnesota' },
  { title: 'Mississippi' },
  { title: 'Missouri' },
  { title: 'Montana' },
  { title: 'Nebraska' },
  { title: 'Nevada' },
  { title: 'New Hampshire' },
  { title: 'New Jersey' },
  { title: 'New Mexico' },
  { title: 'New York' },
  { title: 'North Carolina' },
  { title: 'North Dakota' },
  { title: 'Ohio' },
  { title: 'Oklahoma' },
  { title: 'Oregon' },
  { title: 'Pennsylvania' },
  { title: 'Rhode Island' },
  { title: 'South Carolina' },
  { title: 'South Dakota' },
  { title: 'Tennessee' },
  { title: 'Texas' },
  { title: 'Utah' },
  { title: 'Vermont' },
  { title: 'Virginia' },
  { title: 'Washington' },
  { title: 'West Virginia' },
  { title: 'Wisconsin' },
  { title: 'Wyoming' }
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    name: '',
    image: '', // will store base64 string here
    description: '',
    place: '',
    date: '',
    capacity: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (event, newValue) => {
    setFormData({ ...formData, place: newValue ? newValue.title : '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Use FileReader to convert file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add an id to the event
    const eventToAdd = { ...formData, id: Date.now() };
    addEvent(eventToAdd);
    navigate('/organizer');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Event Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.name}
              onChange={handleChange}
            />
            {/* File input for image upload */}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Event Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formData.image && (
              <Box
                component="img"
                src={formData.image}
                alt="Event Preview"
                sx={{ width: '100%', mb: 2, borderRadius: 1 }}
              />
            )}
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
              value={formData.description}
              onChange={handleChange}
            />
            <Autocomplete
              options={states}
              getOptionLabel={(option) => option.title}
              onChange={handleStateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Location"
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                />
              )}
            />
            <TextField
              label="Date"
              name="date"
              variant="outlined"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              value={formData.date}
              onChange={handleChange}
            />
            <TextField
              label="Capacity"
              name="capacity"
              variant="outlined"
              type="number"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.capacity}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              variant="outlined"
              type="number"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.price}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" fullWidth>
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateEvent;
