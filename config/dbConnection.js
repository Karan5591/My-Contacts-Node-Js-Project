const mongoose= require("mongoose")

const connetDb=async()=>{
    try{
        const connect= await mongoose.connect(process.env.DB_connect)
        console.log("db Connected")
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}
module.exports=connetDb;