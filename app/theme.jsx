'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { blueGrey } from '@mui/material/colors';
import {indigo} from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
    palette: {
        // mode: "dark",
        primary: {
            main: indigo[500]
        },
        background:{
            default: grey[200]
        }
    },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;