import Joi from 'joi'

const UpdateProductDto = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required()
})

export default UpdateProductDto
