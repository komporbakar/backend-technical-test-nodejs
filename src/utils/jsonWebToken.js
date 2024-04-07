import jwt from 'jsonwebtoken'
import { config } from '../config'

export const createToken = (payload) => {
    return {
        id: payload.id,
        email: payload.email
    }
}

export const createJWT = ({payload}) => {
    const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES
    })
    return token
}


export const verifyJWT = ({token}) => jwt.verify(token, config.JWT_SECRET)