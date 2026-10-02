import React from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { Link,useNavigate } from "react-router";

export default function Login(){

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    return(
        <main className="min-h-screen w-full flex justify-center items-center">
            <div className="min-w-[350px] flex flex-col gap-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-rose-300">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    
                    <div className="flex flex-col gap-3">
                        <Input label="Email" type="email" placeholder="Enter email address" name="email"/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input label="Password" type="password" placeholder="Enter Password" name="password"/>
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