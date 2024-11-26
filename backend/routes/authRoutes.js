const express=require("express")
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const jwt_secrete=process.env.JWT_SECRETE

const User=require("../models/User")

router.post("/register",async(req,res)=>{
  try{
    const {username,email,password}=req.body;
    console.log(username);
    const alreadyuser= await User.findOne({email});
    if(alreadyuser){
        return res.json("User already exists");
    }
    const hashedpassword=bcrypt.hash(password,10);
     const newUser=new User({
        username,email,password:hashedpassword
     })
      await newUser.save();

      const token=jwt.sign(jwt_secrete,{email},{expiresIn:'3h'})
     return res.json({token})

  }
  catch(err){
    console.log(err);
    res.status(500).send("Server Error");
  }
  
})


router.post("/login",async(req,res)=>{
   try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json("Invalid credentials");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json("Invalid credentials");
    }
    const token=jwt.sign(jwt_secrete,{id:username._id},{expiresIn:'3h'})
    return res.json({token})

   }
   catch(err){
    console.log(err);
    res.status(500).json("internal server error");
   }
})


module.exports=router;


