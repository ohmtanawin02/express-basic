import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error))

export default mongoose
