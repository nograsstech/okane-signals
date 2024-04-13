import { users } from '@/drizzle/schemas/users';
import { db } from '@/drizzle/db';

export async function GET() {
	const allUsers = await db.select().from(users);

	return new Response(JSON.stringify(allUsers));
}
