import mongoose from '../../config/database/mongoose.db.js'
const {Schema} = mongoose

const UserStampSchema = new Schema(
  {
    id: { type: mongoose.Schema.Types.Mixed },
    email: { type: String }
  },
  { strict: true, _id: false }
)

export default UserStampSchema
