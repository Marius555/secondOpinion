"use server"
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

const LogoutAction = async() => {
    try {
        cookies().delete('pb_auth')
        revalidatePath("/")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default LogoutAction