import express from 'express'
import { InformationController } from '../controller/information-controller'
import { TransactionController } from '../controller/transaction-controller'
import { UserController } from '../controller/user-controller'
import { authenticate } from '../middleware/auth-middleware'
import { upload } from '../middleware/multer'

export const router = express.Router()
router.use(authenticate)
router.get('/profile', UserController.getUser)
router.put('/profile/update', UserController.updateProfile)


router.put('/profile/image', upload,  UserController.updateProfileImage)

//Service
router.get('/banner', InformationController.getBanner)
router.get('/services', InformationController.getService)

//Transaction
router.get('/balance', TransactionController.getBalance)
router.post('/topup', TransactionController.topupBalance)
router.post('/transaction', TransactionController.createTransaction)
router.get('/transaction/history', TransactionController.getTransaction)
