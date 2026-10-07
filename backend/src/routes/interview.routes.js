import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controllers.js";

const router=Router();


router.route("/").post(verifyJWT,upload.single("resume"),generateInterviewReportController)

export default router;