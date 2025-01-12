const express = require("express")
const router = express()
const adminController = require("../controller/Admin-controller")
const AdminMiddleware = require("../middleware/Admin-middleware")
const verifyToken = require("../../user/milldeware/auth.middleware")

router.route("/adminUser").get(verifyToken, AdminMiddleware, adminController.adminGetsUser)

router.route("/adminDeleteUser/:id").delete(verifyToken, AdminMiddleware, adminController.adminDeletesUser)

router.route("/adminUpdateUser/:id").patch(verifyToken, AdminMiddleware, adminController.adminUpdatesUserData)

module.exports = router 