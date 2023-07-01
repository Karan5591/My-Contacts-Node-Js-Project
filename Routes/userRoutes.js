const express= require("express")
const userController= require("../Controllers/userController")
const validateToken= require("../Middleware/ValidateToken")
const router= express.Router()

router.post("/register", userController.userRegister)

router.post("/login", userController.userLogin)
router.get("/current",validateToken, userController.currentUser)


module.exports=router;