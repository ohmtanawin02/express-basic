import Joi from 'joi'

const CreateUserDto = Joi.object({
  imageUrl: Joi.string().allow('').optional(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

export default CreateUserDto
