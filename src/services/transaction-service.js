import { dbPool } from "../database";
import { ResponseError } from "../error/response-error";
import { convertToPlus7 } from "../utils/convertTime";
import { datenow } from "../utils/date";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";

export class TrasnsactionService {
  static async getBalance(req) {
    const result = await dbPool.query(
      `SELECT amount FROM balance WHERE user_id = ?`,
      [req.user.id]
    );

    return result[0][0];
  }

  static async topupBalance(req, request) {
    const topupRequest = Validation.validate(
      TransactionValidation.TOPUP,
      request
    );

    const invoice = "INV" + datenow() + "-" + Math.floor(Math.random() * 10000);

    const transaction = await dbPool.query(
      `INSERT INTO transaction (user_id, invoice_number, transaction_type, description, total_amount, created_on) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        invoice,
        "TOPUP",
        "Top Up Balance",
        request.top_up_amount,
        new Date(),
      ]
    );

    await dbPool.query(
      `UPDATE balance SET amount = amount + ? WHERE user_id = ?`,
      [topupRequest.top_up_amount, req.user.id]
    );

    const result = await dbPool.query(
      `SELECT amount FROM balance WHERE user_id = ?`,
      [req.user.id]
    );
    return result[0][0];
  }

  static async createTransaction(req, request) {
    const transactionRequest = Validation.validate(
      TransactionValidation.TRANSAKSI,
      request
    );

    const invoice = "INV" + datenow() + "-" + Math.floor(Math.random() * 10000);

    const checkService = await dbPool.query(
      `SELECT * FROM services WHERE service_code = ?`,
      [transactionRequest.service_code]
    );
    if (checkService[0].length < 1) {
      throw new ResponseError(400, 102, "Service atau Layanan tidak ditemukan");
    }

    const checkBalance = await dbPool.query(
      `SELECT amount FROM balance WHERE user_id = ?`,[req.user.id]
    )

     if((checkBalance[0][0].amount - checkService[0][0].service_tariff) < 0){
        throw new ResponseError(400, 102, "Saldo anda tidak mencukupi")
    }
     await dbPool.query(
      `UPDATE balance SET amount = amount - ? WHERE user_id = ?`, [checkService[0][0].service_tariff, req.user.id],
    )   

    await dbPool.query(
      `INSERT INTO transaction (user_id, invoice_number, transaction_type , description, total_amount, created_on) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        invoice,
        "PAYMENT",
        checkService[0][0].service_name,
        checkService[0][0].service_tariff,
        new Date(),
      ]
    );

    const getTransaction = await dbPool.query(
      `SELECT * FROM transaction WHERE invoice_number = ?`,[invoice]
    )

    const data = getTransaction[0][0]

    return {
      invoice_number: data.invoice_number,
      service_code: transactionRequest.service_code,
      service_name: data.description,
      transaction_type: data.transaction_type,
      total_amount: data.total_amount,
      created_on: convertToPlus7(data.created_on),
    };
  }

  static async getTransaction(req, request) {
    const limit = request.limit;
    const offset = request.offset;
    const result = await dbPool.query(
      `SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transaction WHERE user_id = ? ORDER BY created_on DESC ${
        limit ? `LIMIT ${limit}` : ""
      } ${offset ? `OFFSET ${offset}` : ""} `,
      [req.user.id]
    );
    result[0].forEach((item) => {
      item.created_on = convertToPlus7(item.created_on);
    })
    result[0].offset = offset;
    return result[0];
  }
}
