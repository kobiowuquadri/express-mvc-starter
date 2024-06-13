import express from 'express'
import { registerUser, loginUser, forgetPassword, resetPassword } from "../controllers/auth-controllers"
import { upload } from "../utils"
import verify from 'jsonwebtoken/verify'

export const authRoutes = express.Router()

authRoutes.post('/user-register', upload.single('profilePics'), registerUser)
authRoutes.post('/user-login', loginUser)
authRoutes.post('/forget-password', forgetPassword)
authRoutes.post('/reset-password/:id/:token', resetPassword)
