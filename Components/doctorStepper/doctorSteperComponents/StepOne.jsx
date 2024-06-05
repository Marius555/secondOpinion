import React from 'react'
import StepOneForm from './doctorSteperForms/StepOneForm'
import { useEffect, useState } from 'react'
import StepOneCheck from '@/serverActions/DoctorProfilerChecker/StepOneCheck'

const StepOne = ({ ActiveStep, setActiveStep }) => {
    const [data, setData] = useState(null)

    

    useEffect(() => {
        const requeting = async () => {
            if(!data){
                const val = await StepOneCheck()
                setData(() => val)
            }
            
        }
        requeting()
        
    }, [])

    return (
        <>
            {data && <StepOneForm setActiveStep={setActiveStep} ActiveStep={ActiveStep} data={data} setData={setData}/>}
            {!data && <StepOneForm setActiveStep={setActiveStep} ActiveStep={ActiveStep}/>}
        </>
    )
}

export default StepOne

