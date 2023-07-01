const asynchandler= require("express-async-handler")
const bcrypt=require("bcrypt")
const users= require("../models/userModel")
const jwt= require("jsonwebtoken")
console.log(users)

const userRegister=  asynchandler(async(req, res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password)
    {
        res.status(400)
        throw new Error("All field mandatory")
    }
    const userAvailable=await users.findOne({email})
    if(userAvailable)
    {
        res.status(400)
        throw new Error("User already registered")
    }
    //Hash Password
    const hashedPass=await bcrypt.hash(password, 10);
    console.log(hashedPass)
    const user= await users.create({
        username,
        email,
        password: hashedPass
    })
    res.json({message: "User registered successfully"})
})
const userLogin=asynchandler(async(req, res)=>{
    const {email, password}=req.body;
    if(!email || !password)
    {
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const isUser=await users.findOne({email})
    if(isUser && bcrypt.compare(password, isUser.password))
    {
        const accessToken=jwt.sign({
            user:
            {
                username: isUser.username,
                email: isUser.email,
                id: isUser.id
            },
        }, process.env.Access_token,
        {expiresIn:"10m"})
        res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    
})

//@access is private
const currentUser=asynchandler(async(req, res)=>{
    res.json(req.user)
})

module.exports={userLogin, userRegister, currentUser}