import type { RequestHandler } from '@sveltejs/kit';
import { getConnection } from '$lib/db';

export const POST: RequestHandler = async (request) => {
  const { cuil } = request.body as { cuil: string };
  const email = request.locals.authToken;
  const conn = await getConnection();
  const [result] = await conn.execute('UPDATE users SET cuil = ? WHERE email = ?', [cuil, email]);

  if (result.affectedRows) {
    return { status: 200 };
  } else {
    return { status: 500 };
  }
};
