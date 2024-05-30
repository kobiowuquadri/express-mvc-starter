import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectToDB } from './database/db'

const app = express()
const port = process.env.PORT

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// connect to database
connectToDB()


app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})