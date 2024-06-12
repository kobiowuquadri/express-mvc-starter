import express from 'express'
import { registerUser, loginUser } from "../controllers/auth-controllers"
import { upload } from "../utils"

export const authRoutes = express.Router()

authRoutes.post('/user-register', upload.single('profilePics'), registerUser)
authRoutes.post('/user-login', loginUser)
