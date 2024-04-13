import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
 
async function authorizationHandle({ event, resolve }) {
  // Protect any routes under /authenticated

  const protectedRoutesConditions = false // event.url.pathname.startsWith('/api/strategy')

  if (protectedRoutesConditions) {
    const session = await event.locals.auth();
    if (!session) {
      // Redirect to the signin page
      throw redirect(303, '/signin');
    }
  }
 
  // If the request is still here, just proceed as normally
  return resolve(event);
}
 
// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle)
