
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

  export async function getUserToken (){

  const sessionToken =(await cookies()).get('next-auth.session-token')?.value;
  const decryptedToken = await decode({token : sessionToken , secret : process.env.AUTH_SECRET!})
    const token = decryptedToken?.token 
    return token
  }