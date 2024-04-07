import { TrasnsactionService } from "../services/transaction-service"

export class TransactionController{
    static async getBalance(req, res, next){
        try {
            const response = await TrasnsactionService.getBalance(req)
            return res.status(200).json({
                status: 0,
                message: "Get Balance Berhasil",
                data: {
                    balance: response.amount ?? 0
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async topupBalance (req, res, next){
        try {
            const request = req.body
            const response = await TrasnsactionService.topupBalance(req, request)
            return res.status(200).json({
                status: 0,
                message: "Top up Balance Berhasil",
                data: {
                    balance: response.amount
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTransaction (req, res, next){
        try {
            const request = req.body
            const response = await TrasnsactionService.createTransaction(req, request)
            return res.status(200).json({
                status: 0,
                message: "Transaksi berhasil",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getTransaction (req, res, next){
        try {
            const request = req.query
            const response = await TrasnsactionService.getTransaction(req, request)
            return res.status(200).json({
                status: 0,
                message: "Get History Berhasil",
                data: {
                    offset: request.offset ? request.offset : 0,
                    limit: response.length,
                    records: response
                }
            })
        } catch (error) {
            next(error)
        }
    }
}