const asyncHandeler = require("../../user/utils/asyncHandeler");
const ApiError = require("../../user/utils/ApiError")
const ApiResponse = require("../../user/utils//ApiResponse");
const Product = require("../model/product.model");
const uploadOneCloudinary = require("../../cloudinary");

const addNewProducts = asyncHandeler(async(req, res)=>{
    const {productName, description, inStock, color, price, catagory, company} = req.body

    // if([productName, description, inStock, color, price, catagory].some((fields)=> fields?.trim() === "")){
    //     throw new ApiError(400, "fill all the fields")
    // }

    if(!productName && !description && !inStock && !color && !price && !catagory && !company){
        throw new ApiError(400, "fill all the fields")
    }


    const productAvatarPath = req.file?.path  //req.files for many files

    if (!productAvatarPath) { throw new ApiError(400, "product avatar is required") }

    const productAvatar = await uploadOneCloudinary(productAvatarPath) //uploadOnCloudinary is in cloudinary.js

    if(!productAvatar){ throw new ApiError(200, "avater not found")}

    const newProduct = await Product.create({
        productName: productName,
        description: description,
        inStock: inStock,
        color: color,
        price: price,
        catagory: catagory,
        company: company,
        productAvatar: productAvatar?.url
    })

    if(!newProduct){ throw new ApiError(400, "cannot find the new product which recently want to be added")}

    res.status(200).json(new ApiResponse(200, newProduct, "new product added"))
})

/// get all product--------------------------------------------------------------------------------
const getAllProducts = asyncHandeler(async(req, res)=>{
     
    const allData = await Product.find({})

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    const startIndex = (page - 1)*limit  ///pagination formula  (1-1)*3=0
    const lastIndex = page*limit                              // 1*3=3

    const allProducts = {}
    allProducts.totalProduct = allData.length
    allProducts.pageCount = Math.ceil(allData.length/limit)

    if(lastIndex < allData.length) { allProducts.next = page+1}
    if(startIndex > 0) { allProducts.prev = page-1}
    
    allProducts.results = allData.slice(startIndex, lastIndex)


    if(!allProducts || allProducts.length === 0){ new ApiResponse(200, {}, "no product found")}

    res.status(200).json(new ApiResponse(200, allProducts, "all products"))
})

const singleProduct = asyncHandeler(async(req, res)=>{
    const id = req.params.id 

    const singleProductData = await Product.find({_id: id})

    if(!singleProductData){ throw new ApiError(200, "cannot get the single product")}

    res.status(200).json(new ApiResponse(200, singleProductData, "single Product Data"))
})

const updateProduct = asyncHandeler(async(req, res)=>{
    const id = req.params.id 
    if(!id) {throw new ApiError(400, "product id not found")}
    
    const productName = req.body.productName
    const description = req.body.description
    const inStock = req.body.inStock
    const color = req.body.color
    const price = req.body.price
    const catagory = req.body.catagory
    const company = req.body.company

    const newProductData = await Product.updateOne({_id:id}, {$set: {
        productName:productName, description:description, inStock:inStock, color:color, price:price, catagory:catagory, company:company}})

    if(!newProductData) {throw new ApiError(400, "failed to update product data")}

    res.status(200).json(new ApiResponse(200, newProductData, "product data updated"))
})


/// filter section (catagory, company)
const getFilteredProducts = asyncHandeler(async(req, res)=>{
    const getCompany = await Product.find({}).select({_id:0, company:1})
    if(!getCompany) {throw new ApiError(400, "company filter failed")}

    const getPrice = await Product.find({}).select({_id:0, price:1})
    if(!getPrice) {throw new ApiError(400, "price filter failed")}

    const getCatagory = await Product.find({}).select({_id:0, catagory:1})
    if(!getCompany) {throw new ApiError(400, "catagory filter failed")}

    res.status(200).json(new ApiResponse(200, {getCompany, getPrice, getCatagory}, "these are the category"))
})

//filter products
const getSerchedProduct = asyncHandeler(async (req, res) => {
    const {productName, page, limit} = req.query
    const filterSearch = {}

    if(productName){
        filterSearch.productName = {$regex: productName}
    }

    const skip = (Number(page) - 1) * Number(limit)

    const searchProduct = await Product.find(filterSearch).skip(skip).limit(limit)
       
    res.status(200).json(new ApiResponse(200, searchProduct, "These are categorized data"));
});

const applyFilter = asyncHandeler(async(req, res)=>{
    const {catagory, company, sort, page, limit} = req.query

    const filterSearch = {}

    if(catagory) {
        filterSearch.catagory = catagory
    }
    if(company) {
        filterSearch.company = company
    }
  
    const skip = (Number(page) - 1) * Number(limit)

    let searchQuery = Product.find(filterSearch)

    if(sort){
        const sortOrder = sort === 'asc' ? 1 : -1
        searchQuery = searchQuery.sort({ price: sortOrder })
    }

    const filterData = await searchQuery.skip(skip).limit(Number(limit))

    res.status(200).json(new ApiResponse(200, {filterData}, "These are filtered data"));
})

module.exports = {addNewProducts, getAllProducts, singleProduct, updateProduct, getFilteredProducts, getSerchedProduct, applyFilter}
