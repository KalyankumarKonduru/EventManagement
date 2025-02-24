// src/components/Profile.js
import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import TicketCancellationSurvey from './TicketCancellationSurvey';

const Profile = () => {
  // Dummy ticket data
  const [tickets, setTickets] = useState([
    {
      id: 1,
      eventName: 'Concert in City',
      place: 'City',
      date: '2025-03-15',
      cancelled: false
    }
  ]);
  const [showSurvey, setShowSurvey] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);

  const handleCancel = (ticketId) => {
    setTicketToCancel(ticketId);
    setShowSurvey(true);
  };

  const handleSurveySubmit = (surveyData) => {
    console.log('Survey response: ', surveyData);
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === ticketToCancel ? { ...t, cancelled: true } : t
      )
    );
    setShowSurvey(false);
    setTicketToCancel(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Tickets
      </Typography>
      {tickets.map((ticket) => (
        <Card key={ticket.id} sx={{ mb: 2, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6">{ticket.eventName}</Typography>
            <Typography variant="body2">
              {ticket.place} | {ticket.date}
            </Typography>
            {!ticket.cancelled ? (
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleCancel(ticket.id)}
              >
                Cancel Ticket
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Ticket Cancelled
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
      {showSurvey && (
        <TicketCancellationSurvey onSubmit={handleSurveySubmit} />
      )}
    </Box>
  );
};

export default Profile;
