const asynchandler= require("express-async-handler")
const Contact= require("../models/contactModel")
// Get all the contacts
// access public

const getAllContacts=asynchandler(async(req, res)=>{
    const contacts= await Contact.find({user_id: req.user.id});
    res.json(contacts)
})

const getSingleContact=asynchandler(async(req, res)=>{
    const contact= await Contact.findById(req.params.id);
    
    if(!contact)
    {
        res.status(404)
        throw new Error ("contact not found")
    }
    else{
        res.json(contact)
    }
    
})

const addNewContact=asynchandler(async(req, res)=>{
    
    const {name, email, phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All field are mandatory")
    }
    else
    {
        const contact= await Contact.create({
            name, email, phone, user_id:req.user.id
        })
        res.json(contact)
    }
    
})

const updateContact=asynchandler(async(req, res)=>{
    const contact= await Contact.findById(req.params.id)
    console.log("update contact="+ contact.id)
    if(!contact)
    {
        res.status(404);
        throw new Error ("contact not found");
    }
    console.log(contact.user_id)
    console.log(req.user.id)
    if(contact.user_id.toString() !==req.user.id)
    {
        res.status(403)
        throw new Error("You are not authorized to update data")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact)
})

const deleteContact=asynchandler(async(req, res)=>{
    const contact= await Contact.findById(req.params.id)
    console.log(contact)
    if(!contact)
    {
        res.status(404);
        throw new Error ("Contact not found");
    }
    if(contact.user_id.toString() !==req.user.id)
    {
        res.status(403)
        throw new Error("You are not authorized to delete data")
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json("Deleted")
})

module.exports={deleteContact, addNewContact, getAllContacts, getSingleContact, updateContact}