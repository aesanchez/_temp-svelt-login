import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  });
}
