"use server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';

const DoctorReportAction = async(values) => {
    const pb = DataBaseConnectionServer()
    const pb_cookie = cookies().get("pb_auth")
    if (pb_cookie) {
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    }
    else{
        return redirect("/login")
    }
    try {
        const data = {
            "user": pb.authStore.model.id,
            "UserId": values.userId,
            "reason": values.reason,
            "comment": values.comment
        };
        await pb.collection('DoctorReport').create(data);
    } catch (error) {
        console.error(error)
    }



}

export default DoctorReportAction
