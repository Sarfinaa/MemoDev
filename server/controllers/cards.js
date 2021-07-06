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
                  //const cards=await PostCard.find()
          const cards=await PostCard.find({creator:req.userId})
res.status(200).json({data:cards});
} catch(error){ 
res.status(404).json({message:error.message});
}
 }