"use server"
import DoctorRegisterSchema from '@/resolvers/RegisterResolver';
import PocketBase from 'pocketbase';
import { redirect } from 'next/navigation'

const pb = new PocketBase('http://127.0.0.1:8090');

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