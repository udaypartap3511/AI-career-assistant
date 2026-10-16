import {getAllInterviewReports,getInterviewReportById,generateInterviewReport, generateResumePdf} from "../services/interview.api.js"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context.jsx"
import {useParams} from "react-router"


export const useInterview = () =>{
   
    const context= useContext(InterviewContext)
    const {interviewId} = useParams()

    if(!context){
        throw new Error("UseInterview must be used within an InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reports,setReports} =context

    const generateReport = async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        let interviewReport=null
        try{
            interviewReport= await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            
            setReport(interviewReport)
        }
        catch(error){
           console.log(error)
        }
        finally{
            setLoading(false)
        }

        return interviewReport
    }

    const getReportById = async(interviewId) =>{
        setLoading(true)
        let interviewReport=null
        try {
            interviewReport =await getInterviewReportById(interviewId)
            setReport(interviewReport)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        return interviewReport
    }

    const getReports = async()=>{
        setLoading(true)
        let interviewReports=null
        try {
            interviewReports= await getAllInterviewReports()
            setReports(interviewReports)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return interviewReports
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response= null

        try {
            response= await generateResumePdf({interviewReportId})
            const url = window.URL.createObjectURL(new Blob([response], {type: "application/pdf"}))
            const link = document.createElement("a")
            link.href=url
            link.setAttribute("download",`resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(interviewId){
           getReportById(interviewId)
        }
        else{
            getReports()
        }
    },[interviewId])

    return {loading,report,reports,generateReport,getReportById,getReports,getResumePdf}
}