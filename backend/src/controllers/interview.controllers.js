import { asyncHandler } from "../utils/asyncHandler.js";
import {PDFParse} from "pdf-parse"
import { generateInterviewReport,generateResumePdf } from "../services/ai.service.js";
import { InterviewReport } from "../models/interviewReport.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateInterviewReportController=asyncHandler(async(req,res)=>{

    const resumeFile = req.file

    const {selfDescription,jobDescription}=req.body

    if(!resumeFile || !selfDescription){
        throw new apiError(400,"Resumefile pdf or Self Description is required")
    }

    if(!jobDescription){
        throw new apiError(400,"Job Description is required")
    }

    const parser = new PDFParse({
        data:resumeFile.buffer
    })

    const result = await parser.getText()

    const resumeContent = result.text;

    await parser.destroy();

    const inteviewReportByAi= await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport=await InterviewReport.create({
        user:req.user?._id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...inteviewReportByAi
    })

    return res
    .status(201)
    .json(new apiResponse(201,interviewReport,"Interview Report created successfully"))
})


const getInterviewReportByIdController= asyncHandler(async(req,res)=>{

    const {interviewId} = req.params

    const interviewReport= await InterviewReport.findOne({
        _id:interviewId,
        user:req.user._id
    })

    if(!interviewReport){
        throw new apiError(404,"Interview report not found")
    }

    return res
    .status(200)
    .json(new apiResponse(200,interviewReport,"interview report fetched successfully"))
})

const getAllInterviewReportsController= asyncHandler(async(req,res)=>{
    const interviewReports = await InterviewReport.find({
        user:req.user._id
    })
    .sort({createdAt:-1})
    .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlans")

    return res
    .status(200)
    .json(new apiResponse(200,interviewReports,"Interview reports fetched successfully"))
})

const generateResumePdfController = asyncHandler(async(req,res)=>{

    const {interviewReportId} = req.params

    const interviewReport = await InterviewReport.findById(interviewReportId)

    if(!interviewReport){
        throw new apiError(404,"Inteview report not found")
    }

    const {resume, jobDescription, selfDescription} =interviewReport

    const pdfBuffer= await generateResumePdf({resume,jobDescription,selfDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
})


export {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController,generateResumePdfController}