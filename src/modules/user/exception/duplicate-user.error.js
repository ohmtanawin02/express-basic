class DuplicateUserError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DuplicateUserError'
    this.statusCode = 400
  }
}

export default DuplicateUserError
