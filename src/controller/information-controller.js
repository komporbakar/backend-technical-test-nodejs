import { InformationService } from "../services/information-service"


export class InformationController {
    static async getBanner(req, res, next){
        try {
            const response = await InformationService.getBanner()
            return res.status(200).json({
                status: 0,
                message: "Sukses",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getService(req, res, next){
        try {
            const response = await InformationService.getService()
            return res.status(200).json({
                status: 0,
                message: "Sukses",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}