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

const ButtonArray = ({ likes, dislikes, comments, ident, values, isLogin }) => {

    const [likeState, setLikeState] = useState(likes)
    const [dislikeState, setdislikeState] = useState(dislikes)
    const [commentState, setcommentState] = useState(comments)

    const [IsLikeTrue, setIsLikeTrue] = useState(values.Like)
    const [IsDislikeTrue, setIsDislikeTrue] = useState(values.Dislike)

    const [LoginState, setLoginState] = useState(false)
    const [DisableClick, setDisableClick] = useState(false)
    const [DisableDislikeClick, setDisableDislikeClick] = useState(false)

    useEffect(() => {
        
        setLikeState(() => likes)
        setdislikeState(() => dislikes)
        setcommentState(() => comments)
        if(isLogin === true){
            setLoginState(() => true)
            
        }
        else{
            setLoginState(() => false)
        }
        if(values.Like){
            setDisableDislikeClick(() => true)
        }
        if(values.Dislike){
            setDisableClick(() => true) 
        }
        
        

    }, [likes, dislikes, comments, isLogin])

    // useEffect(() =>{
    //     if(DisableClick === true){
    //         setDisableDislikeClick(() => true)
    //     }
    //     if(DisableDislikeClick === true){
    //         setDisableClick(() => true)
    //     }
    // },[DisableClick, DisableDislikeClick])

    const handleLove = async (_, val) => {
        await LikeSubmit(val, ident)
        setIsLikeTrue((state) => !state)
        setDisableDislikeClick((disState) => !disState)
    }
    const handleDislike = async (_, val) => {
        await DislikeAction(val, ident)
        setIsDislikeTrue((state) => !state)
        setDisableClick((likState) => !likState)
    }

    return (
        <Stack direction="row" spacing={1} marginTop={0.7}>
            <AskQuestion ident={ident}/>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {LoginState === true ? 
                (<Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} disabled={DisableClick} checked={IsLikeTrue} onChange={handleLove} />):
                (<PleaseLogIn state="like" />)    
                }
                
                

                <Typography variant='button'>{likeState}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {LoginState === true ? 
                (<Checkbox icon={<ThumbDownOffAltIcon />} checkedIcon={<ThumbDownAltIcon />}  checked={IsDislikeTrue} disabled={DisableDislikeClick} onChange={handleDislike} />):
                (<PleaseLogIn state="dislike"/>)    
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
