import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectToDB } from './database/db'
import { handleErrors } from './middlewares/errorHanlder'

const app = express()
const port = process.env.PORT

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(handleErrors)


// connect to database
connectToDB()


app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})