// src/routes/protected/+layout.server.js

import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
 const session = await event.locals.getSession();

 if (!session) {
  redirect(307, '/signin');
 }

 return {
  session
 };
};