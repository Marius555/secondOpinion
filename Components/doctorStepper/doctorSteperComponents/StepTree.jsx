import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "dayjs/locale/lt"
import { yupResolver } from "@hookform/resolvers/yup"
import FormHelperText from '@mui/material/FormHelperText';
import DoctorStepTreeResolver from '@/resolvers/doctorProfilerResolvers/stepTreeResolver';
import StepTreeDoctorAction from '@/serverActions/DoctorProfilerAction/StepTreeDoctorAction';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


const StepTree = ({ ActiveStep, setActiveStep }) => {


    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm({ resolver: yupResolver(DoctorStepTreeResolver) })

    const incrementStep = (values) => {
        StepTreeDoctorAction(values)
        // setActiveStep((step) => step + 1)
    }

    return (
        <>
            <Box component="form" sx={{ marginBottom: "10px" }} noValidate onSubmit={handleSubmit(incrementStep)}>
                <Typography marginTop={3} marginBottom={2} variant='h6'>Details</Typography>
                <Grid container spacing={2}>
                    
                    <Grid xs={12}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Pareigos"
                            {...register("Responsibilities")}
                            autoComplete="Responsibilities"
                            error={Boolean(errors.Responsibilities)} helperText={errors.Responsibilities?.message}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Įmonė"
                            {...register("Company")}
                            autoComplete="Company"
                            error={Boolean(errors.Company)} helperText={errors.Company?.message}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Įmonės Svetainė"
                            {...register("CompanyURL")}
                            autoComplete="CompanyURL"
                            error={Boolean(errors.CompanyURL)} helperText={errors.CompanyURL?.message}
                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Controller
                            control={control}
                            name='Nuo'
                            required
                            render={({ field: { onChange, onBlur } }) => (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='lt' >
                                        <DesktopDatePicker label="Nuo" onChange={onChange}
                                            onBlur={onBlur} sx={{ width: "100%" }} disableFuture required
                                            slotProps={{ textField: { size: 'small', error: Boolean(errors.Nuo) } }}
                                            views={['year', 'month']}
                                            
                                        />
                                    </LocalizationProvider>

                                </>
                            )}
                        />
                        <FormHelperText error variant='filled'>{errors.Nuo?.message}</FormHelperText>
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Controller
                            control={control}
                            name='Iki'
                            required
                            render={({ field: { onChange, onBlur } }) => (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='lt' >
                                        <DesktopDatePicker label="Iki" onChange={onChange}
                                            onBlur={onBlur} sx={{ width: "100%" }} disableFuture required
                                            slotProps={{ textField: { size: 'small', error: Boolean(errors.Iki) } }}
                                            views={['year', 'month']}
                                        />
                                    </LocalizationProvider>

                                </>
                            )}
                        />
                        <FormHelperText error variant='filled'>{errors.Iki?.message}</FormHelperText>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            size='small'
                            multiline
                            rows={3}
                            fullWidth
                            label="Darbo Aprašymas"
                            {...register("WorkDescription")}
                            autoComplete="WorkDescription"
                            error={Boolean(errors.WorkDescription)} helperText={errors.WorkDescription?.message}
                        />
                    </Grid>
                    
                    <Grid xs={12}>
                        <Button type='submit' variant='contained' fullWidth>Next</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StepTree
