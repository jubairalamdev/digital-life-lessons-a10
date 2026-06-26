import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const loginUser = async (loginData) => {
    const { data, error } = await authClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
    });
    return { data, error };
}

export const registerUser = async (registerData) => {
    const { data, error } = await authClient.signUp.email({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        image: registerData.photoUrl,
        plan: registerData.plan,
        role: registerData.role,
    });
    return { data, error };
}

export const logOutUser = async()=> {
    const { data, error } = await authClient.signOut();
    redirect("/")
}

export const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};


export const redirectBack =async() => {
    redirect("/auth/login")
}
