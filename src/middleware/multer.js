import multer from "multer";
import { logging } from "../../lib/utils/logging";
import { ResponseError } from "../error/response-error";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null,req.user.id + '-' + new Date().getTime() + '-' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    logging.debug(cb)
    if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        if(file.size <= 2000000){
            cb(null, true)
        } else {
            cb( new ResponseError(400, 102, 'Format Image tidak sesuai'), false)
        }
    } else {
        
        cb( new ResponseError(400, 102, 'Format Image tidak sesuai'), false)
    }
}

export const upload = multer({storage, fileFilter: filter, limits: {fileSize: 2000000},}).single('image')