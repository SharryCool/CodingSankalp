import mongoose from "mongoose";


const adminSchema=new mongoose.Schema({
    
    adminName:{
        type:String,
        required:true,
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true
    },
    adminMobileNo:{
        type:String,
        required:true,
        unique:true
    },
    adminPassword:{
        type:String,
        required:true
    }
    ,
    lastLoginDate:{
        type:Date,
        default:Date.now
    },
    loginHistory:[{
        type:Date,
        default:Date.now
    }]
})


const Admin=mongoose.model("cd_sankalp_admindetails",adminSchema)

export default Admin