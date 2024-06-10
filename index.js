import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectToDB } from './database/db'
import { handleErrors } from './middlewares/errorHandler'
import { authRoutes } from './routes/auth-routes'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT

// helmet to secure app by setting http response headers
app.use(helmet());
app.use(morgan('tiny'))

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cors config
const corsOptions = {
  origin: ['http://localhost:5000'],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

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