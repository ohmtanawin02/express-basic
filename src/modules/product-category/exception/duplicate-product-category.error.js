class DuplicateProductCategoryError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DuplicateProductCategoryError'
    this.statusCode = 400
  }
}

export default DuplicateProductCategoryError
