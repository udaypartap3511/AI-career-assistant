import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportByIdController } from "../controllers/interview.controllers.js";

const router=Router();


router.route("/").post(verifyJWT,upload.single("resume"),generateInterviewReportController)
router.route("/report/:interviewId").get(verifyJWT,getInterviewReportByIdController)
router.route("/").get(verifyJWT,getAllInterviewReportsController)
router.route("/resume/pdf/:interviewReportId").post(verifyJWT,generateResumePdfController)


export default router;