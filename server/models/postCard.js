import mongoose from 'mongoose';
//creating database schemna
const cardSchema =mongoose.Schema({
    language:String,
    selected:String,
    name:String,
    text:String,
    creator:String,
    wul:String,
});
const PostCard=mongoose.model('PostCard',cardSchema);
export default PostCard;