const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const userRouter = require("./user/route/user.route")
const productRouter = require("./products/route/product.route")
const commentRouter = require("./comment/route/comment-route")
const adminRouter = require("./Admin/route/Admin-route")
const connectDB = require("./db/db")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    credential : true
}

app.use(cors(corsOptions))

app.use(express.json()) //express.json({limit: "30kb"})
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(cookieParser())


app.use("/api/user", userRouter)
app.use("/api/usables", productRouter)
app.use("/api/message", commentRouter)
app.use("/api/admin", adminRouter)

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`this is the server http://localhost:${port}`)
    })
})

