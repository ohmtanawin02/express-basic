import statusEnum from '../../../commons/enum/status.enum.js'
import responsePaginate from '../../../utils/response-paginate.js'
import responseSuccess from '../../../utils/response-success.js'
import DuplicateProductError from '../exception/duplicate-product.error.js'
import NotFoundProductError from '../exception/not-found-product.error.js'
import ProductService from '../service/product.service.js'

const ProductController = {
  create: async (req, res, next) => {
    try {
      const { imageUrl, name, detail, price, category } = req.body
      const product = await ProductService.findOne({
        name: name,
        status: statusEnum.ACTIVE
      })
      if (product) {
        throw new DuplicateProductError(`Product with name "${name}" already exists.`)
      }
      const { id, email } = req._requestUser
      const created = await ProductService.create({
        imageUrl: imageUrl,
        name: name,
        price: price,
        detail: detail,
        category: category,
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
      const products = await ProductService.paginate(req.query)
      responsePaginate(res, 200, products, page, limit, products.totalPages)
    } catch (error) {
      next(error)
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await ProductService.findOne({
        _id: id,
        status: statusEnum.ACTIVE
      })

      if (!product) {
        throw new NotFoundProductError(`Product with ${id} not found.`)
      }
      return responseSuccess(res, 200, product)
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await ProductService.findOne({ _id: id })
      if (!product) {
        throw new NotFoundProductError(`Product with "${id}" not found.`)
      }
      const { imageUrl, name, detail, price, category } = req.body
      const productExists = await ProductService.findOne({
        _id: { $ne: id },
        name: name
      })
      if (productExists) {
        throw new DuplicateProductError(`Product with name "${name}" already exists.`)
      }
      const { id: updatedById, email } = req._requestUser

      const updated = await ProductService.update(id, {
        imageUrl: imageUrl,
        name: name,
        detail: detail,
        price: price,
        category: category,
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
      const product = await ProductService.findOne({ _id: id })
      if (!product) {
        throw new NotFoundProductError(`Product with ${id} not found.`)
      }
      await ProductService.softDelete({ _id: id })
      return res.status(200).json({ success: true, message: 'Deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default ProductController
