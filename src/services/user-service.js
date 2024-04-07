import bcrypt from 'bcrypt';
import { dbPool } from "../database";
import { ResponseError } from "../error/response-error";
import { createJWT, createToken } from '../utils/jsonWebToken';
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async register(request) {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    const [rows, field] = await dbPool.query(
      "SELECT * FROM `users` WHERE `email` = ?",
      [registerRequest.email],
    );
    if(rows.length > 0){
        throw new ResponseError(400, 102, "Email sudah terdaftar")
    }

    registerRequest.password = await  bcrypt.hash(registerRequest.password, 10);
    const register =  await dbPool.query(
      `INSERT INTO users SET ?`,
      registerRequest
    );

    await dbPool.query(
      `INSERT INTO balance SET user_id = ? , amount = ?`,[register[0].insertId, 0]
    )

    if (!register) {
      throw new ResponseError(500, "Register failed");
    }

    return register;
  }
  static async login(request) {
    const loginRequest = Validation.validate(
      UserValidation.LOGIN,
      request
    );
    const [rows, field] = await dbPool.query(
      "SELECT * FROM `users` WHERE `email` = ?",
      [loginRequest.email],
    );
    if(rows.length < 1){
        throw new ResponseError(401, 103, "Username atau password salah")
    }

    const checkPassword = await bcrypt.compare(loginRequest.password, rows[0].password);
    if(!checkPassword){
        throw new ResponseError(401, 103, "Username atau password salah")
    }

    const token = createJWT({payload: createToken(rows[0])})

    return token
  }

  static async getUser(req) {
      const [rows] = await dbPool.query("SELECT * FROM `users` WHERE `email` = ?", [req.user.email])

      const data = {
        email: rows[0].email,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        profile_image: rows[0].profile_image
      }

      return data
  }

  static async updateProfile(req, request){
    const updateRequest = Validation.validate(
      UserValidation.UPDATE,
      request
    );
    const [rows, field] = await dbPool.query(
      `UPDATE users SET first_name = ?, last_name = ? WHERE email = ?`,
      [updateRequest.first_name, updateRequest.last_name, req.user.email]
    );
    if (!rows) {
      throw new ResponseError(500, "Update profile failed");
    }
  }

  static async updateProfileImage(req, request){
    const image = request ? `images/${req.user.id}-${request.filename}` : null

    const [rows, field] = await dbPool.query(
      `UPDATE users SET profile_image = ? WHERE email = ?`,
      [image, req.user.email]
    );
    if (!rows) {
      throw new ResponseError(500, "Update profile failed");
    }

    const result = await dbPool.query(`SELECT email, first_name, last_name, profile_image FROM users WHERE email = ?`, [req.user.email])

    // console.log(result[0][0])

    return result[0][0]
  }

}
