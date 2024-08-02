"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import StepTwo from './doctorSteperComponents/StepTwo';
import StepFour from './doctorSteperComponents/StepFour';
import StepTreeUpdated from './doctorSteperComponents/StepTreeUpdated';
import StepCongratulations from './doctorSteperComponents/StepCongratulations';
import StepOne from './doctorSteperComponents/StepOne';

const StepLabels = [
    { label: "Detales" },
    { label: "Išsilavinimas" },
    { label: "Darbovietė" },
    { label: "Kalbos" }
]

const DoctorsStepper = () => {
    const [ActiveStep, setActiveStep] = useState(0);

    const incrementStep = () => {
        if (ActiveStep < StepLabels.length) {
            setActiveStep((currentStep) => currentStep + 1)
        }
    }
    const decrementStep = () => {
        if (ActiveStep > 0) {
            setActiveStep((currentStep) => currentStep - 1)
        }
    }
    return (
        <>
            <Box  sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "auto", marginTop:"2rem", padding: "5px" }}>
                <Box >
                    <Stepper activeStep={ActiveStep} alternativeLabel>
                        {StepLabels.map((item, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{item.label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>

                    <Box  sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: {sm: "25rem", xs: "20rem"}}}>
                        {ActiveStep === 0 && <StepOne ActiveStep={ActiveStep} setActiveStep={setActiveStep} />}
                        {ActiveStep === 1 && <StepTwo ActiveStep={ActiveStep} setActiveStep={setActiveStep} />}
                        {ActiveStep === 2 && <StepTreeUpdated ActiveStep={ActiveStep} setActiveStep={setActiveStep} />}
                        {ActiveStep === 3 && <StepFour ActiveStep={ActiveStep} setActiveStep={setActiveStep} />}
                        {ActiveStep === 4 && <StepCongratulations />}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DoctorsStepper