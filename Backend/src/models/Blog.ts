import mongoose from "mongoose";

const contentSchema=new mongoose.Schema({
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
const blogSchema= new mongoose.Schema({

   admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cd_sankalp_admindetails',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true
    
    },
    content:{
        type:[contentSchema],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    
    }
})

const Blog=mongoose.model("cd_sankalp_blogs",blogSchema)
export default Blog;