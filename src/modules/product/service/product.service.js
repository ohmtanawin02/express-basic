import ProductModel from '../schema/product.schema.js'
import productPaginateDto from '../dto/product-paginate.dto.js'
import statusEnum from '../../../commons/enum/status.enum.js'

const ProductService = {
  create (payload) {
    return ProductModel.create(payload)
  },
  getAll (query) {
    return ProductModel.find(query)
  },

  async paginate (query) {
    const options = {
      page: Number(query.page),
      limit: Number(query.limit),
      sort: {},
      populate: {
        path: 'category',
        select: 'name'
      }
    }

    if (query.sortBy && query.sortOrder) {
      options.sort = { [query.sortBy]: query.sortOrder }
    }

    const queryParams = productPaginateDto.buildQuery(query)

    const products = await ProductModel.paginate(queryParams, options)
    return products
  },
  
  findOne (query) {
    return ProductModel.findOne(query).populate({ path: 'ProductCategory' })
  },

  async update (id, body) {
    const updatedProduct = await ProductModel.findOneAndUpdate(id, body, { new: true })
    return updatedProduct
  },

  async softDelete (query) {
    const deletedProduct = await ProductModel.updateOne(query, { status: statusEnum.DELETED }, { new: true })
    return deletedProduct
  }
}

export default ProductService
