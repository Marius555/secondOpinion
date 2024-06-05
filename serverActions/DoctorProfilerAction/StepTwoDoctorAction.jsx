"use server"
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers'
import dayjs from 'dayjs';
const pb = new PocketBase('http://127.0.0.1:8090');

const StepTwoDoctorAction = async(values) => {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    if(pb.authStore.isValid){
        try {
            const data = {
                "UserId": pb.authStore.model.id,
                "HighSchool": values.HighSchool,
                "DegreeLevel": values.DegreeLevel,
                "Specialization": values.Specialization,
                "StudyBeginningDate": dayjs(values.StudyBeginningDate).format("YYYY-MM-DD"),
                "DateOfGraduation": dayjs(values.DateOfGraduation).format("YYYY-MM-DD"),
                "LicenseNumber": values.LicenseNumber
            };
            await pb.collection('DoctorEducation').create(data);
        } catch (error) {
            return
        }
    }
}

export default StepTwoDoctorAction
