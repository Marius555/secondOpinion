"use server"
import { cookies } from 'next/headers'
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';

const pb = DataBaseConnectionServer()


const StepOneCheck = async () => {
  try {
    const pb_cookie = cookies().get("pb_auth")
    pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    const id = pb.authStore.model.id
    const record = await pb.collection('DoctorDetails').getFirstListItem(`UserId="${id}"`);
    return record
  } catch (error) {
    return null
  }
}

export default StepOneCheck
