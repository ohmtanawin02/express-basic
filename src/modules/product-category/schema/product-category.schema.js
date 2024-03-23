import mongoose from "../../../config/database/mongoose.db.js"
import mongoosePaginateV2 from 'mongoose-paginate-v2'
import { incrementPlugin } from "../../../config/database/plugin/increment.plugin.js"
import { authorStampCreatePlugin } from "../../../config/database/plugin/author-stamp.plugin.js"
import statusEnum from "../../../commons/enum/status.enum.js"

const { Schema } = mongoose

const productCategorySchema = new Schema(
  {
    _id: { type: Number, default: 0 },
    name: { type: String, required: true },
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
  { versionKey: false, timestamps: true, strict: true, collection: 'productCategories' }
)

productCategorySchema.plugin(mongoosePaginateV2)
productCategorySchema.plugin(incrementPlugin, { id: 'product_categories_seq', inc_field: '_id' })
productCategorySchema.plugin(authorStampCreatePlugin)

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema, 'productCategories')

export default ProductCategoryModel