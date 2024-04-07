import { z } from "zod";


export class TransactionValidation {
    static TOPUP = z.object({
        top_up_amount: z.number().positive()
    });
    static TRANSAKSI = z.object({
        service_code: z.string().min(1)
    });
}