"use server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const DoctorConsultationAction = async(values) => {
    const pb = DataBaseConnectionServer()
    const pb_cookie = cookies().get("pb_auth")
    if (pb_cookie) {
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    }
    else{
        return redirect("/login")
    }
    console.log(values)
    try {
        const data = {
            "problem": values.problem,
            "filesSubmited": values.filesSubmited,
            "UserId": values.UserId,
            "user": pb.authStore.model.id
        };
        await pb.collection('DoctorConsultation').create(data);

    } catch (error) {
        console.log(error)
    }


}

export default DoctorConsultationAction
