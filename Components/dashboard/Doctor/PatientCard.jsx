"use client"
import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
const PatientCard = () => {
  return (
    <>
      <Paper sx={{ display: "flex", flexDirection: "row", height: "100%", padding: "10px" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "600", marginBottom: "1rem" }}>Profile Views</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px",marginBottom: "5px" }}>
            <Typography variant='button'> Total Views  </Typography>
            <Typography variant='button'>261</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "5px" }}>
            <Typography variant='caption'> New Patients  </Typography>
            <Typography variant='caption'>10</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "5px" }}>
            <Typography variant='caption'> Profile Clicks  </Typography>
            <Typography variant='caption'>68</Typography>
          </Box>
        </Box>

        <Box sx={{ width: "100%", alignItems: "center", justifyContent: "center", display: "flex" }}>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10 },
                  { id: 1, value: 15 },
                  { id: 2, value: 20 },
                ],
                paddingAngle: 5,
                innerRadius: 75,
                cornerRadius: 0,
                startAngle: -180,
                endAngle: 180,

              },
            ]}
            height={155}
            margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          ><PieCenterLabel> 10 </PieCenterLabel> </PieChart>
        </Box>
      </Paper>
    </>
  )
}

export default PatientCard
