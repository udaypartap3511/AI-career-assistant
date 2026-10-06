import {GoogleGenAI} from "@google/genai"
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema"

const ai= new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

co

const interviewReportSchema = z.object({
    technicalQuestions:z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        intention: z.string().description("The intention of interviewer behind asking this question"),
        answer:z.string().description("How to answer this question, what points to cover,what approach to take etc.")

    })).description("Technical questions that can be asked in interview along their intention and how to answer them"),
    behavioralQuestions:z.array(z.object({
        question: z.string().description("The behavioral question can be asked in the interview"),
        intention: z.string().description("The intention of interviewer behind asking this question"),
        answer:z.string().description("How to answer this question, what points to cover,what approach to take etc.")

    })).description("Behavioral questions that can be asked in interview along their intention and how to answer them"),

})

async function generateInterviewReport({resume,selfDescription,jobDescription}){

}
