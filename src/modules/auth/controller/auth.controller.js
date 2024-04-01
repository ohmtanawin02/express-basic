import UserService from '../../user/service/user.service.js'
import dotenv from 'dotenv'
import AuthService from '../service/auth.service.js'
import InvalidLoginError from '../exception/validate.error.js'

dotenv.config()

const authService = new AuthService(process.env.JWT_SECRET_ADMIN)

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const userData = await UserService.findOne({ email })
      const comparePassword = await authService.comparePasswords(password,userData.password)

      if (!userData || !comparePassword) {
        throw new InvalidLoginError( 'Invalid email or password.' )
      }

      const payload = {
        email: userData.email,
        firstName:userData.firstName,
        lastName:userData.lastName,
        id: userData.id
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
