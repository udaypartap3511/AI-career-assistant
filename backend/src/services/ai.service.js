import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai= new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportJSONSchema= {
    type:"object",
    properties: {
        matchScore:{
            type:"integer",
            description:"A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    question:{
                        type:"string",
                        description:"The technical question can be asked in the interview"
                    },
                    intention:{
                        type:"string",
                        description:"The intention of interviewer behind asking this question"
                    },
                    answer:{
                        type:"string",
                        description:"How to answer this question, what points to cover,what approach to take etc."
                    }
                },
                required: ["question","intention","answer"]
            },
            description:"Technical questions that can be asked in interview along their intention and how to answer them"
        },
        behavioralQuestions:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    question:{
                        type:"string",
                        description:"The behavioral question can be asked in the interview"
                    },
                    intention:{
                        type:"string",
                        description:"The intention of interviewer behind asking this question"
                    },
                    answer:{
                        type:"string",
                        description:"How to answer this question, what points to cover,what approach to take etc."
                    }
                },
                required: ["question","intention","answer"]
            },
            description:"Behavioral questions that can be asked in interview along their intention and how to answer them"
        },
        skillGaps:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    skill:{
                        type:"string",
                        description:"The skill which the candidate is lacking"
                    },
                    severity:{
                        type:"string",
                        enum:["low","medium","high"],
                        description:"The severity of this skill gap, i.e. how important is the skill for the job and how much it can impact the candidate's chances"
                    }
                },
                required: ["skill","severity"]
            },
            description:"List of skill gap in the candidate's profile along with their severity"
        },
        preparationPlans:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    day:{
                        type:"integer",
                        description:"The day number in the preparation plan,starting from 1"
                    },
                    focus:{
                        type:"string",
                        description:"The main focus of this day in the preparation plan, e.g. data structure, system design, mock interviews etc."
                    },
                    tasks:{
                        type:"array",
                        items:{
                            type:"string"
                        },
                        description:"List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article,solve a set of problems,watch a video etc."
                    }
                },
                required: ["day","focus","tasks"]
            },
            description:"Preparation plan for the candidate to follow in order to prepare for the interview effectively"
        }
    },

    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlans"]
}

const interviewReportSchema= z.fromJSONSchema(interviewReportJSONSchema)



export async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt= `Generate an interview report for a candidate with the following details:
          Resume: ${resume}
          Self Description: ${selfDescription}
          Job Description: ${jobDescription}
    `
    
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3-flash-preview",
            input:prompt,
            response_format: {
                type:"text",
                mime_type: "application/json",
                schema: interviewReportJSONSchema
                
            }
        })
    
        if (!interaction || !interaction.output_text) {
                throw new Error("Received empty response from Gemini API");
            }
    
    
        console.log(interviewReportSchema.parse(JSON.parse(interaction.output_text)));
    } catch (error) {
        console.error("AI Service Error:", error.message || error);
        throw new Error("Failed to generate interview report due to a network or API error.")
    }
}