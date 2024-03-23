import multer from 'multer'
import NoFileUploadLocalError from '../exception/no-file.error.js'

const UploadFileLocalService = async (req, res, next) => {
  try {
    return new Promise((resolve, reject) => {
      const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, 'uploads/')
        },
        filename: (_req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname)
        }
      })

      const upload = multer({ storage: storage }).single('files')

      upload(req, res, async (err) => {
        if (err) {
          return reject(err)
        }

        if (!req.file) {
          const error = new NoFileUploadLocalError(`No file uploaded`)
          return reject(error)
        }

        resolve(req.file)
      })
    })
  } catch (error) {
    return next(error)
  }
}

export default UploadFileLocalService
