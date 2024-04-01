import { Router } from "express"
import { createValidator } from "express-joi-validation"
import productCategoryPaginate from "./dto/product-category-paginate.js"
import ProductCategoryController from "./controller/product-category.controller.js"
import authMiddleware from "../../middlewares/auth.middleware.js"
import CreateProductCategoryDto from "./dto/create-product-category.dto.js"
import UpdateProductCategoryDto from "./dto/update-product-category.dto.js"


const router = Router()
const validator = createValidator({})

router.get('/', validator.query(productCategoryPaginate.PaginateProductCategoryDto),ProductCategoryController.paginate)
router.post('/',  validator.body(CreateProductCategoryDto), ProductCategoryController.create)
router.get('/:id',  ProductCategoryController.findOne)
router.put('/:id', validator.body(UpdateProductCategoryDto), ProductCategoryController.update)
router.delete('/:id', ProductCategoryController.delete)

export default router