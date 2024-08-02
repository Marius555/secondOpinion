import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { Paper } from '@mui/material'
import ButtonArray from '@/Components/doctorCard/buttonArray'
import { cookies } from 'next/headers';
import ThreeDots from '@/Components/doctorCard/ThreeDots'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer'


const page = async () => {
  const pb = DataBaseConnectionServer()
  const pb_cookie = cookies().get("pb_auth")
  if (pb_cookie) {
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
  }

  const records = await pb.collection('DoctorDetails').getFullList({
    sort: '-created',
  });

  const userInteractions = await pb.collection('DoctorStats').getFullList({
    sort: '-created',
  });
  const rec = []

  if (pb_cookie && pb.authStore.isValid === true) {
    records.map((item) => {
      userInteractions.map((value) => {
        if (item.id === value.UserId && pb.authStore.model.id === value.User) {
          const newData = { ...item, value }
          rec.push(newData)
        }
      })
    })
  }
  else {
    records.map((item) => {
      rec.push(item)
    })
  }


  const defaultData = { Comment: false, Dislike: false, Like: false }




  return (
    <Grid2 container spacing={1} sx={{placeContent: "start", alignContent: "cetner", padding: "10px"}}>
      {rec?.map((item, index) => {
        return (
          <Grid2 >
            <Paper key={index} sx={{ display: "flex", flexDirection: "row", padding: "5px", gap: "10px", width: "30rem", height: "10rem", position: "relative" }}>
              <Box >
                <Image src={`http://127.0.0.1:8090/api/files/${item?.collectionId}/${item?.id}/${item?.file}`} width={80} height={80} alt='Photo' style={{ borderRadius: "50%", objectFit: "cover", marginTop: "10px" }} />
              </Box>

              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography >{item.Name} {item.LastName}</Typography>
                  <Typography sx={{ color: "grey" }} variant='caption'>Kineziterapeutas</Typography>
                  <ButtonArray likes={item.Likes} dislikes={item.Dislikes} comments={item.Comments} ident={item.id} values={item.value ? item.value : defaultData} />
                </Box>
                <Box sx={{ position: "absolute", top: "0px", right: "5px" }}>
                  <ThreeDots ident={item} />
                </Box>
              </Box>
            </Paper>
          </Grid2>

        )
      })}
    </Grid2>

  )
}

export default page
