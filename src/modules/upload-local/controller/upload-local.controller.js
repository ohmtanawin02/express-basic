import responseSuccess from "../../../utils/response-success.js"
import UploadFileLocalService from "../service/upload-local.service.js"

const UploadLocalController = {
  upload: async (req, res, next) => {
    try {
      const file = await UploadFileLocalService(req, res, next)
      return responseSuccess(res, 201, file)
    } catch (error) {
      next(error)
    }
  }
}

export default UploadLocalController
