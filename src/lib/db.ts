import mysql from 'mysql2/promise';

import {
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_NAME
} from '$env/static/private';

export async function getConnection() {
  return await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });
}
