import statusEnum from '../../../commons/enum/status.enum.js'
import responsePaginate from '../../../utils/response-paginate.js'
import responseSuccess from '../../../utils/response-success.js'
import UserService from '../service/user.service.js'
import * as bcrypt from 'bcrypt'
import DuplicateUserError from '../exception/duplicate-user.error.js'
import NotFoundUserError from '../exception/not-found-user.error.js'

const UserController = {
  create: async (req, res, next) => {
    try {
      const payload = req?.body
      const user = await UserService.findOne({ email: payload?.email })
      if (user) {
        throw new DuplicateUserError(`User with email "${payload.email}" is already exists.`)
      }
      const salt = bcrypt.genSaltSync(8)
      payload.password = bcrypt.hashSync(payload.password, salt)
      const created = await UserService.create({
        ...payload,
        createdById: req._requestUser.id,
        createdByEmail: req._requestUser.email
      })
      return responseSuccess(res, 201, created)
    } catch (error) {
      next(error)
    }
  },
  paginate: async (req, res, next) => {
    try {
      const users = await UserService.paginate(req.query)
      responsePaginate(res, 200, users, req.query.page, req.query.limit, users.totalPages)
    } catch (error) {
      next(error)
    }
  },
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await UserService.findOne({
        _id: id,
        status: statusEnum.ACTIVE
      })

      if (!user) {
        throw new NotFoundUserError(`User with "${id}" not found.`)
      }
      return responseSuccess(res, 200, user)
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await UserService.findOne({ _id: id })

      if (!user) {
        throw new NotFoundUserError(`User with id "${id}" not found.`)
      }

      const payload = req.body

      const userExists = await UserService.findOne({
        _id: { $ne: id },
        email: email?.name
      })
      if (userExists) {
        throw new DuplicateUserError(`Product with name "${payload.email}" already exists.`)
      }

      const { id: updatedById, email } = req._requestUser

      const updated = await UserService.update(id, {
        ...payload,
        updatedById,
        updatedByEmail: email
      })
      return responseSuccess(res, 200, updated)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await UserService.findOne({ _id: id })
      if (!user) {
        throw new NotFoundUserError(`user with "${id}" not found.`)
      }
      await UserService.softDelete({ _id: id })
      return res.status(200).json({ success: true, message: 'Deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
