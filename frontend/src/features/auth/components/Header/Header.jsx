import React from "react";
import { Link,useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";



export default function Header(){
   
    const location = useLocation()
    const {handleLogout} = useAuth()


    if(location.pathname==="/login" || location.pathname==="/register") return null;

    const isInterviewPage = location.pathname.startsWith==="/interview/"

    return(
        <header className="border-b border-slate-800 bg-[#071321] px-5 py-3">
           <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          Career<span className="text-pink-400">AI</span>
        </Link>

        <div className="flex items-center gap-5 text-lg">
          <Link
            to="/"
            className="text-slate-300 transition hover:text-pink-400"
          >
            Home
          </Link>

           <button className="inline-block px-6 py-2 duration-200 hover:text-[#ff5eac] rounded-full"
             onClick={handleLogout}>
            Logout
           </button>
        </div>
      </div>
        </header>
    )
}