const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please add the user name"]
    },
    email:
    {
        type: String,
        required: [true, "Please add email"],
        unique:[true, "Email alredy registered"]
    },
    password:
    {
        type: String,
        required:[true, "Enter password"]
    },
},
{
    timestamps: true
})
module.exports=mongoose.model("user", userSchema)