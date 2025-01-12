const UserData = require("../../user/model/user.model");
const ApiError = require("../../user/utils/ApiError");
const ApiResponse = require("../../user/utils/ApiResponse");
const asyncHandeler = require("../../user/utils/asyncHandeler");

//get all user
const adminGetsUser =asyncHandeler(async(req, res)=>{
    const allUsers = await UserData.find({})

    if(!allUsers || allUsers.length === 0){ new ApiError(400, "users data not found")}

    res.status(200).json(new ApiResponse(200, allUsers, "all users data"))
})

//update
const adminUpdatesUserData = asyncHandeler(async(req, res)=>{ // update the user date 
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id not found")}

    const updatedUserOnform = req.body
    if(!updatedUserOnform) {throw new ApiError(400, "user new data not found")}

    const updateUserData = await UserData.updateOne({_id:id}, {$set: updatedUserOnform})

    res.status(200).json(new ApiResponse(200, updateUserData, "data updated"))
})


//delete
const adminDeletesUser = asyncHandeler(async(req, res)=>{
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id not found")}

    const deleteUser = await UserData.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "one user deleted"))
})

module.exports = {adminGetsUser, adminUpdatesUserData, adminDeletesUser}