import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate,Navigate } from "react-router";


export default function Protected({children}){

    const {loading,user} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return (<main><h1 className="flex justify-center items-center min-h-screen text-4xl">Loading......</h1></main>)
    }

    if(!user){
        return <Navigate to={"/login"}/>
    }

    return(
        children
    )
}