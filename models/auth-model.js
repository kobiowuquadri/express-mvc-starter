import mongoose from "mongoose";

const { Schema } = mongoose

const authSchema = Schema({
  email : {
    type: String,
    required: [true, "Please provide your email."],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide you password"],
    minLength: [6, "Please your password must not be less than 6 chracters."],
  },
  profilePics: {
    type: String,
    default: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1717845409~exp=1717846009~hmac=ad4ba572994aab89a1eecd54770c5b1313ef6dfd2e81e6a9f8d352309b7d2a2a"
  },
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export const authModel = mongoose.model('authModel', authSchema)