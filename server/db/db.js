require("dotenv").config()
const mongoose = require("mongoose")

const connectDB =async()=>{
    try {
        const connect_the_database = await mongoose.connect(process.env.DATABASE_NAME)
        console.log("connected to the host->", connect_the_database.connection.host)
    } catch (error) {
        console.log("problem connecting database", error)
        process.exit(1)
    }
}

module.exports = connectDB