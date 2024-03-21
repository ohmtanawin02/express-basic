/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const message = err?.message || 'Internal Server Error'
  const status = err?.status || 500
  console.log(err.response)
  return res?.status(status).json({
    success: false,
    message
  })
}

export default errorHandler
