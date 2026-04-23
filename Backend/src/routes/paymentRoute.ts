
import express from 'express'
import Razorpay from 'razorpay';

const router = express.Router()
import type { Request,Response } from 'express'
import CourseDetailPage from '../models/CourseDetailPage.js';

import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import PaymentPurchase from '../models/PaymentPurchase.js';
import { body, validationResult } from 'express-validator';

router.post("/create-order",[
    body("course_id").isString().withMessage("Course Id must be a string"),
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("mobile_no").isString().withMessage("Mobile number must be a string"),
    body("address").isString().withMessage("Address must be a string"),
    body("state").isString().withMessage("State must be a string"),
    body("country").isString().withMessage("Country must be a string"),
    body("pincode").isString().withMessage("Pincode must be a string"),
    body("city").isString().withMessage("City must be a string"),
],async(req:Request,res:Response)=>{
try {
 
    
    const {course_id,name,email,mobile_no,address,state,country,pincode,city}=req.body

    const exist_course=await CourseDetailPage.findOne({_id:course_id})

    if(!exist_course){
        return res.status(400).json({message:"Course Not Found",success:false})
    }

    const instance = new Razorpay({ key_id: process.env.RAZORPAY_ID!, key_secret: process.env.RAZORPAY_SECRET! })


    const total_course_price=Number(exist_course.price) * 100
    const gst_amount=Number((total_course_price * 18) / 100).toFixed(0)
    const convience_fee=Number(((total_course_price+Number(gst_amount)) * 3) / 100).toFixed(0)

    const total_amount=Number(total_course_price + Number(gst_amount) + Number(convience_fee)).toFixed(0)


const order = await instance.orders.create({
  amount: total_amount ,
  currency: "INR",

  notes: {
    key1: exist_course.title,
    key2: exist_course.category,
    key3: exist_course.short_description,
    key4:name,
    key5:email,
    key6:mobile_no,
    key7:address,
    key8:state,
    key9:country,
    key10:pincode,
    key11:city
  }
})

return res.status(200).json({message:"Order Created Successfully",success:true,data:order})
} catch (error) {
    
    return res.status(500).json({message:"Internal Server Error",success:false})
}
    
})


router.post("/order-payment-verify",[
    body("razorpayOrderId").isString().withMessage("Razorpay Order Id is required"),
    body("razorpayPaymentId").isString().withMessage("Razorpay Payment Id is required"),
    body("razorpaySignature").isString().withMessage("Razorpay Signature is required"),
    body("course_id").isString().withMessage("Course Id is required"),
    body("name").isString().withMessage("Name is required"),
    body("email").isString().withMessage("Email is required"),
    body("mobile_no").isString().withMessage("Mobile No is required"),
    body("address").isString().withMessage("Address is required"),
    body("state").isString().withMessage("State is required"),
    body("country").isString().withMessage("Country is required"),
    body("pincode").isString().withMessage("Pincode is required"),
    body("city").isString().withMessage("City is required"),
],async(req:Request,res:Response)=>{
    try {
        
        const errors:any=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()[0].msg,success:false})
        }
        const {razorpayOrderId,razorpayPaymentId,razorpaySignature,course_id,name,email,mobile_no,address,state,country,pincode,city}=req.body
      

        const flag=validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, razorpaySignature, process.env.RAZORPAY_SECRET!);

if(!flag){
    return res.status(400).json({message:"Payment Verification Failed",success:false})
}

const newPurchase=await PaymentPurchase.create({razorpayOrderId,razorpayPaymentId,razorpaySignature,course_id,name,email,mobile_no,address,state,country,pincode,city})

if(!newPurchase){
    return res.status(400).json({message:"Payment Verification Failed",success:false})
}


return res.status(200).json({message:"Payment Verified Successfully",success:true})
    } catch (error) {
        
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
})


router.post("/fetch-all-purchases",[
    body("search").optional().isString().withMessage("Search must be string"),
    body("skip").optional().isNumeric().withMessage("Skip must be number"),
],async(req:Request,res:Response)=>{
    try {
        
        const {search,skip}=req.body

         interface searchQuery{
            $text?:{$search:string}
        }
        const query:searchQuery={};
        if(search) query.$text={$search:`"${search}"`}
        
        const data=await PaymentPurchase.find(query as any).sort({_id:-1}).skip(skip).limit(100);
        

        return res.status(200).json({message:"Purchases fetched successfully",success:true,data})

    } catch (error) {
        
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
})
export default router