"use server"
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers'
import dayjs from 'dayjs';
const pb = new PocketBase('http://127.0.0.1:8090');

const StepTreeDoctorAction = async(values) => {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    if(pb.authStore.isValid){
        try {
            const data = {
                "UserId": pb.authStore.model.id,
                "Company": values.Company,
                "CompanyURL": values.CompanyURL,
                "Responsibilities": values.Responsibilities,
                "WorkDescription": values.WorkDescription,
                "Nuo": dayjs(values.Nuo).format("YYYY-MM"),
                "Iki": dayjs(values.Iki).format("YYYY-MM"),
            };
            await pb.collection('DoctorExperianse').create(data);
        } catch (error) {
            return
        }
    }
}

export default StepTreeDoctorAction