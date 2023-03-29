import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';
// @ts-ignore
import bcrypt from 'bcrypt';
import { authenticate } from '$lib/auth';

export const POST: RequestHandler = async ({request}) => {
	const { email, password } = await request.json();
	const conn = await getConnection();
	const [rows]: any[] = await conn.execute('SELECT id, email, password_hash, cuil FROM users WHERE email = ?', [email]);

	// if the user is not found in the database we redirect to signup
	console.log(rows);
	if (rows.length == 0) {
		return new Response(null, {
			status: 302,
			headers: {
				'location': '/signup',
			},
		});
	} 

	// if the user's password does not match we simply return a 401.
	const user = rows[0];
	const validPassword = await bcrypt.compare(password, user.password_hash)
	if (!validPassword) {
		return new Response(JSON.stringify({error: 'invalid credentials'}), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return authenticate(user.id)
};
