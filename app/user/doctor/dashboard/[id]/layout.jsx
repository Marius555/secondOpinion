import "../../../../globals.css"
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/app/theme";
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/Components/NavBar/NavBar";
import { Box } from "@mui/material";
import SideBar from "@/Components/NavBar/sideBar";
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";


export default function RootLayout(props) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    let state = false
    let type = null
    let id = null
    let typeVar = null
    try {
        const pb_cookie = cookies().get("pb_auth")
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
        state = pb.authStore.isValid
        type = pb.authStore.model.UserType
        id = pb.authStore.model.id
        typeVar = type.toLowerCase() 

    } catch (error) {
        state = pb.authStore.isValid
    }
    

    return (

        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Grid container spacing={0}>
                    <Grid xs={false} sm={4} md={3} lg={2}>
                        <SideBar state={state} type={typeVar} id={id}/>
                    </Grid>
                    <Grid xs={12} sm={8} md={9} lg={10}>
                        <NavBar />
                        {props.children}
                    </Grid>

                </Grid>

            </ThemeProvider>
        </AppRouterCacheProvider>



    );
}