import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const a = json(url.searchParams)
  console.log(a)

  // Use this formation to create your own charge. See https://docs.opn.ooo/charges-api#create
  return json(a);
}
