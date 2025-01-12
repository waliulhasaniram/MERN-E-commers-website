const express = require("express")
const router = express()
const commentController = require("../controller/comment-controller")
const verifyToken = require("../../user/milldeware/auth.middleware")

router.route("/postComments/:id").post(verifyToken, commentController.postComments)
router.route("/getComments/:id").get(commentController.getComments)

module.exports = router
