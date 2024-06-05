
import Lottie from "lottie-react"
import Box from "@mui/material/Box"
import DoctorSteperFinishSecond from "../../../../my-app/assets/lottie/DoctorSteperFinishSecond.json"
import Typhograpy from "@mui/material/Typography"
import { Button } from "@mui/material"
import doctorRedirectAction from "./doctorServerRedirects/doctorRedirectAction"

const StepCongratulations = () => {
  
  const handleFinish = async() => {
    await doctorRedirectAction()
  }
  return (
    <>
      <Box component="div" sx={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", padding: "5px", marginTop: "5px"}}>
        <Lottie  loop={false} animationData={DoctorSteperFinishSecond} />
        <Typhograpy variant="h5">Profilis Sukurtas</Typhograpy>
        <Button sx={{marginTop: "1rem"}} variant="contained" fullWidth onClick={handleFinish}>Finish</Button>
      </Box>
    </>
  )
}

export default StepCongratulations
