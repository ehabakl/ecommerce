// app/api/auth/token.utils.ts
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  try {
    const cookieStore = await cookies();

    // ✅ handle both secure and non-secure cookie names
    const sessionToken =
      cookieStore.get("__Secure-next-auth.session-token")?.value ||
      cookieStore.get("next-auth.session-token")?.value;

    console.log("Session token found:", !!sessionToken);

    if (!sessionToken) {
      console.log("No session token found in cookies");
      return null;
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      console.error("AUTH_SECRET not found");
      return null;
    }

    const decryptedToken = await decode({
      token: sessionToken,
      secret,
    });

    console.log("Decrypted token:", decryptedToken);

    const apiToken =
      decryptedToken?.token || decryptedToken?.accessToken;

    if (!apiToken) {
      console.log("No API token found in decrypted JWT");
      return null;
    }

    return apiToken;
  } catch (error) {
    console.error("getUserToken error:", error);
    return null;
  }
}
