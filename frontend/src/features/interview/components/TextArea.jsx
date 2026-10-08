import React,{useId} from "react";

export default function TextArea({
    label,
    className="",
    ...props
}){

    const id= useId()
    return (
        <div className="w-full h-full flex flex-col">
            {label && <label 
            className="block mb-1 pl-1" 
            htmlFor={id}>
                {label}
            </label>}
            <textarea 
            className={`w-full border-0 outline-none px-4 py-3 rounded-lg bg-[#1a1f27] text-[#e1e4e8] resize-none ${className}`}
            {...props} 
            id={id} />
        </div>
    )
}
