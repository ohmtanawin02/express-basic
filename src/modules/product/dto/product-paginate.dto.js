import Joi from 'joi'

const PaginateProductDto = Joi.object({
  sort: Joi.string().default('price'),
  sortOrder: Joi.string().default('DESC'),
  search: Joi.string().optional().allow(''),
  status: Joi.string().optional(),
  limit: Joi.number().default(25),
  page: Joi.number().default(1),
  productIds: Joi.array().items(Joi.number()).allow(null)
})

const buildQuery = (query) => {
  const { search, productIds, status } = query

  const regex = new RegExp(search, 'i')

  const builtQuery = {
    $or: [{ name: { $regex: regex } }],
    ...(productIds ? { _id: { $in: productIds } } : {}),
    status: status || { $ne: 'DELETED' }
  }

  return builtQuery
}

export default {
  PaginateProductDto,
  buildQuery
}
