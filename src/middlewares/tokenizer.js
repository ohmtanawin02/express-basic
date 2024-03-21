import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import rolesEnum from '../commons/enum/roles.enum.js'

dotenv.config()

const SECRET = process.env.JWT_TOKEN

export const checkToken = (req, res, next) => {
  const token = req.header?.authorization?.split(' ')[1] || null
  const decoded = jwt.decode(token, SECRET)

  if (token && decoded.exp <= Date.now() / 1000) {
    return res
      .json({
        code: 401,
        message: 'token expired'
      })
      .status(401)
  }

  if (token && !Object.values(rolesEnum).some((role) => role === decoded.role)) {
    return res
      .json({
        code: 403,
        message: 'role unauthorized'
      })
      .status(403)
  }

  next()
}

export const decodedToken = (req) => {
  const token = req.headers?.authorization?.split(' ')[1] || null
  return token ? jwt.decode(token, SECRET) : null
}

export const adminAuthorizing = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1] || null
  const decoded = jwt.decode(token, SECRET)

  if (token && decoded.exp <= Date.now() / 1000) {
    return res
      .json({
        code: 401,
        message: 'token expired'
      })
      .status(401)
  }

  if (token && decoded.role !== rolesEnum.SUPER_ADMIN) {
    return res
      .json({
        code: 403,
        message: 'role unauthorized'
      })
      .status(403)
  }

  next()
}

export const createToken = (payload) => {
  if (payload.role === rolesEnum.API) {
    return jwt.sign(payload, SECRET, { expiresIn: '1s' })
  }
  return jwt.sign(payload, SECRET, { expiresIn: '1d' })
}

export const apiAuthorizing = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1] || null
  let decoded
  jwt.verify(token, SECRET, { ignoreExpiration: true }, (err, decodedJwt) => {
    if (err) {
      throw new Error(err.message)
    }
    decoded = decodedJwt
  })

  if (token && decoded.role !== rolesEnum.API) {
    return res.status(403).json({
      success: false,
      message: 'role unauthorized'
    })
  }

  next()
}
