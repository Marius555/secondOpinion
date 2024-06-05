"use server"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import LoginResolver from "@/resolvers/LoginResolver";
import PocketBase from 'pocketbase';
import { revalidatePath } from 'next/cache'

const pb = new PocketBase('http://127.0.0.1:8090');


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
            revalidatePath('/')
            redirect("/")
            
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
