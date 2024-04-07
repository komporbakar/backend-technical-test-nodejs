import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        cb(null, true)
    } else {
        cb({
            message: "File type not allowed"
        }, false)
    }
}

export const upload = multer({storage, fileFilter: filter, limits: {fileSize: 2000000}}).single('image')