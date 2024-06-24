import bcrypt from 'bcryptjs'
import { passwordValidator, sanitizePhoneNumber, cloudinary, sendEmail } from '../utils/index.js'
import { handleErrors } from '../middlewares/errorHandler.js'
import { authModel } from '../models/auth-model.js'
import jwt from 'jsonwebtoken'

const period = 60 * 60 * 24 * 3
const baseUrl = 'http://localhost:5000/api/v1/auth'


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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: 'user with the email or password not found' })
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Password' })
    }
    jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: '1hr' },
      async (err, token) => {
        if (err) {
          throw err
        }
        res.cookie('userId', user._id, { maxAge: period, httpOnly: true })
        res.status(200).json({
          success: true,
          message: 'User Login Successfully',
          user,
          token
        })
      }
    )
  } catch (error) {
    handleErrors(error, res)
  }
}


export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body
    // check if email exists
    const existingEmail = await authModel.findOne({email})
    if(!existingEmail){
      return res.status(404).json({success: false, message: "User with this email does not exist."})
    }
    const token = jwt.sign({email : existingEmail.email, id: existingEmail._id}, process.env.SECRET, {
      expiresIn: "5m"
    })
    const link = `${baseUrl}/reset-password/${existingEmail._id}/${token}`

    const subject = 'Reset Your Password'
    const text = 'Reset Your Password!'
    const template = 'forgetPassword'
    const context = {
      resetLink: link
    }    
    await sendEmail(email, text, subject, template, context)
    res.status(200).json({success: true, message: "Reset link successfully sent, kindly check your email to set a new password"})
  }
  catch(error){
    handleErrors(error, res)
  }
}

export const getResetPassword = async (req, res) => {
try {
  const {id, token} = req.params
  const exisintigUser = await authModel.findOne({_id: id})
  if(!exisintigUser){
    return res.status(404).json({success: false, message: "User does not exists."})
  }
  jwt.verify(token, process.env.SECRET) 
  res.status(200).json({success: true, message: "Reset password link is valid."})
}
catch(error){
  handleErrors(error, res)
}
}

export const postResetPassword = async (req, res) => {
  try {
  const {id, token} = req.params
  const { password } = req.body
  const exisintigUser = await authModel.findOne({_id: id})
  if(!exisintigUser){
    return res.status(404).json({success: false, message: "User does not exists."})
  }
  jwt.verify(token, process.env.SECRET) 
  const hashPassword = await bcrypt.hash(password, 10)  
  await authModel.updateOne({_id: id}, {
    $set : {
      password: hashPassword
    }
  })
  res.status(201).json({success: true, message: "Password changed successfully"})
}
catch(error){
  handleErrors(error, res)
}
}
