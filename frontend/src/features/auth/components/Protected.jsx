import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate,Navigate } from "react-router";


export default function Protected({children}){

    const {loading,user} = useAuth()
    const navigate = useNavigate()

    if (loading) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#050c18] text-white">
      
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-pink-500" />

      <div className="text-center">
        <h1 className="text-xl font-semibold">
          Loading
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Please wait...
        </p>
      </div>
    </main>
  );
}

    if(!user){
        return <Navigate to={"/login"}/>
    }

    return children
}