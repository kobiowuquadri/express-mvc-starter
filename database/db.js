import mongoose from "mongoose"
import { config } from "../config/config.js"

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongodb.url)
    console.log('Connected to the database Successfully.')
  }
  catch(err){
    console.log(err.message)
  }
}