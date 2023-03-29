// @ts-ignore
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { JWT_SECRET } from '$env/static/private';

export function authenticate(userId: String): Response {
    const jwt = sign({ id: userId }, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 });
    const serialized = serialize('token', jwt, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
    });

    return new Response(null, {
        status: 302,
        headers: {
            'location': '/',
            'set-cookie': serialized,
        },
    });
}

