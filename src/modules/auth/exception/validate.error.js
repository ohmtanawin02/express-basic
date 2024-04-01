class InvalidLoginError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidLoginError'
    this.statusCode = 404
  }
}

export default InvalidLoginError
