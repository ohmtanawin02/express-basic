import Joi from 'joi'

const UpdateProductCategoryDto = Joi.object({
  name: Joi.string().required()
})

export default UpdateProductCategoryDto
