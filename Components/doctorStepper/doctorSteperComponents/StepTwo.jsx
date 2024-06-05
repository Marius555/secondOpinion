import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DoctorStepTwoResolver from '@/resolvers/doctorProfilerResolvers/stepTwoResolver';
import FormHelperText from '@mui/material/FormHelperText';
import dayjs from 'dayjs';
import StepTwoDoctorAction from '@/serverActions/DoctorProfilerAction/StepTwoDoctorAction';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from '@mui/material';


import "dayjs/locale/lt"

const universitys = [
    { name: "Generolo Jono Žemaičio Lietuvos karo akademija" },
    { name: "Lietuvos sveikatos mokslų universitetas" },
    { name: "Kauno technologijos universitetas" },
    { name: "Klaipėdos universitetas" },
    { name: "Lietuvos muzikos ir teatro akademija" },
    { name: "Mykolo Romerio universitetas" },
    { name: "Vilniaus dailės akademija" },
    { name: "Vilniaus Gedimino technikos universitetas" },
    { name: "Vilniaus universitetas" },
    { name: "Vytauto Didžiojo universitetas" },
    { name: "Lietuvos sporto universitetas" },
    { name: "Alytaus kolegija" },
    { name: "Kauno kolegija" },
    { name: "Kauno miškų ir aplinkos inžinerijos kolegija" },
    { name: "Kauno technikos kolegija" },
    { name: "Klaipėdos valstybinė kolegija" },
    { name: "Lietuvos aukštoji jūreivystės mokykla" },
    { name: "Marijampolės kolegija" },
    { name: "Panevėžio kolegija" },
    { name: "Šiaulių valstybinė kolegija" },
    { name: "Utenos kolegija" },
    { name: "Vilniaus kolegija" },
    { name: "Vilniaus technologijų ir dizaino kolegija" },
    { name: "ISM Vadybos ir ekonomikos universitetas" },
    { name: "LCC tarptautinis universitetas" },
    { name: "Kazimiero Simonavičiaus universitetas" },
    { name: "Telšių Vyskupo Vincento Borisevičiaus kunigų seminarija" },
    { name: "Europos Humanitarinis Universitetas" },
    { name: "Vilniaus Šv. Juozapo kunigų seminarija" },
    { name: "V. A. Graičiūno aukštoji vadybos mokykla" },
    { name: "Socialinių mokslų kolegija" },
    { name: "Klaipėdos verslo kolegija" },
    { name: "Kolpingo kolegija" },
    { name: "Šiaurės Lietuvos kolegija" },
    { name: "Šv. Ignaco Lojolos kolegija" },
    { name: "Tarptautinė teisės ir verslo aukštoji mokykla" },
    { name: "Vakarų Lietuvos verslo kolegija" },
    { name: "Vilniaus verslo kolegija" },
    { name: "Vilniaus dizaino kolegija" },
    { name: "Vilniaus kooperacijos kolegija" },
]
const Specializations = [
    { name: "Abdominalinės chirurgijos gydytojas" },
    { name: "Akušeris" },
    { name: "Anestezijos ir intensyviosios terapijos slaugytojas" },
    { name: "Anesteziologas reanimatologas" },
    { name: "Bendrosios praktikos slaugytojas" },
    { name: "Burnos chirurgas" },
    { name: "Burnos higienistas" },
    { name: "Endobiogenikas" },
    { name: "Endodontologas" },
    { name: "Ergoterapeutas" },
    { name: "Fizinės medicinos ir reabilitacijos gydytojas" },
    { name: "Grožio terapeutė" },
    { name: "Gydytojas akušeris-ginekologas" },
    { name: "Gydytojas alergologas ir klinikinis imunologas" },
    { name: "Gydytojas anesteziologas reanimatologas" },
    { name: "Gydytojas anesteziologas-reanimatologas vyr. ordinatorius" },
    { name: "Gydytojas chirurgas" },
    { name: "Gydytojas dermatovenerologas" },
    { name: "Gydytojas Dietologas" },
    { name: "Gydytojas echoskopuotojas" },
    { name: "Gydytojas endokrinologas" },
    { name: "Gydytojas endoskopuotojas" },
    { name: "Gydytojas gastroenterologas" },
    { name: "Gydytojas genetikas" },
    { name: "Gydytojas hematologas" },
    { name: "Gydytojas kardiologas" },
    { name: "Gydytojas kraujagyslių chirurgas" },
    { name: "Gydytojas nefrologas" },
    { name: "Gydytojas neurochirurgas" },
    { name: "Gydytojas neurologas" },
    { name: "Gydytojas odontologas" },
    { name: "Gydytojas odontologas implantologas" },
    { name: "Gydytojas oftalmologas" },
    { name: "Gydytojas onkologas chemoterapeutas" },
    { name: "Gydytojas ortodontas" },
    { name: "Gydytojas ortopedas traumatologas" },
    { name: "Gydytojas otorinolaringologas" },
    { name: "Gydytojas psichiatras" },
    { name: "Gydytojas pulmonologas" },
    { name: "Gydytojas radiologas" },
    { name: "Gydytojas radiologas-echoskopuotojas" },
    { name: "Gydytojas reumatologas" },
    { name: "Gydytojas širdies chirurgas" },
    { name: "Gydytojas urologas" },
    { name: "Gydytojas vaikų alergologas" },
    { name: "Gydytojas vaikų chirurgas" },
    { name: "Gydytojas vaikų gastroenterologas" },
    { name: "Gydytojas vaikų gastroenterologas-echoskopuotojas" },
    { name: "Gydytojas vaikų hematologas" },
    { name: "Gydytojas vaikų neurologas" },
    { name: "Gydytojas vaikų odontologas" },
    { name: "Gydytojas vaikų pulmonologas" },
    { name: "Gydytojas veido ir žandikaulių chirurgas" },
    { name: "Gydytojo odontologo padėjėjas" },
    { name: "Infekcinių ligų gydytojas" },
    { name: "Intervencinės kardiologijos gydytojas" },
    { name: "Kabinetai" },
    { name: "Kineziterapeutas" },
    { name: "Koloproktologas" },
    { name: "Kosmetologas" },
    { name: "Krūtų onkochirurgijos gydytojas" },
    { name: "Mamologas" },
    { name: "Masažuotojas" },
    { name: "Medicinos gydytojas" },
    { name: "Medicinos psichologas" },
    { name: "Odontologas ortopedas" },
    { name: "Periodontologas" },
    { name: "Plastinės ir rekonstrukcinės chirurgijos gydytojas" },
    { name: "Priminimai" },
    { name: "Radiologas (RO)" },
    { name: "Radiologijos technologas" },
    { name: "Šeimos gydytojas" },
    { name: "Sporto medicinos gydytojas" },
    { name: "Vaikų kardiologas" },
    { name: "Vaikų ligų gydytojas" },
    { name: "Vaikų ortopedas traumatologas" },
    { name: "Vidaus ligų gydytojas" },
]
const DegreeLevels = [
    {name: "Vidurinis"},
    {name: "Profesinis"},
    {name: "Aukštesnysis"},
    {name: "Aukštasis"},
    {name: "Magistras"},
    {name: "Daktaras"},
    {name: "Kita"},
]


const StepTwo = ({ ActiveStep, setActiveStep }) => {

    const defaultValues = {
        HighSchool: "", StudyBeginningDate: "", DateOfGraduation: "", Specialization: "", DegreeLevel: "", LicenseNumber: ""
    }

    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm({ resolver: yupResolver(DoctorStepTwoResolver), defaultValues: defaultValues})

    const incrementStep = (values) => {
        StepTwoDoctorAction(values)
        setActiveStep((step) => step + 1)
    }

    return (
        <>
            <Box component="form" sx={{ marginBottom: "10px" }} noValidate onSubmit={handleSubmit(incrementStep)}>
                <Typography marginTop={3} marginBottom={2} variant='h6'>Education</Typography>
                <Grid container spacing={2}>

                    <Grid xs={12}>
                        <Controller
                            control={control}
                            name='HighSchool'
                            required
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <FormControl sx={{ width: "100%" }} size='small'>
                                        <InputLabel id="demo-select-small-label">Aukštoji Mokykla</InputLabel>
                                        <Select
                                            error={Boolean(errors.HighSchool)}
                                            size='small'
                                            labelId="demo-select-small-label"
                                            value={value}
                                            onBlur={onBlur}
                                            label="Aukštoji Mokykla"
                                            onChange={onChange}
                                        >

                                            {universitys.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                    <FormHelperText error variant='filled'>{errors.HighSchool?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Controller
                            control={control}
                            name='StudyBeginningDate'
                            required
                            render={({ field: { onChange, onBlur } }) => (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='lt' >
                                        <DesktopDatePicker label="Studiju Pradžia" onChange={onChange}
                                            onBlur={onBlur} sx={{ width: "100%" }} disableFuture required
                                            slotProps={{ textField: { size: 'small', error: Boolean(errors.StudyBeginningDate) } }}
                                            openTo="year"
                                            views={['year', 'month']}
                                        />
                                    </LocalizationProvider>

                                </>
                            )}
                        />
                        <FormHelperText error variant='filled'>{errors.StudyBeginningDate?.message}</FormHelperText>
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <Controller
                            control={control}
                            name='DateOfGraduation'
                            required
                            render={({ field: { onChange, onBlur } }) => (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='lt' >
                                        <DesktopDatePicker label="Studiju Pabaiga" onChange={onChange}
                                            onBlur={onBlur} sx={{ width: "100%" }} disableFuture required
                                            slotProps={{ textField: { size: 'small', error: Boolean(errors.DateOfGraduation) } }}
                                            openTo="year"
                                            views={['year', 'month']}
                                        />
                                    </LocalizationProvider>

                                </>
                            )}
                        />
                        <FormHelperText error variant='filled'>{errors.DateOfGraduation?.message}</FormHelperText>
                    </Grid>
                    <Grid xs={12} >
                        <Controller
                            control={control}
                            name='Specialization'
                            required
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <FormControl sx={{ width: "100%" }} size='small'>
                                        <InputLabel id="demo-select-small-label">Įgyta Specialybė</InputLabel>
                                        <Select
                                            error={Boolean(errors.Specialization)}
                                            size='small'
                                            sx={{ width: "100%" }}
                                            labelId="demo-select-small-label"
                                            value={value}
                                            onBlur={onBlur}
                                            label="Įgyta Specialybė"
                                            onChange={onChange}
                                        >

                                            {Specializations.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                    <FormHelperText error variant='filled'>{errors.Specialization?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    
                    <Grid xs={6} sm={6} >
                        <Controller
                            control={control}
                            name='DegreeLevel'
                            required
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <FormControl sx={{ width: "100%" }} size='small'>
                                        <InputLabel id="demo-select-small-label">Laipsnis</InputLabel>
                                        <Select
                                            error={Boolean(errors.DateOfGraduation)}
                                            size='small'
                                            sx={{ width: "100%" }}
                                            labelId="demo-select-small-label"
                                            value={value}
                                            onBlur={onBlur}
                                            label="Laipsnis"
                                            onChange={onChange}
                                        >

                                            {DegreeLevels.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                    <FormHelperText error variant='filled'>{errors.DegreeLevel?.message}</FormHelperText>
                                </>
                            )}

                        />
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <TextField
                            size='small'
                            required
                            fullWidth
                            label="Licenzijos Numeris"
                            {...register("LicenseNumber")}
                            autoComplete="License Number"
                            error={Boolean(errors.LicenseNumber)} helperText={errors.LicenseNumber?.message}
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

export default StepTwo