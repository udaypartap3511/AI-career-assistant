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


    return res
    .status(201)
    .json(new apiResponse(201,"User registered successfully"))
})

export {
    registerUser
}