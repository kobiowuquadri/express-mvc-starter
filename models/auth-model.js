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
    minLength: 6
  }
})

export const authModel = mongoose.model('authModel', authSchema)