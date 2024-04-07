import { UserService } from "../services/user-service"


export class UserController {
    static async register(req, res, next){
        try {
            const request = req.body
            const response = await UserService.register(request)
            return res.status(200).json({
                status: 0,
                message: "Registrasi berhasil silahkan login",
                data: null
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const request = req.body
            const response = await UserService.login(request)
            return res.status(200).json({
                status: 0,
                message: "Login Berhasil",
                data: {
                    token: response
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const response = await UserService.getUser(req)
            return res.status(200).json({
                status: 0,
                message: "Sukses",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const request = req.body
            const response = await UserService.updateProfile(req, request)
            return res.status(200).json({
                status: 0,
                message: "Update Pofile berhasil",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfileImage(req, res, next) {
        try {
            const request = req.file
            const response = await UserService.updateProfileImage(req, request)
            return res.status(200).json({
                status: 0,
                message: "Update Profile Image berhasil",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}