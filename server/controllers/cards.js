import mongoose from 'mongoose';
import PostCard from '../models/postCard.js';
export const createCard=async (req,res)=>{
    //sendinng data to this page and req.body contains those data thats why we are storing it
const post=req.body;
const newCard=new PostCard({...post,creator:req.userId});
 try{
await newCard.save();
res.status(201).json(newCard);
}catch(error){
res.status(409).json({message:error.message});
}
 }

 export const getCards= async (req,res)=>{
    try{
          const cards=await PostCard.find({creator:req.userId})
res.status(200).json({data:cards});
} catch(error){ 
res.status(404).json({message:error.message});
}
 }
 export const deleteCard = async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).send('No post with that Id');
       }
    
       await PostCard.findByIdAndRemove(id);
       res.json({message:'Post deleted successfully'});
}
export const updateCard=async(req,res)=>{
   const {id:_id}=req.params;
   const post=req.body;
   if(!mongoose.Types.ObjectId.isValid(_id)) {
   return res.status(404).send('No post with that Id');
   }
 const updatedCard= await PostCard.findByIdAndUpdate(_id,{...post,_id},{new:true});
 res.json(updatedCard);
}