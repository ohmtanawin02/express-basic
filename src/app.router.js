import express from 'express'
import ProductRouter from '../src/modules/product/product.route.js'
import UserRouter from '../src/modules/user/user.route.js'
import AuthRouter from './modules/auth/auth.route.js'

const app = express()
app.disable('x-powered-by')

app.use('/product', ProductRouter)
app.use('/user', UserRouter)
app.use('/auth', AuthRouter)

export default app
