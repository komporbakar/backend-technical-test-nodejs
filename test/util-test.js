import bcrypt from 'bcrypt';
import { dbPool } from "../src/database";
import { createJWT } from '../src/utils/jsonWebToken';

export class UserTest {
    static async delete(){
        await dbPool.query(`DELETE FROM users WHERE email = 'test@test.com'`)
        await dbPool.query(`DELETE FROM balance WHERE user_id = (SELECT id FROM users WHERE email = 'test@test.com')`)
        
    }

    static async create(){
        const password = await bcrypt.hash("rahasia123", 10)
        await dbPool.query(`INSERT INTO users (email, first_name, last_name, password) VALUES ('test@test.com', 'test', 'aja', '${password}')`)

        
        const user = await dbPool.query(`SELECT * FROM users WHERE email = 'test@test.com'`);
        await dbPool.query(`INSERT INTO balance (user_id, amount) VALUES (${user[0][0].id}, 0)`)
        const token = createJWT({ payload: {id: user[0][0].id, email: user[0][0].email} });
        
        return token;
    }

   
}