import dotenv from 'dotenv'
dotenv.config()

// MongoDB URL
const db_path = 'Express-MVC-Starter'

const MONGODB_USERNAME = process.env.MONGODB_USERNAME || ''
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || ''
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@atlascluster.0d2q4pl.mongodb.net/${db_path}`

const PORT = process.env.PORT ? Number(process.env.PORT) : 1337

export const config = {
    server: {
        port : PORT
    },
    mongodb : {
        url : MONGODB_URL
    }
}