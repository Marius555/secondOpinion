"use server"
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const CommentAction = async (values) => {
    const pb = DataBaseConnectionServer()
    const pb_cookie = cookies().get("pb_auth")
    if (pb_cookie) {
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    }

    const data = {
        "UserId": values.ident,
        "User": values.user ? values.user : "",
        "Comment": values.Comment,
        "IsPositive": values.IsPositive,
        "CommentatorsName": values.CommentatorsName ? values.CommentatorsName: ""
    };
    const increment = {
        "Comments+": 1
    }
    await pb.collection('DoctorCardComments').create(data);
    await pb.collection('DoctorDetails').update(values.ident, increment);
    revalidatePath("/doctors")
}

export default CommentAction