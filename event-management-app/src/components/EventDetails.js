// src/components/EventDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams();
  const event = {
    id,
    name: 'Sample Event',
    place: 'Sample Location',
    date: '2025-03-15'
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {event.name}
      </Typography>
      <Typography variant="body1">
        Place: {event.place} <br />
        Date: {event.date}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={`/purchase/${event.id}`}
        sx={{ mt: 2 }}
      >
        Purchase Ticket
      </Button>
    </Box>
  );
};

export default EventDetails;
