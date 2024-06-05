"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DoctorStepFourResolver from '@/resolvers/doctorProfilerResolvers/stepFourResolver';
import FormHelperText from '@mui/material/FormHelperText';
import StepFourDoctorAction from '@/serverActions/DoctorProfilerAction/StepFourDoctorAction';


const StepFour = ({ ActiveStep, setActiveStep }) => {

    const defaultValues = {
        LithuanianLanguage: "", CanConsultLithuanian: "", EnglishLanguage: "", CanConsultEnglish: "", RussianLanguage: "", CanConsultRussian: ""
    }
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm({resolver: yupResolver(DoctorStepFourResolver), defaultValues: defaultValues})

    const [hover, setHover] = React.useState(-1);
    const [hoverB, setHoverB] = React.useState(-1);
    const [hoverC, setHoverC] = React.useState(-1);


    const labels = {
        1: "Nemoku",
        2: "Beveik Ne",
        3: "Šiek Tiek",
        4: "Gerai",
        5: "Labai Gerai"
    };
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    function getLabelTextB(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    function getLabelTextC(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const incrementStep = async(values) => {
        await StepFourDoctorAction(values)
        setActiveStep((step) => step + 1)
    }

    return (
        <>
            <Box component="form" sx={{ marginBottom: "10px" }} noValidate onSubmit={handleSubmit(incrementStep)}>
                <Typography marginTop={3} marginBottom={2} fontWeight="bold" variant='h6'>Languages</Typography>
                <Grid container spacing={2} >

                    <Grid xs={6} sm={6}>
                        <Typography component="legend">Lietuvių Kalba</Typography>
                        <Controller
                            control={control}
                            name='LithuanianLanguage'
                            required
                            render={({ field: { onChange, value, } }) => (
                                <>
                                    <Box

                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: "40px"
                                        }}
                                    >
                                        <Rating
                                            value={Number(value)}
                                            precision={1}
                                            getLabelText={getLabelText}
                                            onChange={onChange}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                    </Box>
                                    <FormHelperText error>{errors.LithuanianLanguage?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <FormControlLabel sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} control={<Switch {...register("CanConsultLithuanian")}/>} label="Konsultuoju Lietuviškai" />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Typography component="legend">Anglų Kalba</Typography>
                        <Controller
                            control={control}
                            name='EnglishLanguage'
                            required
                            render={({ field: { onChange, value, } }) => (
                                <>
                                    <Box

                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: "40px"
                                        }}
                                    >
                                        <Rating
                                            value={Number(value)}
                                            precision={1}
                                            getLabelText={getLabelTextB}
                                            onChange={onChange}
                                            onChangeActive={(event, newHover) => {
                                                setHoverB(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hoverB !== -1 ? hoverB : value]}</Box>
                                        )}
                                    </Box>
                                    <FormHelperText error>{errors.EnglishLanguage?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <FormControlLabel sx={{width: "100%"}} control={<Switch {...register("CanConsultEnglish")} />} label="Konsultuoju Angliškai" />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Typography component="legend">Rusų Kalba</Typography>
                        <Controller
                            control={control}
                            name='RussianLanguage'
                            required
                            render={({ field: { onChange, value, } }) => (
                                <>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: "40px"
                                        }}
                                    >
                                        <Rating
                                            value={Number(value)}
                                            precision={1}
                                            getLabelText={getLabelTextC}
                                            onChange={onChange}
                                            onChangeActive={(event, newHover) => {
                                                setHoverC(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hoverC !== -1 ? hoverC : value]}</Box>
                                        )}
                                    </Box>
                                    <FormHelperText error>{errors.RussianLanguage?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <FormControlLabel sx={{width: "100%"}} control={<Switch {...register("CanConsultRussian")} />} label="Konsultuoju Rusiškai" />
                    </Grid>
                    <Grid xs={12}>
                        <Button type='submit' variant='contained' fullWidth>Next</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StepFour
