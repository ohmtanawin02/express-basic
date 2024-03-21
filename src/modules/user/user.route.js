import { Router } from 'express'
import { createValidator } from 'express-joi-validation'
import userPaginateDto from './dto/user-paginate.dto.js'
import UserController from './controller/user.controller.js'
import UpdateUserDto from './dto/update-user.dto.js'
import CreateUserDto from './dto/create-user.dto.js'

const router = Router()
const validator = createValidator({})

router.get('/', validator.query(userPaginateDto.PaginateUserDto), UserController.paginate)
router.post('/', validator.body(CreateUserDto), UserController.create)
router.get('/:id', UserController.findOne)
router.put('/:id', validator.body(UpdateUserDto), UserController.update)
router.delete('/:id', UserController.delete)

export default router
