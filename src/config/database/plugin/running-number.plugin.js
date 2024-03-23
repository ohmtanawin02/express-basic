const RunningNumber = (schema,options) => {
  schema.pre('save',async function runningNumber (next) {
    const doc = this
    try {
      const digits = 7
      let currentNumber = doc._id
      const currentNumberDigits = currentNumber.toString().length

      if (currentNumberDigits > digits) {
        currentNumber = Number(doc._id.toString().slice(-digits))
      }

      const formattedNumber = currentNumber.toString().padStart(digits, '0')
      doc[options.field] = `${options.prefix}-${formattedNumber}`
      next()
    } catch (error) {
      next(error)
    }
  })
}

export default RunningNumber