// src/components/TicketCancellationSurvey.js
import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

const TicketCancellationSurvey = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      onSubmit(selectedOption);
    } else {
      alert('Please select an option.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Why are you cancelling your ticket?
      </Typography>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          name="cancellationReason"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <FormControlLabel
            value="Not Interested"
            control={<Radio />}
            label="Not Interested"
          />
          <FormControlLabel
            value="Found a better option"
            control={<Radio />}
            label="Found a better option"
          />
          <FormControlLabel
            value="Price too high"
            control={<Radio />}
            label="Price too high"
          />
        </RadioGroup>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit Survey
        </Button>
      </form>
    </Box>
  );
};

export default TicketCancellationSurvey;
