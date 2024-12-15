// theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF6F61', // Warm red tone for main action buttons
            contrastText: '#0A122A'
        },
        secondary: {
            main: '#E8AA14', // Soft orange for secondary actions
        },
        background: {
            default: '#FBFAF8', // Light, neutral background
            paper: '#FFF'
        },
        text: {
            primary: '#0A122A', // Dark text for readability
            secondary: '#757575', // Lighter text for non-primary elements
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FF6F61',
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 'medium',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: '1.5',
        },
    },
    shape: {
        borderRadius: 12, // Rounded corners for a friendly feel
    },
    spacing: 8, // Custom spacing for padding/margins
});

export default theme;
