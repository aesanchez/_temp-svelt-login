import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';
import { serialize } from 'cookie';

export const POST: RequestHandler = async ({request}) => {
  const { email, password } = await request.json();
  console.log(email, password)
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

  if (rows.length) {
    const authToken = serialize('authToken', email, { httpOnly: true, sameSite: 'lax', path: '/' });
    return { status: 200, headers: { 'set-cookie': authToken } };
  } else {
    return { status: 401 };
  }
};
