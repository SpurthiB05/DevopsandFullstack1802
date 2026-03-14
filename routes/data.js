const express=require("express")
const router=express.Router()

const Data=require("../models/Data")

router.get("/all",async(req,res)=>{

const data=await Data.find()

res.json(data)

})

module.exports=router