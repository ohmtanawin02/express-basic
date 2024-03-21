import Joi from 'joi'

const UpdateUserDto = Joi.object({
  imageUrl: Joi.string().optional(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

export default UpdateUserDto
