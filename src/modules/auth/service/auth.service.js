import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

class AuthService {
  constructor (secret) {
    this.secret = secret
  }

  generateAccessToken (payload, options = {}) {
    return jwt.sign(payload, this.secret, options)
  }

  async comparePasswords (password, hash) {
    return await bcrypt.compare(password, hash)
  }
}

export default AuthService
