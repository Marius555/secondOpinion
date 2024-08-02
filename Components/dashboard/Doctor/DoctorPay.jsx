"use client"
import { Box, Paper } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import React from 'react';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import theme from '@/app/theme';
import "dayjs/locale/lt"
import DataBaseConnectionClient from '@/Components/DatabaseConnection/DataBaseConnection';
dayjs.locale("lt")


const DoctorPay = () => {
    const pb = DataBaseConnectionClient();
    const [reData, SetReqData] = useState()
    const currentDate = dayjs().format("YYYY-MM-dd")
    const [dateRequest, SetDateRequest] = useState(dayjs().subtract(5, "days").format("YYYY-MM-D"))
    const [value, setValue] = React.useState(0);
    const [dateType, setDateType] = React.useState("days");



    useEffect(() => {
        const getData = async () => {
            try {
                const userData = await pb.collection('DoctorPay').getFullList({
                    filter: `UserId="${pb.authStore.model.id}" && Create >= "${dateRequest} 00:00:00" && Create <= "${currentDate} 00:00:00"`,
                    sort: '+Create',
                });
                userData && SetReqData(() => (userData))

            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [dateRequest])

    const dates = []
    const amount = []

    reData?.map((item) => {

        if (dateType === "days") {
            const um = dayjs(item.Create).format("MMM DD HH:mm")
            dates.push(um)
            amount.push(item.Amount)
        }
        if (dateType === "months") {
            const um = dayjs(item.Create).format("MMM DD HH:mm")
            dates.push(um)
            amount.push(item.Amount)
        }
    })
    console.log(dates)

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            SetDateRequest(dayjs().subtract(5, "day").format("YYYY-MM-D"))
            setDateType(() => "days")

        }
        if (newValue === 1) {
            SetDateRequest(dayjs().subtract(1, "month").format("YYYY-MM-D"))
            setDateType(() => "days")
        }
        if (newValue === 2) {
            SetDateRequest(dayjs().subtract(6, "month").format("YYYY-MM-D"))
            setDateType(() => "months")
        }
        setValue(newValue);
    };


    return (
        <>
            <Paper sx={{ padding: "10px", display: 'flex', position: "relative", margin: "1rem", flexDirection: "column", margin: "0px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "600" }}>Payments</Typography>
                    <Box>
                        <TabContext value={value} >

                            <TabList aria-label="lab API tabs example" onChange={handleChange} textColor="primary" sx={{ height: "10px", maxHeight: "10px" }}
                                indicatorColor="primary">
                                <Tab label="5d" value={0} sx={{ margin: "0px", padding: "0px", height: "10px", maxHeight: "10px" }} />
                                <Tab label="1month" value={1} sx={{ margin: "0px", padding: "0px" }} />
                                <Tab label="6month" value={2} sx={{ margin: "0px", padding: "0px" }} />
                            </TabList>


                        </TabContext>
                    </Box>
                </Box>
                <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
                    <LineChart
                        sx={{
                            '& .MuiAreaElement-root': {
                                opacity: 0.2,
                            },

                        }}
                        disableLineItemHighlight
                        xAxis={[
                            {
                                data: dates,
                                scaleType: 'point',

                            }]}

                        series={[
                            {
                                data: amount,
                                area: true,
                                scaleType: "band",
                                // showMark: false,
                                label: "amount",
                                curve: "linear",
                                color: `${theme.palette.primary.main}`
                            },

                        ]}
                        slotProps={{ legend: { hidden: true } }}
                        margin={{ top: 10, bottom: 20 }}




                        bottomAxis={{
                            disableLine: true,
                            disableTicks: true,
                        }}
                        leftAxis={{
                            disableLine: true,
                            disableTicks: true,
                        }}
                        grid={{ horizontal: true }}
                        height={155}


                    />
                </Box>
            </Paper>
        </>
    )
}

export default DoctorPay
