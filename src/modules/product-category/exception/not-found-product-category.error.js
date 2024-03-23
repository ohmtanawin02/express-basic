class NotFoundProductCategoryError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundProductCategoryError'
    this.statusCode = 404
  }
}

export default NotFoundProductCategoryError
