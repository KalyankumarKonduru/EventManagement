// src/components/OrganizerAnalytics.js
import React, { useContext } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { EventContext } from '../context/EventContext';

// Helper function to calculate age from dob string (YYYY-MM-DD)
const getAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const OrganizerAnalytics = () => {
  const { events } = useContext(EventContext);
  
  // Aggregate all attendees from all events
  const allAttendees = events.reduce((acc, event) => {
    return acc.concat(event.attendees || []);
  }, []);
  
  // Bucket ages: Under 18, 18-25, 26-35, 36-50, 50+
  const buckets = {
    'Under 18': 0,
    '18-25': 0,
    '26-35': 0,
    '36-50': 0,
    '50+': 0
  };

  allAttendees.forEach((attendee) => {
    if (attendee.dob) {
      const age = getAge(attendee.dob);
      if (age < 18) buckets['Under 18']++;
      else if (age <= 25) buckets['18-25']++;
      else if (age <= 35) buckets['26-35']++;
      else if (age <= 50) buckets['36-50']++;
      else buckets['50+']++;
    }
  });

  const data = Object.keys(buckets).map((key) => ({
    name: key,
    value: buckets[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendee Age Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Age Group Breakdown</Typography>
            {data.map((d) => (
              <Box key={d.name} sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography>{d.name}</Typography>
                <Typography>{d.value} attendee{d.value !== 1 && 's'}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganizerAnalytics;
