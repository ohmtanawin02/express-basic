const responseSuccess = (res, httpStatus, data, additional) =>
  res?.status(httpStatus).json({
    success: true,
    data,
    additional
  })

export default responseSuccess
