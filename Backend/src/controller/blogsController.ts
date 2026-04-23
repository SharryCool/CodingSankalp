




import express from "express"
import { body, validationResult } from "express-validator";
import multer from "multer";
const router=express.Router();
import {v4 as uuid4} from "uuid"
import path from "path"
import fs from "fs"
import Blog from "../models/Blog.js"
import Admin from "../models/Admin.js"
import type {Request,Response} from "express"


const uploadDir:string = path.join(process.cwd(), "static", "blogs");


interface ExtendedRequest extends Request {
  token?: any;
  file?: any;
}

const create_new_blog=async (req:ExtendedRequest,res:Response) => {
  
  try {

    const errors:any = validationResult(req);
    if (!errors.isEmpty()) {
       if(fs.existsSync(path.join(uploadDir,req.file.filename))){
      
      fs.unlinkSync(path.join(uploadDir,req.file.filename));
    }
      return res.status(400).json({ message: errors.array()[0].msg, success: false });
    }

    const existAdmin = await Admin.findOne({ _id: req.token.adminId });
    if (!existAdmin) {
       if(fs.existsSync(path.join(uploadDir,req.file.filename))){
      
      fs.unlinkSync(path.join(uploadDir,req.file.filename));
    }
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    const {  title, author, content } = req.body;

    const imgURL = `${process.env.BASE_URL}/static/blogs/${req.file.filename}`;

    const newBlog = new Blog({
     admin_id: req.token.adminId,
      image: imgURL,
      title,
      author,
      content,
    });

    await newBlog.save();

    return res.status(200).json({ message: "Blog Created Successfully", success: true });

  } catch (error) {
    
    console.log(error);

    if(fs.existsSync(path.join(uploadDir,req.file.filename))){
      
      fs.unlinkSync(path.join(uploadDir,req.file.filename));
    }
    
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
}


const delete_blog=async(req:ExtendedRequest,res:Response)=>{
  try {

            function getFileName(url:any) {
  return url.split("/").pop();
}

    const errors:any = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg,success:false });
    }

    const existAdmin=await Admin.findOne({_id:req.token.adminId})
    if(!existAdmin){
      return res.status(401).json({message:"Unauthorized Access",success:false})
    }

    const {_id}=req.body
    const findBlog=await Blog.findOneAndDelete({_id})
    if(!findBlog){
      return res.status(400).json({message:"Blog Not Found",success:false})
    }

    if(fs.existsSync(path.join(process.cwd(),'static','blogs',getFileName(findBlog.image)))){
      
      fs.unlinkSync(path.join(process.cwd(),'static','blogs',getFileName(findBlog.image)));
    }

    return res.status(200).json({message:"Blog Deleted Successfully",success:true})
    
  } catch (error) {
    
    return res.status(500).json({message:"Internal Server Error",success:false})
  }
}



const fetch_all_blogs=async(req:ExtendedRequest,res:Response)=>{
  try {
    
    
    const blogs=await Blog.find().sort({_id:-1})
    if(!blogs){
      return res.status(400).json({message:"Blog Not Found",success:false})
    }

    return res.status(200).json({message:"Blog Deleted Successfully",success:true,data:blogs})
  } catch (error) {
    
    return res.status(500).json({message:"Internal Server Error",success:false})
  }
}


const fetchSingleBlog=async(req:ExtendedRequest,res:Response)=>{
  try {
    const errors:any = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg,success:false });
    }

    const {_id}=req.body
    const findBlog=await Blog.findOne({_id})
    if(!findBlog){
      return res.status(400).json({message:"Blog Not Found",success:false})
    }

    return res.status(200).json({message:"Blog Deleted Successfully",success:true,data:findBlog})
  } catch (error) {
    
    return res.status(500).json({message:"Internal Server Error",success:false})
  }
}


export {create_new_blog,delete_blog,fetch_all_blogs,fetchSingleBlog}

