// src/components/OrganizerEventDetails.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { EventContext } from '../context/EventContext';

// Helper function to calculate age from dob
const getAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const OrganizerEventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  
  // Find event by id
  const event = events.find((e) => String(e.id) === id);
  
  if (!event) {
    return <Typography>Event not found.</Typography>;
  }
  
  const attendees = event.attendees || [];
  
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {event.name} - Attendee Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        Location: {event.place} | Date: {event.date}
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        {attendees.length === 0 ? (
          <Typography>No attendees yet.</Typography>
        ) : (
          <List>
            {attendees.map((att, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={att.name}
                  secondary={att.dob ? `Age: ${getAge(att.dob)}` : null}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default OrganizerEventDetails;
