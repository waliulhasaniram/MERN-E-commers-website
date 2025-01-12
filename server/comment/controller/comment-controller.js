const ApiError = require("../../user/utils/ApiError");
const ApiResponse = require("../../user/utils/ApiResponse");
const asyncHandeler = require("../../user/utils/asyncHandeler");
const Comment = require("../model/comment-model");
const { default: mongoose } = require('mongoose')

const postComments = asyncHandeler(async(req, res)=>{
    const {commentText} = req.body
    //const productId = req.params.id

    const newComment = await Comment.create({
        commentText: commentText,
        userId: req.user?._id,
        productId: req.params.id
    })

    if(!newComment){ throw new ApiError(400, "cannot save comment")}

    res.status(200).json(new ApiResponse(200, newComment, "comment posted"))
})

const getComments = asyncHandeler(async(req, res)=> {

    const productId  = req.params.id
    const allComments = await Comment.aggregate([
        {
            $match: {
                productId: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "the_product"
            }
        },
        {
            $lookup: {
              from: "userdatas",
              localField: "userId",
              foreignField: "_id",
              as: "the_commenter"
            }
        },
        {
            $project: {
              _id: 1,
              commentText: 1,
              "the_product.productName" : 1,
              "the_commenter.username" : 1,
              createdAt: 1
            }
        }
    ])

    res.status(200).json(new ApiResponse(200, allComments, "comments "))
})

module.exports = {postComments, getComments}