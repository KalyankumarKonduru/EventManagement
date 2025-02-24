// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // Example dark palette
    background: {
      default: '#000', // or your desired background color
    },
    text: {
      primary: '#000', // default text color on dark background
    },
  },
  typography: {
    // Use your desired font stack
    fontFamily: `"SF Mono", "Fira Code", monospace`,
  },
  components: {
    // Apply font family to entire body
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `"SF Mono", "Fira Code", monospace`,
        },
      },
    },
    // Ensure TextField input text is visible
    MuiTextField: {
      styleOverrides: {
        root: {
          // If your background is dark, let's make the input background partially translucent
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            // Color of typed text
            color: 'black',
            // Outline/border color
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
          // Color of the label
          '& .MuiFormLabel-root': {
            color: 'black',
          },
        },
      },
    },
  },
});

export default theme;
