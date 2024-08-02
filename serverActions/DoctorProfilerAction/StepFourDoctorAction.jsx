"use server"
import { cookies } from 'next/headers'
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';

const pb = DataBaseConnectionServer()


const StepFourDoctorAction = async(values) => {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    if(pb.authStore.isValid){
        try {
            const data = {
                "UserId": pb.authStore.model.id,
                "LithuanianLanguage": values.LithuanianLanguage,
                "EnglishLanguage": values.EnglishLanguage,
                "RussianLanguage": values.RussianLanguage,
                "CanConsultLithuanian": values.CanConsultLithuanian,
                "CanConsultEnglish": values.CanConsultEnglish,
                "CanConsultRussian": values.CanConsultRussian,
            };
            await pb.collection('DoctorLanguage').create(data);
        } catch (error) {
            return
        }
    }
}

export default StepFourDoctorAction