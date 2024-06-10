import express from 'express'
import { registerUser } from "../controllers/auth-controllers"
import { upload } from "../utils"

export const authRoutes = express.Router()

authRoutes.post('/user-register', upload.single('profilePics'), registerUser)
