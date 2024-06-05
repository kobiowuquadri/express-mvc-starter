// Authorise User
import jwt from 'jsonwebtoken'

export const verify = (req, res, next) => {
  
    try {
      const token = req.headers['authorization'].split(' ')[1]
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
          req.user = decodedToken.id
          next()
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }  

