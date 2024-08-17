"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Checkbox } from '@mui/material';
import Slide from '@mui/material/Slide';
import PopLogin from '../dashboard/PopupLogInAndSignIn/PopLogIn';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const Transition = function Transition(props) {
    return <Slide direction="up" ref={props.ref} {...props} />;
};

export default function PleaseLogIn({ state }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {state === "like" && (<Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} checked={false} onClick={handleClickOpen} />)}
            {state === "dislike" && (<Checkbox icon={<ThumbDownOffAltIcon />} checkedIcon={<ThumbDownAltIcon />} checked={false} onClick={handleClickOpen} />)}
            {state === "consult" && <Button variant="contained" size='small' onClick={handleClickOpen}>
                Consultation
            </Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}

            >
                <Box sx={{ margin: "10px" }}>
                    <PopLogin setOpen={setOpen} />
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
