import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Google from '@auth/sveltekit/providers/google';
import { users } from '@/drizzle/schemas/users';

import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_ID,
	GITHUB_SECRET,
	AUTH_SECRET
} from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import type { AdapterUser } from '@auth/core/adapters';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		Google({
			profile(profile) {
				const profileShape = {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					role: profile.role
				};
				return profileShape;
			},
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	secret: AUTH_SECRET,
	trustHost: true,
	session: {
		strategy: 'database'
	},
	callbacks: {
		async signIn({ user }) {
			// Adds `role` field for role-based access control because the stupid adaptor doesn't do it automatically it should.
			const _user = user as AdapterUser & { role: string };

			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) {
				if (!_user.role && _user.id) {
					await db
						.update(users)
						.set({ role: 'user-free' })
						.where(eq(users.id, _user.id))
						.returning({ updatedId: users.id });
				}

				return true;
			} else {
				// Return false to display a default error message
				return false;
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		},
		async session({ session, user }) {
			const getSessionWithRole = async (user: AdapterUser & { role: string }) => {
				if (!user.role && user.id) {
					const updatedUser = await db
						.update(users)
						.set({ role: 'user-free' })
						.where(eq(users.id, user.id))
						.returning({ role: users.role });
					session.user = { ...session.user, ...updatedUser[0] };
					return session;
				} else {
					// Manually retrieve the user role from the DB because the stupid adaptor doesn't do it automatically it should.
					const dbUser = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
					session.user = { ...session.user, ...dbUser[0] };
					return session;
				}
			};

			return getSessionWithRole(user as AdapterUser & { role: string });
		}
	}
});