const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

/* Register */

router.post("/register",async(req,res)=>{

const hash = await bcrypt.hash(req.body.password,10);

const user = new User({
username:req.body.username,
password:hash
});

await user.save();

res.json({message:"User Created"});
});

/* Login */

router.post("/login",async(req,res)=>{

const user = await User.findOne({username:req.body.username});

if(!user){
return res.json({message:"User not found"});
}

const valid = await bcrypt.compare(req.body.password,user.password);

if(!valid){
return res.json({message:"Wrong password"});
}

req.session.user = user;

res.json({message:"Login success"});
});

/* Logout */

router.get("/logout",(req,res)=>{
req.session.destroy();
res.json({message:"Logged out"});
});

module.exports = router;