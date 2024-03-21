import UserService from '../../user/service/user.service.js'
import dotenv from 'dotenv'
import AuthService from '../service/auth.service.js'

dotenv.config()

const authService = new AuthService(process.env.JWT_SECRET_ADMIN)

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const userData = await UserService.findOne({ email })

      if (!userData || !(await authService.comparePasswords(password, userData.password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' })
      }

      const payload = {
        email: userData.email,
        id: userData._id
      }

      const accessToken = authService.generateAccessToken(payload, {
        expiresIn: '7d'
      })

      res.json({
        success: true,
        accessToken,
        tokenExpire: new Date().setDate(new Date().getDate() + 7)
      })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
