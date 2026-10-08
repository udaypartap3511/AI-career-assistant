import React from "react";
import Input from "../components/Input.jsx";
import Button from "../../auth/components/Button.jsx"
import TextArea from "../components/TextArea.jsx"

export default function Home(){

    return(
       <main className="w-full min-h-screen flex justify-center items-center p-6">
          <div className="w-full min-h-150 max-w-5xl flex gap-4 items-stretch">
            <div className="w-1/2 self-stretch">
             <TextArea name="jobDescription" label="Job Description" placeholder="Enter job description here..."
             className="h-full"/>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <p>Resume <small className="text-[#920634]">Use Resume and self description together for best results</small></p>
              <Input label="Upload Resume" type="file" name="resume" accept=".pdf" className="hidden" classNameLabel="font-bold w-full flex justify-center items-center px-3 py-4 bg-[#e0ecff] text-[#121c29] rounded-xl cursor-pointer"/>
              <div className="flex-1 min-h-0">
                <TextArea name="selfDescription" label="Self Description" placeholder="Describe yourself in a few sentences..." className="flex-1 min-h-0"/>
              </div>
              <Button className="bg-[#e1034d] text-white" name="Generate Interview Report"/>
            </div>
          </div>
       </main>
    )
}