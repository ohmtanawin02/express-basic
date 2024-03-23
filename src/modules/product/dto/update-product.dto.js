import Joi from 'joi'

const UpdateProductDto = Joi.object({
  imageUrl:Joi.string().optional(),
  name: Joi.string().required(),
  detail: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.number().required()
})

export default UpdateProductDto
