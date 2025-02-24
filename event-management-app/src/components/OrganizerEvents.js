// src/components/OrganizerEvents.js
import React, { useContext, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EventContext } from '../context/EventContext';

const OrganizerEvents = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const navigate = useNavigate();
  
  // Local state to track hovered event id (for showing actions)
  const [hovered, setHovered] = useState(null);
  
  const handleCardClick = (id) => {
    navigate(`/organizer/event/${id}`);
  };
  
  const handleEdit = (e, id) => {
    e.stopPropagation();
    // For demo, simply alert. You can navigate to an edit page.
    alert(`Edit event ${id} (functionality not implemented)`);
  };
  
  const handleDelete = (e, id) => {
    e.stopPropagation();
    // Call deleteEvent function from context
    deleteEvent(id);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Your Events</Typography>
        {/* "Create" button on this page */}
        <Button variant="contained" onClick={() => navigate('/organizer/create')}>
          Create
        </Button>
      </Box>
      {events.length === 0 ? (
        <Typography>No events created yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card 
                onMouseEnter={() => setHovered(event.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleCardClick(event.id)}
                sx={{ position: 'relative', cursor: 'pointer' }}
              >
                {event.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.place} | {event.date}
                  </Typography>
                  {/* Show action buttons on hover */}
                  {hovered === event.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        gap: 1,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: 1,
                        p: 0.5
                      }}
                    >
                      <IconButton size="small" onClick={(e) => handleEdit(e, event.id)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => handleDelete(e, event.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrganizerEvents;
