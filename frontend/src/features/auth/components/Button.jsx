import React from "react";


export default function Button({
    className="",
    name="",
    ...props
}){

    return(
       <button className={`border-0 outline-none px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out active:scale-90 ${className}`}
       {...props}>{name}</button>
    )
}