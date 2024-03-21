class NotFoundProductError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundProductError'
    this.statusCode = 404
  }
}

export default NotFoundProductError
