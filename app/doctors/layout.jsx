import "../globals.css"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/Components/NavBar/NavBar";
import { Box } from "@mui/material";
import SideBar from "@/Components/NavBar/sideBar";
import { cookies } from 'next/headers';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import DataBaseConnectionServer from "@/Components/DatabaseConnection/DataBaseConnectionServer";

export default function RootLayout(props) {
    const pb = DataBaseConnectionServer()
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
                    <Grid xs={false} sm={ state && 4} md={state && 3} lg={state && 2}>
                        <SideBar state={state} type={typeVar} id={id}/>
                    </Grid>
                    <Grid xs={12} sm={ state? 8: 12} md={state ? 9 : 12} lg={state ? 10 : 12}>
                        <NavBar />
                        {props.children}
                    </Grid>

                </Grid>

            </ThemeProvider>
        </AppRouterCacheProvider>



    );
}