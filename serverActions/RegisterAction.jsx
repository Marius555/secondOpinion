"use server"
import DoctorRegisterSchema from '@/resolvers/RegisterResolver';
import { redirect } from 'next/navigation'
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const pb = DataBaseConnectionServer()

async function verify(values){
    try {
        const data = {
            "username": values.Username,
            "email": values.Email,
            "emailVisibility": true,
            "password": values.Password,
            "passwordConfirm": values.verifyPassword,
            "UserType": values.UserType,
            "AgreeTerms": values.AgreeTerms
        };
        
        await pb.collection('users').create(data);
        return true
    } catch (error) {
        return JSON.stringify(error)
    }
}

const RegisterAction = async(values) => {
    
    const is_valid = await DoctorRegisterSchema.isValid(values)
    
    if(is_valid === true){
        const check = await verify(values)
        {check === true && redirect("/login")}
    }
    else{
        return {"msg": "Shape Of Form Miss Match"}
    }

  
}

export default RegisterAction