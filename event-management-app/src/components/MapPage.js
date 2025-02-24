// src/components/MapPage.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Box,
  Autocomplete,
  Card,
  CardContent
} from '@mui/material';
import { EventContext } from '../context/EventContext';

// Example states array
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
  

const MapPage = () => {
  const { events } = useContext(EventContext);
  const [location, setLocation] = useState(null);

  // Filter events based on the selected state
  const filteredEvents = location
    ? events.filter(
        (e) =>
          e.place.toLowerCase() === location.title.toLowerCase()
      )
    : [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Select Location
      </Typography>
      <Autocomplete
        options={states}
        getOptionLabel={(option) => option.title}
        onChange={(event, newValue) => setLocation(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter a US State"
            variant="outlined"
            sx={{ mb: 3, maxWidth: 400 }}
          />
        )}
      />
      <Box>
        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ mb: 2, maxWidth: 400 }}>
            <CardContent>
              <Link
                to={`/event/${event.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2">
                  {event.place} | {event.date}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MapPage;
