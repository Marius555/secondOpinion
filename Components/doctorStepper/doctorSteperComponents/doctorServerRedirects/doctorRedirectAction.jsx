"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache'

const doctorRedirectAction = async () => {
    revalidatePath("/")
    return redirect("/")
}

export default doctorRedirectAction
