import multer from "multer";
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
    
    if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        cb(null, true)
    } else {
        
        cb( new ResponseError(400, 102, 'Format Image tidak sesuai'), false)
    }
}

export const upload = multer({storage, fileFilter: filter, limits: {fileSize: 2000000}}).single('image')