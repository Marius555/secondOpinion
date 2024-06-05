"use server"
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers'


const pb = new PocketBase('http://127.0.0.1:8090');


const StepOneDoctorAction = async (values) => {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    values.append("UserId", pb.authStore.model.id)
    const val = Object.fromEntries(values)
    console.log(val)

    if (pb.authStore.isValid) {
        try {
            const id = pb.authStore.model.id
            try {
                const record = await pb.collection('DoctorDetails').getFirstListItem(`UserId="${id}"`);
                await pb.collection('DoctorDetails').update(record.id, val);
            } catch (error) {
                
                await pb.collection('DoctorDetails').create(val);
                return { "success": "Data Have Been Successfully Submited" }
            }
        } catch (error) {
            console.log()
            return { "error": "Data Failed To Submit" }
        }
    }

}

export default StepOneDoctorAction
