"use client"
import React from 'react'
import Box from '@mui/material/Box'
import LogedIn from './LogedIn'
import { Button } from '@mui/material'
import Link from 'next/link'

function NoLogIn() {
    return (
        <Box sx={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <Button variant='outlined' LinkComponent={Link} href="/login">Login</Button>
            <Button variant='contained' LinkComponent={Link} href="/registration">Sign up</Button>
            {/* <Link  href="/login" style={{textDecoration: "none", color: "inherit"}}>Login</Link>
            <Link href="/registration" style={{textDecoration: "none",  color: "inherit"}}>Sign up</Link> */}
            
        </Box>
    )
}


const LoginOrAvatar = ({ state, modelInfo }) => {

    return (
        <Box>
            {state === true ? <LogedIn modelInfo={modelInfo} /> : <NoLogIn />}
        </Box>
    )
}

export default LoginOrAvatar
