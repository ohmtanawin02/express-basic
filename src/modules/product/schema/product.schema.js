import mongoose from '../../../config/database/mongoose.db.js'
import mongoosePaginateV2 from 'mongoose-paginate-v2'
import { incrementPlugin } from '../../../config/database/plugin/increment.plugin.js'
import { authorStampCreatePlugin } from '../../../config/database/plugin/author-stamp.plugin.js'
import statusEnum from '../../../commons/enum/status.enum.js'
import RunningNumber from '../../../config/database/plugin/running-number.plugin.js'

const { Schema } = mongoose

const productSchema = new Schema(
  {
    _id: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    code: { type: String, default: '' },
    name: { type: String, required: true },
    detail: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: Number, ref: 'ProductCategory' },
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
  { versionKey: false, timestamps: true, strict: true, collection: 'products' }
)

productSchema.plugin(mongoosePaginateV2)
productSchema.plugin(incrementPlugin, { id: 'product_seq', inc_field: '_id' })
productSchema.plugin(RunningNumber, { prefix: 'PD', field: 'code' })
productSchema.plugin(authorStampCreatePlugin)

const ProductModel = mongoose.model('Product', productSchema, 'products')

export default ProductModel
