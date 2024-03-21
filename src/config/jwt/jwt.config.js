import dotenv from 'dotenv'

dotenv.config()

const secretAdmin = process.env.JWT_SECRET_ADMIN

export default {
  secretAdmin
}
