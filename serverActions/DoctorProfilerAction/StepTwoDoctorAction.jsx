"use server"
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers'
import dayjs from 'dayjs';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const pb = DataBaseConnectionServer()

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
