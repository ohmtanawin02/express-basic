import statusEnum from '../../../commons/enum/status.enum.js'
import productCategoryPaginate from '../dto/product-category-paginate.js'
import ProductCategoryModel from '../schema/product-category.schema.js'

const ProductCategoryService = {
  create (payload) {
    return ProductCategoryModel.create(payload)
  },
  getAll (query) {
    return ProductCategoryModel.find(query)
  },
  async paginate (query) {
    const options = {
      page: Number(query.page),
      limit: Number(query.limit),
      sort: {}
    }

    if (query.sortBy && query.sortOrder) {
      options.sort = { [query.sortBy]: query.sortOrder }
    }

    const queryParams = productCategoryPaginate.buildQuery(query)

    const productCategories = await ProductCategoryModel.paginate(queryParams, options)

    return productCategories
  },

  findOne (query) {
    return ProductCategoryModel.findOne(query)
  },

  async update (id, body) {
    const updatedProductCategory = await ProductCategoryModel.findOneAndUpdate(id, body, { new: true })
    return updatedProductCategory
  },

  async softDelete (query) {
    const deletedProductCategory = await ProductCategoryModel.updateOne(query, { status: statusEnum.DELETED }, { new: true })
    return deletedProductCategory
  }
}

export default ProductCategoryService

