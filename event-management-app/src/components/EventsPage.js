// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

const EventsPage = ({ viewMode }) => {
  const [events, setEvents] = useState([]);

  // Function to fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      // Assuming the response data is an array of events
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  if (!events.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No events found. Please check back later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {viewMode === 'list' ? (
        <Box>
          {events.map((event) => (
            <Card key={event._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2">
                  {event.place} | {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {event.description}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Buy Ticket
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2">
                    {event.place} | {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Buy Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventsPage;
