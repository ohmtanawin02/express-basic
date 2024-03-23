import { Router } from 'express'
import ProductController from './controller/product.controller.js'
import { createValidator } from 'express-joi-validation'
import productPaginateDto from './dto/product-paginate.dto.js'
import UpdateProductDto from './dto/update-product.dto.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
import CreateProductDto from './dto/create-product.dto.js'

const router = Router()
const validator = createValidator({})

router.get('/', validator.query(productPaginateDto.PaginateProductDto), ProductController.paginate)
router.get('/export', validator.query(productPaginateDto.PaginateProductDto), ProductController.exportProductXlsx)
router.post('/', authMiddleware, validator.body(CreateProductDto), ProductController.create)
router.get('/:id', authMiddleware, ProductController.findOne)
router.put('/:id', validator.body(UpdateProductDto), ProductController.update)
router.delete('/:id', ProductController.delete)

export default router
