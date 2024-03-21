import CounterModel from '../../../modules/counter/schema/counter.schema.js'

export const incrementPlugin = (schema, options) => {
  schema.pre('save', async function (next) {
    const doc = this
    try {
      if (doc[options.inc_field] === 0) {
        const result = await CounterModel.findByIdAndUpdate({ _id: options.id }, { $inc: { seq: 1 } }, { new: true, upsert: true })
        doc[options.inc_field] = options.custom ? options.custom(result.seq) : result.seq.toString()
      }
      next()
    } catch (e) {
      next(e)
    }
  })
}
