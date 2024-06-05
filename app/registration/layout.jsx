import "../globals.css"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/Components/NavBar/NavBar";
import { Box } from "@mui/material";
import SideBar from "@/Components/NavBar/sideBar";
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";


export default function RootLayout(props) {


    return (

        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar />
                {props.children}


            </ThemeProvider>
        </AppRouterCacheProvider>



    );
}