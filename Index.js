const express= require("express")
const dotenv= require("dotenv").config()
const contactRoutes= require("./Routes/contactRoutes");
const userRoutes= require("./Routes/userRoutes");
const errorHandle=require("./Middleware/errorHandler")
const connectDb= require("./config/dbConnection")
const exp = require("constants");
connectDb();
const app=express();

app.use(express.json())

app.use("/api/contacts", contactRoutes)
app.use("/api/user", userRoutes)
app.use(errorHandle)

const port= process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server started")
})