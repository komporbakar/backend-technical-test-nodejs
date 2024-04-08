import { verifyJWT } from "../utils/jsonWebToken";
import { logging } from "../utils/logging";

export const authenticate = async(req, res, next) => {
    try {
        let token;
        const authorization = req.headers.authorization

        if(authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1]
        }
        if(!token){
          return res.status(401).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        })
        }
        const payload = verifyJWT({token})
        if(!payload){
            return res.status(401).json({
                status: 108,
                message: 'Token tidak tidak valid atau kadaluwarsa',
                data: null
            })
        }
        logging.debug(payload)
        req.user = {
            id: payload.id,
            email: payload.email
        }

        next()
    } catch (error) {
        next(error)
       return  res.status(401).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        })
    }
}

