"use server"
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import DataBaseConnectionServer from '@/Components/DatabaseConnection/DataBaseConnectionServer';


const DislikeAction = async(LikeValue, ident) => {
    const pb = DataBaseConnectionServer()
    const pb_cookie = cookies().get("pb_auth")
    if (pb_cookie){
        pb.authStore.loadFromCookie(`${pb_cookie.name}=${pb_cookie.value}`)
    }
    else{
        return redirect("/login")
    }

    const data = {
        "UserId": ident,
        "Dislike": LikeValue,
        "User": pb.authStore.model.id
    };
 
    try {
        const record = await pb.collection('DoctorStats').getFirstListItem(`UserId="${ident}" && User="${pb.authStore.model.id}"`);
        await pb.collection('DoctorStats').update(`${record.id}`, data);

        if(record.User === pb.authStore.model.id && LikeValue === false){
            await pb.collection('DoctorDetails').update(`${ident}`,{"Dislikes-": 1});
        }
        if(record.User === pb.authStore.model.id && LikeValue === true){
            await pb.collection('DoctorDetails').update(`${ident}`,{"Dislikes+": 1});;
        }
        revalidatePath("/doctors")
        

        
    } catch (error) {
        await pb.collection('DoctorStats').create(data);
        await pb.collection('DoctorDetails').update(`${ident}`,{"Dislikes+": 1});
        revalidatePath("/doctors")
        console.log(error)
    }
}

export default DislikeAction
