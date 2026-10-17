import React,{useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { Link,useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";


export default function Login(){

    const{ loading,handleLogin} =useAuth()
    const navigate= useNavigate()

    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        handleLogin({email,password})
        navigate('/')

    }

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

    return(
        <main className="min-h-screen w-full flex justify-center items-center">
            <div className="min-w-[350px] flex flex-col gap-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-rose-300">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    
                    <div className="flex flex-col gap-3">
                        <Input onChange={(e)=>{setEmail(e.target.value)}} label="Email" type="email" placeholder="Enter email address" name="email"/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input onChange={(e)=> {setPassword(e.target.value)}} label="Password" type="password" placeholder="Enter Password" name="password"/>
                    </div>

                    <Button className="bg-[#e1034d] text-white" name="Login"/>
                </form>
                    <p className="tracking-tight text-xl font-bold">Don't have Account?
                        <Link className="text-rose-300" to={"/register"}> Register</Link>
                    </p>
            </div>
        </main>
    )
}