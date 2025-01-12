const express = require("express")
const productController = require("../controller/product.controller")
const upload = require("../middleware/multerMiddleware")
const verifyToken = require("../../user/milldeware/auth.middleware")
const AdminMiddleware = require("../../Admin/middleware/Admin-middleware")
const router = express()

router.route('/products').post(verifyToken, AdminMiddleware, upload.single("productAvatar"), productController.addNewProducts) // upload product
router.route('/update-product/:id').patch(verifyToken, AdminMiddleware, productController.updateProduct) 

router.route('/allproducts').get(productController.getAllProducts) // get all product

router.route('/allproducts/:id').get(productController.singleProduct)

router.route('/filter-product').get(productController.getFilteredProducts)

router.route('/filter-products/search').get(productController.getSerchedProduct)

router.route('/filter-products/filter').get(productController.applyFilter)

module.exports = router
