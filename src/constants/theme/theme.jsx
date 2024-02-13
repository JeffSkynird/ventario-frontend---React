import { indigo } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const lightColors = {
    palette: {
        primary: {
            main:'#212227',
            contrastText: "#FFF",
        },
        secondary: {
            main:'#076B00',
            contrastText: "#FFF",
        },
        mode: 'light',
    },
}

const darkColors = {
    palette: {
        primary: indigo,
        secondary: blue,
        mode: 'dark',
    },
}
export const darkTheme =  createTheme(darkColors);
export const lightTheme =  createTheme(lightColors);
  