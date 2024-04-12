// src/routes/delete_user/+page.server.js
import { redirect } from "@sveltejs/kit"

export const actions = {
    delete_user: async ({ locals, request,  cookies }) => {
    const storageKey = locals.supabase.storageKey

    await locals.supabase.rpc('delete_user');
cookies.delete(storageKey, { path: '/' });
    redirect(303, "/");
    }
}

export async function load({locals: { getSession } }) {
    const session = await getSession();
    // if the user is not logged in redirect back to the home page
    if (!session) {
        redirect(303, '/');
    }
  }