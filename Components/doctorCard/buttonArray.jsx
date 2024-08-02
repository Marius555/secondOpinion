"use client"
import Checkbox from '@mui/material/Checkbox';
import { Box, Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import LikeSubmit from '@/serverActions/DoctorStats/LikeSubmit';
import DislikeAction from '@/serverActions/DoctorStats/DislikeAction';
import PleaseLogIn from './PleaseLogIn';
import Comments from './Comments';
import AskQuestion from './askQuestion';
import DataBaseConnectionClient from '../DatabaseConnection/DataBaseConnection';

const ButtonArray = ({ likes, dislikes, comments, ident, values }) => {
    const pb = DataBaseConnectionClient()

    const [likeState, setLikeState] = useState(likes)
    const [dislikeState, setdislikeState] = useState(dislikes)
    const [commentState, setcommentState] = useState(comments)

    const [LoginState, setLoginState] = useState(false)
    
    const [DisableClick, setDisableClick] = useState(true)

    useEffect(() => {
        setLikeState(() => likes)
        setdislikeState(() => dislikes)
        setcommentState(() => comments)
        if(pb.authStore.isValid === true){
            setLoginState(() => true)
            setDisableClick(() => false)
            
        }
        else{
            setLoginState(() => false)
            setDisableClick(() => false)
        }

    }, [likes, dislikes, comments])

    const handleLove = async (_, val) => {
        await LikeSubmit(val, ident)
    }
    const handleDislike = async (_, val) => {
        await DislikeAction(val, ident)
    }

    return (
        <Stack direction="row" spacing={1} marginTop={0.7}>
            <AskQuestion ident={ident}/>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {LoginState === true ? 
                (<Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} disabled={DisableClick} checked={values.Like} onChange={handleLove} />):
                (<PleaseLogIn state="like" />)    
                }
                
                

                <Typography variant='button'>{likeState}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {LoginState === true ? 
                (<Checkbox icon={<ThumbDownOffAltIcon />} checkedIcon={<ThumbDownAltIcon />} checked={values.Dislike} disabled={DisableClick} onChange={handleDislike} />):
                (<PleaseLogIn />)    
                }

                <Typography variant='button'>{dislikeState}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Comments ident={ident}/>
                <Typography variant='button'>{commentState}</Typography> 
            </Box>
        </Stack>
    )
}

export default ButtonArray
