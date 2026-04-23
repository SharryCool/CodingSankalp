import mongoose from "mongoose";

const testimonialSchema=new mongoose.Schema({
    name:{type:String,required:true},
    message:{type:String,required:true},
    imageUrl:{type:String,required:true},
    postion:{type:String,required:true},
    company:{type:String,required:true},

},{timestamps:true})

const Testimonial=mongoose.model("cd_sankalp_testimonials_details",testimonialSchema);
export default Testimonial;