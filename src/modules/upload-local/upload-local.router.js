import { Router } from "express"
import UploadLocalController from "./controller/upload-local.controller.js"
import authMiddleware from "../../middlewares/auth.middleware.js"



const router = Router()

router.post('/upload-local', authMiddleware, UploadLocalController.upload)

export default router
