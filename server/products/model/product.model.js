const {Schema, model} = require("mongoose")

const productSchema = new Schema({

    productName : {
        type: String,
        trim: true,
        required:true
    },
    description : {
        type: String,
        trim: true,
        required:true
    },
    inStock: {
        type: Number,
        trim: true,
        required:true
    },
    color: [{
        type: String,
        trim: true,
        required:true
    }],
    price:{
        type: Number,
        trim: true,
        required:true
    },
    catagory: {
        type: String,
        trim: true,
        required:true
    },
    company: {
        type: String,
        trim: true,
        required:true
    },
    productAvatar : {
        type: String,
        required:true
    }

})

const Product = new model("product", productSchema)

module.exports = Product