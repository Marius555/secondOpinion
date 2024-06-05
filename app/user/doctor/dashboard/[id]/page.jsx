import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PatientCard from '@/Components/dashboard/Doctor/PatientCard';
import { Box } from '@mui/material';
import DoctorPay from '@/Components/dashboard/Doctor/DoctorPay';
import PocketBase from 'pocketbase';


const page = async(requestData) => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    let state = null
    let id = null

    try {
        const pb_cookie = cookies().get("pb_auth")
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
        state = pb.authStore.isValid
        id = await pb.authStore.model.id

    } catch (error) {
        state = pb.authStore.isValid
    }
    
    return (
        <Box sx={{width: "100%"}}>
            
            <Grid container spacing={1} sx={{ justifyContent: "center"}}>
                <Grid xs={12} sm={4}>
                    <PatientCard />
                </Grid>
                {/* <Grid xs={3}>
                    <PatientCard />
                </Grid> */}
                <Grid xs={12} sm={7}>
                    <DoctorPay />
                </Grid>

            </Grid>
        </Box>


    )
}

export default page