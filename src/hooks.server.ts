import type { Handle } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	switch(event.url.pathname) {
		case "/":
			break;
		case "/api/login":
		case "/api/signup":
		case "/login":
		case "/signup":
			if (await isAuthenticated(event.cookies)) {
				return new Response(null, { status: 302, headers: {location: '/dashboard'}});
			}
			break;
		default:
			const authenticated = await isAuthenticated(event.cookies) 
			if (!authenticated) {
				return new Response(null, { status: 302, headers: {location: '/login'}});
			}
			break;
	}

	return await resolve(event);
};
