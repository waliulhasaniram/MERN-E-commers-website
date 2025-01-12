const UserData = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandeler = require("../utils/asyncHandeler");
const jwt = require("jsonwebtoken")


const verifyToken = asyncHandeler(async(req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        
        if(!token){
            throw new ApiError(200, "token not found")
        }else{
            const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
            if(!verifyToken){
                throw new ApiError(200, "token is not verified")
            }else{
                const user = await UserData.findOne({_id: verifyToken._id}).select({password: 0, refreshToken: 0})
    
                req.user = user
                next()
            }
        }
    } catch (error) {
        throw new ApiError(401, "token verification error")
    }
    
})

module.exports = verifyToken