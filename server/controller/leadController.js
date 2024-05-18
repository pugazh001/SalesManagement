const Lead=require("../models/lead");
const mongoose=require("mongoose");
const User=require("../models/User")


const getAllLead=async(req,res,next)=>{

    let leads;
    try{
        leads=await Lead.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!leads){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({leads})


}
const createInformation=async(req,res,next)=>{
    const{name,email,mobile,productOfInterst,user}=req.body;
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const lead=new Lead({
        name,
        email,
        mobile,
        productOfInterst,
        user
        
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await lead.save({ session });
        existingUser.leads.push(lead);
        await existingUser.save({ session });
         await session.commitTransaction();
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message:"err vanthu", err });
    }
    return res.status(200).json({lead})


}

const updateLead=async(req,res,next)=>{
    const{name,email,mobile,productOfInterst}=req.body;
    const leadId=req.params.id;
    let lead;
    try{
        lead=await Lead.findByIdAndUpdate(leadId,{
            name,
            email,
            mobile,
            productOfInterst
        })
    } catch(err){
        return console.log("err vanthu backend ",err);
    }  
    if(!lead){
        return res.status(500).json({message:"Unable To Update the Blog"})
    } 
    return res.status(200).json({lead})
}

const getById=async(req,res,next)=>{

    const id=req.params.id
    let lead;
    try{
        lead=await Lead.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!lead){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({lead});
}

const deleteLead=async(req,res,next)=>{
     const id=req.params.id;

     let lead;
     try{
        lead=await Lead.findByIdAndDelete(id).populate('user');
        await lead.user.leads.pull(lead)
        await blog.user.save();
     }catch(err){
        return console.log();
     }
     if(!lead){
        return res.status(500).json({message:"unble to delete"})
     }
            return res.status(200).json({message:"successfully deleted"})
}

const getByUserId=async(req,res,next)=>
{
    const userId=req.params.id;
    let userLeads;
    try{
         userLeads=await User.findById(userId).populate('leads');

    }catch(err){
       return console.log(err);
    }
    if(!userLeads){
        return res.status(404).json({message:"no Blog Found"})
    }
    return res.status(200).json({message:userLeads})

}
module.exports={createInformation,getAllLead,updateLead,getById,deleteLead,getByUserId}