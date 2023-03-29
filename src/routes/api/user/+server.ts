import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';

export const GET: RequestHandler = async (request) => {
  const email = request.locals.authToken;
  if (!email) {
    return { status: 401 };
  }

  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT email, cuil FROM users WHERE email = ?', [email]);

  if (rows.length) {
    return { body: rows[0] };
  } else {
    return { status: 404 };
  }
};
