"use client"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Avatar from '@mui/material/Avatar';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useForm, Controller } from "react-hook-form"
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoctorCommentResolver from '@/resolvers/DoctorCommentResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import CommentAction from '@/serverActions/DoctorStats/CommentAction';
import dayjs from 'dayjs';
import DataBaseConnectionClient from '../DatabaseConnection/DataBaseConnection';


const Transition = function Transition(props) {
    return <Slide direction="up"  {...props} />;
};

const Comments = ({ ident }) => {
    const pb = DataBaseConnectionClient()
    const [commentArr, SetcommentArr] = useState()
    const [showComment, SetshowComment] = useState(true)
    const [open, setOpen] = React.useState(false);
    const defaultValues = { CommentatorsName: "", IsPositive: "", Comment: "", ident: ident, user: pb?.authStore?.model?.id }
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ resolver: yupResolver(DoctorCommentResolver), defaultValues: defaultValues })

    const handleClickOpen = async () => {
        const records = await pb.collection('DoctorCardComments').getFullList({
            sort: '-created',
            filter: `UserId="${ident}"`

        });
        SetcommentArr(() => records)
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        reset()
    };
    const handleClick = async (values) => {
        await CommentAction(values)
        setOpen(false);
        reset()
    }


    return (
        <React.Fragment>
            <IconButton aria-label="Comments" onClick={handleClickOpen}>
                <ChatBubbleOutlineIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-describedby="comment-dialog"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: "space-between" }}>
                    {"Comments"}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "10px", maxHeight: "300px", overflowY: "scroll" }}>
                        {commentArr?.map((item, index) => {
                            // const date = dayjs(item.created).subtract()
                            const currentDate = dayjs()
                            const postDate = dayjs(item.created)
                            let finalDate = ""

                            if (currentDate.diff(postDate, "year") > 1) {
                                finalDate = currentDate.diff(postDate, "year") + " Y"
                            }
                            if (currentDate.diff(postDate, "month") < 12) {
                                finalDate = currentDate.diff(postDate, "Month") + " M"
                            }
                            if (currentDate.diff(postDate, "day") < 30) {
                                finalDate = currentDate.diff(postDate, "day") + " d"
                            }
                            if (currentDate.diff(postDate, "hour") < 24) {
                                finalDate = currentDate.diff(postDate, "hour") + " h"
                            }
                            if (currentDate.diff(postDate, "minute") < 60) {
                                finalDate = currentDate.diff(postDate, "minute") + " min"
                            }
                            if (currentDate.diff(postDate, "seconds") < 60) {
                                finalDate = currentDate.diff(postDate, "seconds") + " s"
                            }

                            return (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0px 10px"}}>
                                    <Avatar alt={`Remy Sharp ${index}`} sx={{ width: 36, height: 36 }} />
                                    <Box sx={{ padding: "7px", background: "#EAEDED", borderRadius: "10px", overflow: "hidden", maxWidth: "400px" }}>
                                        <Box sx={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                            <Typography variant='caption' fontWeight={700}>{item.CommentatorsName}</Typography>
                                            <Typography variant='caption'>{finalDate} </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{item.Comment}</Typography>
                                    </Box>
                                </Box> 
                            )



                        })}
                    </Box>
                    <Divider variant='middle' sx={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }} />

                    <Box component="form" sx={{
                        display: "flex", flexDirection: "column", marginTop: "20px", gap: "20px"
                    }}>
                        <Grid2 container spacing={1} columns={12}  >
                            <Grid2 xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Name"
                                    placeholder="Name"
                                    {...register("CommentatorsName")}
                                    error={Boolean(errors.CommentatorsName)} helperText={errors.CommentatorsName?.message}
                                />
                            </Grid2>

                            <Grid2 xs={6} sm={6}>
                                <Controller
                                    control={control}
                                    name='IsPositive'
                                    required
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <FormControl sx={{ width: "100%" }} size='small'>
                                                <InputLabel id="demo-select-small-label">Opinion</InputLabel>
                                                <Select
                                                    {...field}
                                                    size='small'
                                                    labelId="demo-select-small-label"
                                                    label="Opinion"
                                                >

                                                    <MenuItem value="true">Positive</MenuItem>
                                                    <MenuItem value="false">Negative</MenuItem>


                                                </Select>
                                            </FormControl>
                                            <FormHelperText error variant='filled'>{errors.IsPositive?.message}</FormHelperText>
                                        </>
                                    )}

                                />

                            </Grid2>

                            <Grid2 xs={12} sm={12}>
                                <TextField

                                    size='small'
                                    label="Comment"
                                    placeholder="Comment"
                                    fullWidth
                                    multiline
                                    {...register("Comment")}
                                    error={Boolean(errors.Comment)} helperText={errors.Comment?.message}
                                />
                            </Grid2>

                        </Grid2>

                        <Button fullWidth variant='contained' onClick={handleSubmit(handleClick)}>Pateikti</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default Comments
