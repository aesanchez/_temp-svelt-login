import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';
import { serialize } from 'cookie';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import bcrypt from 'bcrypt';
import { authenticate } from '$lib/auth';

export const POST: RequestHandler = async ({request}) => {
	const { email, password, cuil } = await request.json();
	const conn = await getConnection();
	const [rows] : any[] = await conn.execute('SELECT email FROM users WHERE email = ?', [email]);
	// TODO: check error
	
	if (rows.length == 0) {
		const id = uuidv4();
		const passwordHash = await createPasswordHash(password);
		const result = await conn.execute('INSERT INTO users (id, email, password_hash, cuil) VALUES (?, ?, ?, ?);', [id, email, passwordHash, cuil]);
		// TODO: check error
		return authenticate(id)
	}

	return new Response(JSON.stringify({error: 'email already signed up'}), {
		status: 400,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

async function createPasswordHash(password: String): Promise<String> {
	return bcrypt.hash(password, 10);
}
