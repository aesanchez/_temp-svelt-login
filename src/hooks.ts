import { parse } from 'cookie';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = parse(request.headers.cookie || '');
  // request.locals.authToken = cookies.authToken;
  console.log("cookies\n", cookies);
  const response = await resolve(request);
  return response;
};
