const User=require("../models/User");
//const bcrypt=require("bcrypt.js");

const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
       return res.status(404).json({message:"User Not Find"})
    }
    return res.status(200).json({users})
    
}
const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});

    }catch(err){
       return   console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exist! Login Instead"})
    }
    //const hashedPassword=bcrypt.hashSync(password)
    const user=new User({
        name,
        email,
        password,
        leads:[],

    })

    try{
         await user.save()
    }
    catch(err){
        console.log(err);
    }
    return res.status(201).json({user})
}

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});

    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"couldnot found the user"})
    }
     
   // const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!password===existingUser.password){
        return res.status(400).json({message:"Incorrect password"})
    }
    return res.status(200).json({message:"login successfully",user:existingUser})
}
module.exports={getAllUser,signup,login}
