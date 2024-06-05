import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/Components/NavBar/NavBar";
export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
              <CssBaseline />
                
                {props.children}

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}