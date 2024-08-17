"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import { Box, FormHelperText, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { array } from 'yup';
import DoctorConsultationAction from '@/serverActions/DoctorConsultation/DoctorConsultationAction';
import DoctorConsultationResolver from '@/resolvers/DoctorConsultationResolver/DoctorConsultationResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import PleaseLogIn from './PleaseLogIn';
import { useEffect } from 'react';
import DataBaseConnectionClient from '../DatabaseConnection/DataBaseConnection';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

const Transition = function Transition(props) {
  return <Slide direction="up" ref={props.ref} {...props} />;
};

export default function AskQuestion({ ident }) {
  const pb = DataBaseConnectionClient()
  const [imagePreviews, setImagePreviews] = useState([]);
  const [IsLogedIn, setIsLogedIn] = useState(false);


  useEffect(() => {
    if (pb.authStore.isValid === true) {
      setIsLogedIn(true)
    }
  }, [])

  const defaultValues = {
    problem: "",
    filesSubmited: array,
    UserId: ident
  }

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
    watch

  } = useForm({ defaultValues: defaultValues, resolver: yupResolver(DoctorConsultationResolver) })

  const [open, setOpen] = React.useState(false);
  const files = watch('filesSubmited');

  React.useEffect(() => {
    if (files && files.length > 0) {
      const newImagePreviews = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImagePreviews.push(reader.result);
            if (newImagePreviews.length === files.length) {
              setImagePreviews(newImagePreviews);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      setImagePreviews([]);
    }
  }, [files]);


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

  const HandleSub = async (values) => {
    await DoctorConsultationAction(values)
    handleClose()
    reset()
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreviews(() => [])

    reset()
  };

  return (
    <React.Fragment>
      {IsLogedIn === true ?
        (<>
          <Button variant="contained" size='small' onClick={handleClickOpen}>
            Consultation
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="ask-doctor-question"
          >
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <DialogTitle>{"Consultation"}</DialogTitle>
              <CloseIcon sx={{margin: "10px", cursor: "pointer",}} onClick={handleClose}/>
            </Box>
            <DialogContent>
              <Box component="form" id='consultation-submit' noValidate onSubmit={handleSubmit(HandleSub)}>
                <TextField
                  multiline
                  rows={3}
                  margin="normal"
                  required
                  fullWidth
                  id="problem"
                  label="Describe You Health Issues"
                  autoComplete="problem"
                  autoFocus
                  size='small'
                  {...register("problem")}
                  error={Boolean(errors.problem)} helperText={errors.problem?.message}
                />

                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  fullWidth

                >
                  Upload Test Results
                  <VisuallyHiddenInput type="file" multiple {...register("filesSubmited")} error={Boolean(errors.filesSubmited)} />
                </Button>
                <FormHelperText error variant='filled'>{errors.filesSubmited?.message}</FormHelperText>

                <Box sx={{ display: "flex", flexDirection: "row", gap: "15px", width: "5px" }}>
                  {imagePreviews.map((src, index) => (
                    <Image key={index} src={src} alt={`Preview ${index}`} width={100} height={100} />
                  ))}
                </Box>
              </Box>


            </DialogContent>
            <DialogActions sx={{ margin: "0px 10px" }}>
              <Button variant='outlined' onClick={handleClose}>Close</Button>
              <Button type='submit' variant='contained' form="consultation-submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </>
        ) :
        <PleaseLogIn state="consult" />
      }
    </React.Fragment>
  );
}