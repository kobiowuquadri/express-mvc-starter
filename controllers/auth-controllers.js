import bcrypt from 'bcryptjs'
import { passwordValidator, verifyPhoneNumber, sanitizePhoneNumber } from '../utils'
import { handleErrors } from '../middlewares/errorHandler'
import { authModel } from '../models/auth-model'
import { cloudinary, sendEmail } from '../utils'
import path from 'path'


export const registerUser = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body    

    const existingUser = await authModel.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists.' })
    }
    
   // Validate phone number
    const sanitizedPhone = sanitizePhoneNumber(phoneNumber)
    if (!sanitizedPhone.status) {
      return res.status(400).json({ success: false, message: sanitizedPhone.message })
    }

    // Validate password
    if (!passwordValidator(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one symbol (@#$%^&*!), and have a minimum length of 8 characters'
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)  

    let imageUrl = authModel.schema.path('profilePics').defaultValue
    if (req.file && req.file.path){
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'express-mvc-starter'
      })
  
       imageUrl = uploadRes.secure_url
    }
    

    const newUser = authModel({
      email,
      password: hashPassword,
      phoneNumber: sanitizedPhone.phone,
      profilePics: imageUrl
    }) 

    const subject = 'Welcome to New Comapany'
    const text = 'Thank you for registering with us!'
    const template = 'welcomeMessage'    

    const savedUser = await newUser.save()
    await sendEmail(email, subject, text, template)
    res
      .status(201)
      .json({ success: true, message: 'Account Created Successfully', savedUser })
  } catch (error) {
    handleErrors(error, res)
  }
}

