// src/components/OrganizerDashboard.js
import React, { useContext } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const OrganizerDashboard = () => {
  const { events } = useContext(EventContext);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/organizer/create');
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}
      >
        <Typography variant="h4">Your Events</Typography>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </Box>
      {events.length === 0 ? (
        <Typography>No events created yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2">
                    Location: {event.place}
                  </Typography>
                  <Typography variant="body2">
                    Date: {event.date}
                  </Typography>
                  <Typography variant="body2">
                    Capacity: {event.capacity}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${event.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrganizerDashboard;
