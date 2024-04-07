
import mysql from 'mysql2';
import { config } from '../config';

export const dbPool =  mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
}).promise();

// try {
//     const [results, fields] = await connection.query('SELECT * FROM `users` WHERE `email` = ?',['test12@gmail.com'])
// console.log(
//     results
// )
// } catch (error) {
//     console.log(error)
// }


