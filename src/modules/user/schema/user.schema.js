import mongoose from '../../../config/database/mongoose.db.js'
import mongoosePaginateV2 from 'mongoose-paginate-v2'
import { incrementPlugin } from '../../../config/database/plugin/increment.plugin.js'
import { authorStampCreatePlugin } from '../../../config/database/plugin/author-stamp.plugin.js'
import statusEnum from '../../../commons/enum/status.enum.js'

const {Schema} = mongoose

const userSchema = new Schema(
  {
    _id: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(statusEnum),
      default: statusEnum.ACTIVE
    },
    updatedById: { type: Number, default: 0 },
    updatedByEmail: { type: String, default: 'system' },
    createdById: { type: Number, default: 0 },
    createdByEmail: { type: String, default: 'system' }
  },
  { versionKey: false, timestamps: true,strict:true }
)

userSchema.plugin(mongoosePaginateV2)
userSchema.plugin(incrementPlugin, { id: 'user_seq', inc_field: '_id' })
userSchema.plugin(authorStampCreatePlugin)

const UserModel = mongoose.model('User', userSchema, 'users')

export default UserModel
