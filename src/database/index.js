
import mysql from 'mysql2';
import { config } from '../config';

export const dbPool =  mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
}).promise();



