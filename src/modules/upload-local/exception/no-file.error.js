class NoFileUploadLocalError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NoFileUploadLocalError'
    this.statusCode = 404
  }
}

export default NoFileUploadLocalError
