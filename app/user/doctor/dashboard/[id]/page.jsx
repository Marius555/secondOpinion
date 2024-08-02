import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PatientCard from '@/Components/dashboard/Doctor/PatientCard';
import { Box } from '@mui/material';
import DoctorPay from '@/Components/dashboard/Doctor/DoctorPay';
import DoctorTable from '@/Components/dashboard/Doctor/DoctorTable';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const page = async(requestData) => {
    const pb = DataBaseConnectionServer()
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
                <Grid xs={11} sm={4}>
                    <PatientCard />
                </Grid>
                <Grid xs={11} sm={7}>
                    <DoctorPay />
                </Grid>
                <Grid xs={11} sm={11}>
                    <DoctorTable />
                </Grid>

            </Grid>
        </Box>


    )
}

export default page