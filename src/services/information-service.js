import { dbPool } from "../database";

export class InformationService {
    static async getBanner() {
       const result = await dbPool.query(`SELECT banner_name, banner_image, description FROM banner`)
       return result[0]
    }

    static async getService() {
        const result = await dbPool.query(`SELECT service_code, service_name, service_icon, service_tariff FROM services`)
        return result[0]
    }
}