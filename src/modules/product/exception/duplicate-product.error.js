class DuplicateProductError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DuplicateProductError'
    this.statusCode = 400
  }
}

export default DuplicateProductError
