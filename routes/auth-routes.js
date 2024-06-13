import express from 'express'
import { registerUser, loginUser, forgetPassword, resetPassword , postResetPassword} from "../controllers/auth-controllers"
import { upload } from "../utils"


export const authRoutes = express.Router()

authRoutes.post('/user-register', upload.single('profilePics'), registerUser)
authRoutes.post('/user-login', loginUser)
authRoutes.post('/forget-password', forgetPassword)
authRoutes.get('/reset-password/:id/:token', resetPassword)
authRoutes.post('/reset-password/:id/:token', postResetPassword)
