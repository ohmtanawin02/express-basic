import statusEnum from '../../../commons/enum/status.enum.js'
import responsePaginate from '../../../utils/response-paginate.js'
import responseSuccess from '../../../utils/response-success.js'
import DuplicateProductCategoryError from '../exception/duplicate-product-category.error.js'
import NotFoundProductCategoryError from '../exception/not-found-product-category.error.js'
import ProductCategoryService from '../service/product-category.service.js'

const ProductCategoryController = {
  create: async (req, res, next) => {
    try {
      const { name } = req.body
      const productCategoryExists = await ProductCategoryService.findOne({
        name: name,
        status: statusEnum.ACTIVE
      })
      if (productCategoryExists) {
        throw new DuplicateProductCategoryError(`Product Category with name "${name}" already exists.`)
      }
      const { id, email } = req._requestUser
      const created = await ProductCategoryService.create({
        name: name,
        createdById: id,
        createdByEmail: email
      })
      responseSuccess(res, 201, created)
    } catch (error) {
      next(error)
    }
  },

  paginate: async (req, res, next) => {
    try {
      const { page, limit } = req.query
      const productCategories = await ProductCategoryService.paginate(req.query)
      responsePaginate(res, 200, productCategories, page, limit, productCategories.totalPages)
    } catch (error) {
      next(error)
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const productCategory = await ProductCategoryService.findOne({
        _id: id,
        status: statusEnum.ACTIVE
      })

      if (!productCategory) {
        throw new NotFoundProductCategoryError(`Product category with ${id} not found.`)
      }
      return responseSuccess(res, 200, productCategory)
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const productCategory = await ProductCategoryService.findOne({
        _id: id,
        status: statusEnum.ACTIVE
      })
      if (!productCategory) {
        throw new NotFoundProductCategoryError(`Product category with "${id}" not found.`)
      }
      const { name } = req.body
      const productCategoryExists = await ProductCategoryService.findOne({
        _id: { $ne: id },
        name: name
      })
      if (productCategoryExists) {
        throw new DuplicateProductCategoryError(`Product category with name "${name}" already exists.`)
      }
      const { id: updatedById, email } = req._requestUser

      const updated = await ProductCategoryService.update({_id:+id}, {
        name: name,
        updatedById,
        updatedByEmail: email
      })
      return responseSuccess(res, 200, updated)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params
      const productCategory = await ProductCategoryService.findOne({
        _id: id,
        status: statusEnum.ACTIVE
      })
      if (!productCategory) {
        throw new NotFoundProductCategoryError(`Product category with "${id}" not found.`)
      }
      await ProductCategoryService.softDelete({ _id: id })
      return res.status(200).json({ success: true, message: 'Deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default ProductCategoryController
