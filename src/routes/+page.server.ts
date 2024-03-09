import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = () => {
  return {
    title: 'Page',
    message: 'Hello from the server!',
    time: Date.now()
  }
}