// @ts-ignore
import { sign, verify } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { JWT_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';

const COOKIE_ID='token';

export function authenticate(userId: String): Response {
    const jwt = sign({ id: userId }, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 });
    const serialized = serialize('token', jwt, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365,
        path: '/dashbaord',
    });

    return new Response(null, {
        status: 302,
        headers: {
            'location': '/dashboard',
            'set-cookie': serialized,
        },
    });
}

export async function isAuthenticated(cookies: Cookies): Promise<Boolean> {
	const jwt = cookies.get(COOKIE_ID);
	return jwt && verify(jwt, JWT_SECRET);
}
