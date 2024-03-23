import Joi from 'joi'

const CreateProductDto = Joi.object({
  imageUrl:Joi.string().optional(),
  name: Joi.string().required(),
  detail:Joi.string().optional().default(''),
  price: Joi.number().required(),
  category: Joi.number().required()
})

export default CreateProductDto

