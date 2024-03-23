import Joi from 'joi'

const CreateProductCategoryDto = Joi.object({
  name: Joi.string().required()
})

export default CreateProductCategoryDto

