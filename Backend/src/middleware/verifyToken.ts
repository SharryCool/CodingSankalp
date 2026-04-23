import jwt from "jsonwebtoken";
import type{ Request, Response, NextFunction } from "express";


interface extentedRequest extends Request{token?:any} 
const verifyToken=async(req:extentedRequest,res:Response,next:NextFunction)=>{
    try {
           const token = req.header("token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
        const decoded=jwt.verify(req.header("token")!, process.env.JWT_SECRET!) 
        if(!decoded) return res.status(401).json({message:"Unauthorized Access",success:false})

        req.token=decoded 
        next()

    } catch (error) {
        
        return res.status(401).json({message:"Unauthorized Access",success:false})
    }
}

export default verifyToken