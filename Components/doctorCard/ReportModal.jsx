"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import DoctorReportResolver from '@/resolvers/DoctorReport/DoctorReportResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import DoctorReportAction from '@/serverActions/DoctorReportAction/DoctorReportAction';
import { useEffect } from 'react';
import PleaseLogIn from './PleaseLogIn';
import PopLogin from '../dashboard/PopupLogInAndSignIn/PopLogIn';
import DataBaseConnectionClient from '../DatabaseConnection/DataBaseConnection';

const Transition = function Transition(props) {
    return <Slide direction="up" ref={props.ref} {...props} />;
};

export default function ReportModal({ report, setreport, ident, isLogin }) {
    const pb = DataBaseConnectionClient()
    const [disableButton, setDisableButton] = React.useState(false)
    const [IsLogIn, setIsLogIn] = React.useState(isLogin)
    const [LoginModalState, setLoginModalState] = React.useState(false)
    

    useEffect(() => {
        if (isLogin) {
            setIsLogIn(true)
        }
        if (!isLogin) {
            setIsLogIn(false)
        }
    },[isLogin])

    const defaultValues = {
        userId: ident.id,
        reason: "",
        comment: "",
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset

    } = useForm({ defaultValues: defaultValues, resolver: yupResolver(DoctorReportResolver) })


    const handleSub = async (values) => {
        setDisableButton(() => true)
        await DoctorReportAction(values)
        setDisableButton(() => false)
        handleClose()

    }

    const handleClose = () => {
        setreport(false);
        reset()
    };

    return (
        <React.Fragment>

            <Dialog
                open={report}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {IsLogIn === true ?
                    (<>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                            <DialogTitle>{`Report ${ident.Name} ${ident.LastName}`}</DialogTitle>
                            <CloseIcon sx={{ justifySelf: "center", alignSelf: "center", margin: "0px 10px", cursor: "pointer" }} onClick={handleClose} />
                        </Box>
                        <DialogContent>
                            <Box component="form" noValidate id='reportForm' onSubmit={handleSubmit(handleSub)}>
                                <Controller
                                    control={control}
                                    name='reason'
                                    required
                                    render={({ field }) => (
                                        <>
                                            <FormControl fullWidth error={Boolean(errors.reason)} size='small' >

                                                <InputLabel id="reason-label">Reason</InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId="reason-label"
                                                    id="reason"
                                                    label="reason"
                                                >

                                                    <MenuItem value="Fake">Fake Account</MenuItem>
                                                    <MenuItem value="Fraud">Fraud</MenuItem>
                                                    <MenuItem value="BadService">Bad Service</MenuItem>
                                                </Select>
                                                <FormHelperText>{errors.reason?.message}</FormHelperText>
                                            </FormControl>

                                        </>
                                    )}
                                />

                                <TextField
                                    multiline
                                    rows={2}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="comment"
                                    label="Comment"
                                    autoComplete="comment"
                                    autoFocus
                                    size='small'
                                    {...register("comment")}
                                    error={Boolean(errors.comment)} helperText={errors.comment?.message}
                                />
                            </Box>
                            <FormHelperText>{errors.userId?.message}</FormHelperText>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} >Close</Button>
                            <Button type='submit' form="reportForm" disabled={disableButton}>Submit</Button>
                        </DialogActions>
                    </>)
                    :
                    <Box sx={{margin: "10px"}}>
                        <PopLogin setOpen={setreport}/>
                    </Box>
                }

            </Dialog>
        </React.Fragment>
    );
}