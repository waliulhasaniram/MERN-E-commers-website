const express = require("express")
const router = express()
const userController = require("../controller/user.controller")
const verifyToken = require("../milldeware/auth.middleware")

router.route("/").get(userController.home)

router.route("/register").post(userController.register)

router.route("/login").post(userController.login)

router.route("/logout").post(verifyToken, userController.logout)

router.route("/update-user-info").post(verifyToken, userController.updateUserInfo)

router.route("/getuser").get(verifyToken, userController.getUser)

module.exports = router
