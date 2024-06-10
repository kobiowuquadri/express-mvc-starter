import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectToDB } from './database/db'
import { handleErrors } from './middlewares/errorHandler'
import { authRoutes } from './routes/auth-routes'

const app = express()
const port = process.env.PORT

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routes
app.use('/api/v1/auth', authRoutes)

// error handler
app.use(handleErrors)

// connect to database
connectToDB()


app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})