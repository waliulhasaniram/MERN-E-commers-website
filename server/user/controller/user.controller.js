const asyncHandeler = require("../utils/asyncHandeler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const UserData = require("../model/user.model")

const home = asyncHandeler(async(req, res)=>{
    res.status(200).json({message: "this is controller"})
})

const register = asyncHandeler(async (req, res) => {
    const { username, email, password, phone } = req.body;

    const userExists = await UserData.findOne({ email });

    if (userExists) {
        throw new ApiError(409, "User already exists");
    } else {
        const createUser = await UserData.create({ username, email, password, phone });

        if (!createUser) {
            throw new ApiError(500, "User not created");
        }

        res.status(201).json(new ApiResponse(201, createUser, "New user created"));
    }
});


const generateAccessAndRefresToken = async(userID)=>{
    try {
        const userToken = await UserData.findOne({_id: userID})
        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()

        userToken.refreshToken = refreshToken
        await userToken.save({validateBeforeSave:false})
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(400, "can't generate access and refresh token")
    }
}


const login = asyncHandeler(async(req, res)=>{
    const {email, password} = req.body 

    const userExists = await UserData.findOne({email: email})

    if(!userExists) {
        throw new ApiError(400, "user doesn't exist")
    }else{
        const comparePassword = await userExists.isPasswordcorrect(password)

        if(!comparePassword){
            throw new ApiError(400, "invalid credentials")
        }else{
            const {accessToken, refreshToken} = await generateAccessAndRefresToken(userExists._id)

            const loggedInUser = await UserData.findOne({_id: userExists._id}).select({password:0})
            
            const options = {
                httpOnly : true,
                secure: true
            }

            res.cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .status(200).json(new ApiResponse(200, {userExists: loggedInUser, accessToken, refreshToken}, "successfully logged in"))
        }
    }
})

const logout = asyncHandeler(async(req, res)=>{
    await UserData.findByIdAndUpdate(req.user._id, {$unset: {refreshToken:1}}, {new:true})

    const options = { httpOnly: true, secure: true}

    return res.clearCookie("accessToken", options).clearCookie("refreshToken", options).status(200)
    .json(new ApiResponse(200, {}, "logout successful"))
})

const updateUserInfo = asyncHandeler(async(req, res)=>{
    const {username, email, phone} = req.body

    if(!username || !email || !phone){
        throw new ApiError(400, "fill all the inputs")
    }

    const user = await UserData.findByIdAndUpdate(req.user?._id, {$set: {username: username, email:email, phone:phone}}, {new:true}).select({password:0, refreshToken:0})

    res.status(200).json(new ApiResponse(200, user, "user info updated"))
})

const getUser = asyncHandeler(async(req, res)=>{
    return await res.status(200).json(new ApiResponse(200, req.user, "logged in user data"))
})

module.exports = {home, register, login, logout, updateUserInfo, getUser}