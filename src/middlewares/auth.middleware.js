import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1] || null
    const secret = process.env.JWT_SECRET_ADMIN
    const session = req.headers?.session || null

    // const findSession = await SestionService.findOne({
    //   token,
    //   session
    // })
    // const currentDate = new Date()
    // const sestionDate = new Date(findSession?.date)

    // if (!findSession) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Token has been logout'
    //   })
    // }
    // if (sestionDate < currentDate) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Token expired'
    //   })
    // }

    jwt.verify(token, secret, {}, async (err, decodedJwt) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }
      req.user = decodedJwt
      req.session = session
      next()
    })
  } catch (error) {
    error.status = 500
    next(error)
  }
}

export default authMiddleware
