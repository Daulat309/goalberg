import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}

export async function signOut() {
    return await supabase.auth.signOut();
}

export async function getCurrentUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}
