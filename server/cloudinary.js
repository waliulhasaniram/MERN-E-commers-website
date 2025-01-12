require("dotenv").config()

const cloudinary = require("cloudinary")
const fs = require('fs')


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDI_API_NAME, 
    api_key: process.env.CLOUDI_API_KEY, 
    api_secret: process.env.CLOUDI_API_SECRET
});


const uploadOneCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }else{
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
    
            // console.log(response.url)
            fs.unlinkSync(localFilePath)
            return response
        }
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

module.exports = uploadOneCloudinary



//file upload
    //make a public folder
    //login in to cloudinary to see image
      //create a cloudinary.js
      //make a multer-Middleware
      //check the file and upload from controller
      //add upload.single("Avatar") in the route