class NotFoundUserError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundUserError'
    this.statusCode = 404
  }
}

export default NotFoundUserError
