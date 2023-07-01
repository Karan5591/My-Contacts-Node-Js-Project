const express= require("express")
const router= express.Router();
const controllers= require("../Controllers/contactController");
const validateToken = require("../Middleware/ValidateToken");

router.use(validateToken);
router.get("/", controllers.getAllContacts )
router.get("/:id", controllers.getSingleContact)


router.post("/", controllers.addNewContact)

router.put("/:id", controllers.updateContact)

router.delete("/:id", controllers.deleteContact)

module.exports=router;