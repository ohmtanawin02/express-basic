import express from 'express'
import UserRouter from '../src/modules/user/user.route.js'
import AuthRouter from './modules/auth/auth.route.js'
import ProductRouter from '../src/modules/product/product.route.js'
import ProductCategoryRouter from '../src/modules/product-category/product-category.route.js'
import UploadLocalRouter from '../src/modules/upload-local/upload-local.router.js'


const app = express()
app.disable('x-powered-by')

app.use('/user', UserRouter)
app.use('/auth', AuthRouter)
app.use('/product', ProductRouter)
app.use('/product-category', ProductCategoryRouter)
app.use('/upload-local', UploadLocalRouter)

export default app
