// Authorise User
import jwt from 'jsonwebtoken'

export const authorizedUser = (req, res, next) => {
  
    try {
      const authHeader = req.headers['authorization']
      // check if the authorization header exists
      if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authorization header is missing!' })
      }

      const token = authHeader.split(' ')[1]
      // console.log(token)
      if (!token) {
        return res
          .status(404)
          .json({ success: false, message: 'Token not found!' })
      }
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ auth: false, message: 'Unauthorized' })
        }
        // console.log(decodedToken)
        if (decodedToken) {
          req.user = decodedToken
          next()
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }  
