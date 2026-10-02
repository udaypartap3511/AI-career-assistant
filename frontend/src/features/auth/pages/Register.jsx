import React from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useNavigate,Link } from "react-router";


export default function Register(){

    const navigate= useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    return(
        <main className="min-h-screen w-full flex justify-center items-center">
                    <div className="min-w-[350px] flex flex-col gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-rose-300">Register</h1>
        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                            <div className="flex flex-col gap-3">
                            <Input label="Username" type="text" placeholder="Enter username" name="username"/>
                            </div>                            
                            <div className="flex flex-col gap-3">
                                <Input label="Email" type="email" placeholder="Enter email address" name="email"/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Input label="Password" type="password" placeholder="Enter Password" name="password"/>
                            </div>
        
                            <Button className="bg-[#e1034d] text-white" name="Register"/>
                        </form>

                        <p className="tracking-tight text-xl font-bold">Already have an account?
                            <Link className="text-rose-300" to={"/login"}> Login</Link>
                        </p>
                    </div>
                </main>
    )
}