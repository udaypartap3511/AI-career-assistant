import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import {apiError} from '../utils/apiError.js';
import mongoose from 'mongoose';
import { apiResponse } from '../utils/apiResponse.js';



const generateAccessAndRefreshToken= async(userId)=>{

    try {
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken= user.generateRefreshToken()

        user.refreshToken= refreshToken
        await user.save({validateBeforeSave:true})

        return {refreshToken,accessToken}
        
    } catch (error) {
        throw new apiError(500,"Error while generating access and refresh tokens")
    }
}

const registerUser= asyncHandler(async(req,res)=>{

    const {username,email,password}= req.body

    if(!username || !email || !password){
        throw new apiError(400,"please provide username,email and password")
    }

    const existedUser= await User.findOne(
        {
            $or:[{username},{email}]
        }
    )

    if(existedUser){
        throw new apiError(400,"Account already exist with this username or email address")
    }

    const user= await User.create({
        username,
        email,
        password
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500,"Error while registering user")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)
 
    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new apiResponse(201,"User registered successfully"))
})

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    if(!email || !password){
        throw new apiError(400,"email and password are required")
    }

    const user = await User.findOne({
        email
    })

    if(!user){
        throw new apiError(404,"User does not exist")
    }

    const isPasswordValid= await user.isPasswordCorrect(password)

    if(!isPasswordValid){
       throw new apiError(400,"Invalid password")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)

    const loggedInuser= await User.findById(user._id).select(
        "-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new apiResponse(200,{
        user:loggedInuser
    },"logged In Successfully"))
})

const logoutUser= asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(req.user?._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {new : true}
    )

    const options= {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(200,{},"User logged out successfully"))
})

const getCurrentUser= asyncHandler(async(req,res)=>{

    return res
    .status(200)
    .json(new apiResponse(200,req.user,"current user info fetched successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}