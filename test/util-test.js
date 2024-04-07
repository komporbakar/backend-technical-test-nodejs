import bcrypt from 'bcrypt';
import { dbPool } from "../src/database";
import { createJWT } from '../src/utils/jsonWebToken';

export class UserTest {
    static async delete(){
        await dbPool.query(`DELETE FROM users WHERE email = 'test@test.com'`)
        await dbPool.query(`DELETE FROM balance WHERE user_id = 1`)
        
    }

    static async create(){
        const password = await bcrypt.hash("rahasia123", 10)
        await dbPool.query(`INSERT INTO users (id, email, first_name, last_name, password) VALUES (1,'test@test.com', 'test', 'aja', '${password}')`)

        
        await dbPool.query(`INSERT INTO balance (user_id, amount) VALUES (1, 0)`)
        const token = createJWT({ payload: {id: 1, email: 'test@test.com'} });
        
        return token;
    }

    static async deleteTransaction(){
        await dbPool.query(`DELETE FROM transaction WHERE user_id = 1`)
    }

    static async topup(){
        await dbPool.query(`UPDATE balance SET amount = amount + 100000 WHERE user_id = 1`)
    }

    static async createTransaction(){
        
    }

   
}