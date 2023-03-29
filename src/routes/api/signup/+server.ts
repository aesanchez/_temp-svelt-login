import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';
import { serialize } from 'cookie';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({request, response}) => {
	const { email, password } = await request.json();
	const passwordHash = await createPasswordHash(password);
	console.log(passwordHash);
	console.log(email, password)
	const conn = await getConnection();
	const [rows] = await conn.execute('SELECT email, cuil FROM users WHERE email = ?', [email, password]);

	console.log(rows);
	if (rows.length == 0) {
		const id = uuidv4();
		const result = await conn.execute('INSERT INTO users (id, email, password_hash, cuil) VALUES (?, ?, ?, ?);', [id, email, passwordHash, '00000000000']);
		console.log(id, result);
	} else {
	}

	// set the cookie wherever you have to set it

	/*if (rows.cuil) {
		response.redirect('/dashboard');
		return
	}*/

	/*if (rows.length) {
		const authToken = serialize('authToken', email, { httpOnly: true, sameSite: 'lax', path: '/' });
		return { status: 200, headers: { 'set-cookie': authToken } };
	} else {
		return { status: 401 };
	}*/
};

async function createPasswordHash(password: String): Promise<String> {
	return bcrypt.hash(password, 10);
}
