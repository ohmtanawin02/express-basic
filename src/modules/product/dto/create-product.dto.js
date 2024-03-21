import Joi from 'joi'

const CreateProductDto = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required()
})

export default CreateProductDto
