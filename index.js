import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectToDB } from './database/db'
import { handleErrors } from './middlewares/errorHandler'
import { authRoutes } from './routes/auth-routes'
import helmet from 'helmet'

const app = express()
const port = process.env.PORT

// helmet to secure app by setting http response headers
app.use(helmet());

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// routes
app.use('/api/v1/auth', authRoutes)

// home
app.get('/', (req, res) => {
  res.json({success: true, message: 'Backend Connected Successfully'})
})

// error handler
app.use(handleErrors)

// connect to database
connectToDB()


app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})