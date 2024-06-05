"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { useForm, Controller } from "react-hook-form"
import DoctorRegisterSchema from '@/resolvers/RegisterResolver';
import { yupResolver } from "@hookform/resolvers/yup"
import FormHelperText from '@mui/material/FormHelperText';
import RegisterAction from '@/serverActions/RegisterAction';


export default function Register() {
    const theme = useTheme();
    const defaultValues = {
        Username: "",
        Email: "",
        UserType: "",
        Password: "",
        verifyPassword: "",
        AgreeTerms: false,
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({ defaultValues: defaultValues, resolver: yupResolver(DoctorRegisterSchema) })



    const Submit = async (data) => {
        const retData = await RegisterAction(data)
        console.log(retData)
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Paper variant="elevation" elevation={8} sx={{ padding: "20px" }}>
                        <Box
                            sx={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(Submit)} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            required
                                            fullWidth
                                            id="Username"
                                            label="First Name"
                                            size='small'
                                            autoFocus
                                            {...register("Username")}
                                            error={Boolean(errors.Username)} helperText={errors.Username?.message}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            size='small'
                                            {...register("Email")}
                                            error={Boolean(errors.Email)} helperText={errors.Email?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Controller
                                            control={control}
                                            name="UserType"
                                            render={({ field }) => (
                                                <FormControl fullWidth size='small' error={Boolean(errors.UserType)}>
                                                    <InputLabel id="UserType">User Type</InputLabel>
                                                    <Select

                                                        labelId="UserType"
                                                        id="UserTypeSelect"
                                                        label="User Type"
                                                        {...field}
                                                    >
                                                        <MenuItem value="Patient">Patient</MenuItem>
                                                        <MenuItem value="Doctor">Doctor</MenuItem>
                                                        <MenuItem value="Company">Company</MenuItem>
                                                    </Select>
                                                    <FormHelperText>{errors.UserType?.message}</FormHelperText>

                                                </FormControl>


                                            )}

                                        />



                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            size='small'
                                            {...register("Password")}
                                            error={Boolean(errors.Password)} helperText={errors.Password?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            id="verifyPassword"
                                            autoComplete="new-password"
                                            size='small'
                                            {...register("verifyPassword")}
                                            error={Boolean(errors.verifyPassword)} helperText={errors.verifyPassword?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <FormControlLabel
                                            control={<Checkbox {...register("AgreeTerms")} color="primary" />}
                                            label="I agree with terms and condition"

                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}