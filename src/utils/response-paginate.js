const responsePaginate = (res, httpStatus, data, page, limit, totalPages) =>
  res?.status(httpStatus).json({
    success: true,
    data: data.docs,
    totalDocs: data.totalDocs,
    page,
    limit,
    totalPages: totalPages
  })

export default responsePaginate
