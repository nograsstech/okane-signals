// src/routes/+layout.server.js
export const load = async (event) => {
	const session = await event.locals.getSession();
	return {
		session
	};
};
