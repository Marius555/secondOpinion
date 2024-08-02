"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import LoginResolver from '@/resolvers/LoginResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import LogInAction from '@/serverActions/LoginAction';
import getCookie from '@/Components/getCookie';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import PocketBase from 'pocketbase';
import CloseIcon from '@mui/icons-material/Close';
import DataBaseConnectionClient from '@/Components/DatabaseConnection/DataBaseConnection';


export default function PopLogin({setOpen}) {
    const pb = DataBaseConnectionClient()

    const theme = useTheme();
    const [err, setErr] = useState(null)

    const defaultValues = {
        Email: "",
        Password: ""
      }
    const {
        register,
        handleSubmit,
        formState: { errors },
        
    } = useForm({defaultValues:defaultValues, resolver: yupResolver(LoginResolver)})

    const Submit = async(value) => {
        const response = await LogInAction(value)
        if(response?.error){
            const msg = JSON.parse(response?.error)
            const msgData = msg.response.message
            setErr(msgData)
            
        }
    
        
        try {
            const trying = getCookie('pb_auth')
            const decode = JSON.parse(trying)
            pb.authStore.save(decode.token, decode.model)
            
        }
        catch {
            return 
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{position: "relative"}}>
                <CssBaseline />
                <Box sx={{padding: "20px"}}>
                    <Box
                        sx={{
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            
                        }}
                    >
                        <CloseIcon sx={{position: "absolute", top: "0px", right: "5px", cursor: "pointer"}} onClick={() =>{setOpen(() => false)}}/>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(Submit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="email"
                                autoFocus
                                size='small'
                                {...register("Email")}
                                error={Boolean(errors.Email)} helperText={errors.Email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size='small'
                                {...register("Password")}
                                error={Boolean(errors.Password)} helperText={errors.Password?.message}
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <FormHelperText>{err}</FormHelperText>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}