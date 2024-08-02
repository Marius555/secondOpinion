
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
import DoctorStepOneResolver from '@/resolvers/doctorProfilerResolvers/stepOneResolver';
import { yupResolver } from "@hookform/resolvers/yup"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import StepOneDoctorAction from '@/serverActions/DoctorProfilerAction/StepOneDoctorAction';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PocketBase from 'pocketbase';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';





const StepOneForm = ({ ActiveStep, setActiveStep, data, setData }) => {
    const pb = DataBaseConnectionServer()
    // let defaultValues = {
    //     Name: "", LastName: "", PhoneNumber: "", Nationality: "", DateOfBirth: "", PictureObject: "", Gender: ""
    // }
    const {
        register,
        handleSubmit,
        control,
        reset,

        formState: { errors },
    } = useForm({ resolver: yupResolver(DoctorStepOneResolver)})

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const incrementStep = async (values) => {
        console.log(values)
        const modified_values = { ...values, BirthDay: dayjs(values.DateOfBirth).format("YYYY-MM-DD") }
        let data = new FormData()
        for (const [key, value] of Object.entries(modified_values)) {
            data.append(`${key}`, `${value}`)
        }
        data.append("file", values.PictureObject)
        await StepOneDoctorAction(data)
        setActiveStep((step) => step + 1)
    }

    return (
        <>
            <Box component="form" sx={{ marginBottom: "10px" }} noValidate onSubmit={handleSubmit(incrementStep)}>
                <Typography marginTop={3} marginBottom={2} variant='h6'>Details</Typography>
                <Grid container spacing={2}>
                    <Grid xs={6} sm={6}>
                        <TextField
                            size='small'
                            {...register("Name")}
                            required
                            fullWidth
                            label="Vardas"
                            autoComplete="Name"
                            error={Boolean(errors.Name)} helperText={errors.Name?.message}
                            onChange={(event) => event.target.value}
                            defaultValue={data?.Name || ""}

                        />


                    </Grid>
                    <Grid xs={6} sm={6}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Pavarde"
                            {...register("LastName")}
                            defaultValue={data?.LastName || ""}
                            onChange={(e) => { e.target.value }}
                            autoComplete="Last Name"

                            error={Boolean(errors.LastName)} helperText={errors.LastName?.message}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Telefono Numberis"
                            {...register("PhoneNumber")}
                            autoComplete="Phone Number"
                            onChange={(event) => event.target.value}
                            defaultValue={data?.PhoneNumber || ""}
                            error={Boolean(errors.PhoneNumber)} helperText={errors.PhoneNumber?.message}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <Controller
                            control={control}
                            name='Nationality'
                            required
                            defaultValue="Lietuvis"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <FormControl sx={{ width: "100%" }} size='small'>
                                        <InputLabel id="demo-select-small-label">Pilietyvė</InputLabel>
                                        <Select
                                            size='small'
                                            labelId="demo-select-small-label"
                                            value={value}
                                            onBlur={onBlur}
                                            label="Pilietyvė"
                                            onChange={onChange}
                                            defaultValue={data?.Nationality || "Lietuvis"}
                                        >

                                            <MenuItem value="Lietuvis">Lietuvis</MenuItem>
                                            <MenuItem value="Rusas">Rusas</MenuItem>
                                            <MenuItem value="Ukrainietis">Ukrainietis</MenuItem>
                                            <MenuItem value="Kita">Kita</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <FormHelperText error variant='filled'>{errors.Nationality?.message}</FormHelperText>
                                </>
                            )}

                        />

                    </Grid>

                    <Grid xs={12}>
                        <Controller
                            control={control}
                            name='DateOfBirth'
                            required
                            defaultValue={data && dayjs(data.BirthDay)}
                            render={({ field: { onChange, onBlur, props } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='lt' >
                                    <DesktopDatePicker label="Gimimo Data" onChange={onChange} {...props}
                                        onBlur={onBlur} sx={{ width: "100%" }} disableFuture required
                                        slotProps={{ textField: { size: 'small', error: Boolean(errors.DateOfBirth) } }}
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        defaultValue={data&& dayjs(data.BirthDay)}




                                    />
                                </LocalizationProvider>

                            )}
                        />
                        <FormHelperText error variant='filled'>{errors.DateOfBirth?.message}</FormHelperText>

                    </Grid>
                    <Grid xs={12}>
                        <Controller
                            control={control}
                            name="PictureObject"
                            render={({ field: { value, onChange, ...field } }) => {
                                return (
                                    <Button component="label" variant='contained' fullWidth startIcon={<CloudUploadIcon />}>Add Picture
                                        <VisuallyHiddenInput type="file" {...field}
                                            value={value?.fileName}
                                            onChange={
                                                (event) => { onChange(event.target.files[0]) }
                                            }
                                            
                                            />
                                    </Button>
                                )
                            }
                            }

                        />
                        <FormHelperText error variant='filled'>{errors.PictureObject?.message}</FormHelperText>

                    </Grid>
                    <Grid xs={12}>
                        <Controller
                            control={control}
                            name='Gender'
                            required
                            defaultValue={data?.Gender ||""}
                            render={({ field: { onChange, onBlur } }) => (
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Lytis</FormLabel>
                                    <RadioGroup
                                        onChange={onChange}
                                        defaultValue={data?.Gender||""}
                                        onBlur={onBlur}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        row
                                    >
                                        <FormControlLabel value="Vyras" control={<Radio />} label="Vyras" />
                                        <FormControlLabel value="Moteris" control={<Radio />} label="Moteris" />
                                        <FormControlLabel value="Kita" control={<Radio />} label="Kita" />
                                    </RadioGroup>
                                    <FormHelperText error variant='filled'>{errors.Gender?.message}</FormHelperText>
                                </FormControl>


                            )}
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

export default StepOneForm