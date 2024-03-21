import statusEnum from '../../../commons/enum/status.enum.js'
import userPaginateDto from '../dto/user-paginate.dto.js'
import UserModel from '../schema/user.schema.js'

const UserService = {
  create (payload) {
    return UserModel.create(payload)
  },
  getAll (query) {
    return UserModel.find(query)
  },
  async paginate (query) {
    const options = {
      page: Number(query.page),
      limit: Number(query.limit),
      sort: {}
    }
    if (query.sortBy && query.sortOrder) {
      options.sort = { [query.sortBy]: query.sortOrder }
    }

    const queryParams = userPaginateDto.buildQuery(query)

    const users = await UserModel.paginate(queryParams, options)
    return users
  },
  findOne (query) {
    return UserModel.findOne(query)
  },
  async update (id, body) {
    const updatedUser = await UserModel.findOneAndUpdate(id, body, {
      new: true
    })
    return updatedUser
  },
  async softDelete (query) {
    const deletedUser = await UserModel.updateOne(query, { status: statusEnum.DELETED }, { new: true })
    return deletedUser
  }
}

export default UserService
