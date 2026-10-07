import { asyncHandler } from "../utils/asyncHandler.js";
import {PDFParse} from "pdf-parse"
import { generateInterviewReport } from "../services/ai.service.js";
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



export {generateInterviewReportController}