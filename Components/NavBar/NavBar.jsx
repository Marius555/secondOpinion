import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import LoginOrAvatar from './LoginOrAvatar';
import MobileSideBar from './MobileSideBar';
import DataBaseConnectionServer from '../DatabaseConnection/DataBaseConnectionServer';

export default function NavBar() {
  const pb = DataBaseConnectionServer()
  let state = false
  let modelInfo = null
  let id = null
  let type = null
  try {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    state = pb.authStore.isValid
    modelInfo = pb.authStore.model
    id = pb.authStore.model.id
    type = pb.authStore.model.UserType

  } catch (error) {
    state = pb.authStore.isValid
  }


  return (
    <Box sx={{ display: { xs: "block", sm: "flex" } }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "background.default", boxShadow: "none" }}>
          <Toolbar >
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <MobileSideBar state={state} id={id} type={type}/>
            </Box>
            <Typography color="inherit" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <LoginOrAvatar state={state} modelInfo={modelInfo} />
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
