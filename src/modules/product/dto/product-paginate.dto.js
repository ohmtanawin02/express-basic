import Joi from 'joi'

const PaginateProductDto = Joi.object({
  sort: Joi.string().default('price'),
  sortOrder: Joi.string().default('DESC'),
  search: Joi.string().optional(),
  status: Joi.string().optional(),
  limit: Joi.number().default(25),
  page: Joi.number().default(1)
})

const buildQuery = (query) => {
  const {search} = query

  const regex = new RegExp(search, 'i')
  const status = query.status || { $ne: 'DELETED' }

  const builtQuery = {
    $or: [
      {
        name: {
          $regex: regex
        }
      }
    ],
    status: status
  }

  return builtQuery
}

export default {
  PaginateProductDto,
  buildQuery
}
