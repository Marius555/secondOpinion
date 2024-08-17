"use server"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import LoginResolver from "@/resolvers/LoginResolver";
import PocketBase from 'pocketbase';
import { revalidatePath } from 'next/cache'
import DataBaseConnectionServer from "@/Components/DatabaseConnection/DataBaseConnectionServer";


const pb = DataBaseConnectionServer()


async function verify(values) {
    try {
        await pb.collection('users').authWithPassword(
            values.Email,
            values.Password,
        );
        cookies().set({
            name: 'pb_auth',
            value: JSON.stringify(pb.authStore.storageFallback.pocketbase_auth),
            httpOnly: false,
            sameSite: false,
            secure: false,
            path: '/',
        })
        return true
    } catch (error) {
        return JSON.stringify(error)
    }
}

const LogInAction = async (values) => {

    const is_valid = await LoginResolver.isValid(values)

    if (is_valid === true) {
        const check = await verify(values)
        if(check === true ){
            if(pb.authStore.model.MultipleLogin === false && pb.authStore.model.UserType === "Doctor"){
                const data = {"MultipleLogin": true} 
                await pb.collection('users').update(`${pb.authStore.model.id}`, data);
                redirect("/user/doctor/profiler")
            }
            redirect("/doctors")
            
        }
        else{
            return {error: check}
        }
    }
    else {
        return { error: "Shape Of Form Miss Match" }
    }
    

}

export default LogInAction
