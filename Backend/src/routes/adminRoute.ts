import express from "express"
const router=express.Router()
import { body } from "express-validator"
import { createNewAdmin, loginAdmin } from "../controller/adminController.js"

router.post("/create-new-admin",[
    body("adminName").isString().isLength({min:3,max:50}).withMessage("Name must be between 3 and 50 characters"),
    body("adminEmail").isEmail().withMessage("Invalid Email"),
    body("adminMobileNo").isMobilePhone("en-IN").withMessage("Invalid Mobile Number"),
    body("adminPassword").isStrongPassword().withMessage("Password must be strong"),
    body("adminConfirmPassword").isStrongPassword().withMessage("Password must be strong"),
    body("adminAuthPassword").isString().withMessage("Auth Password must be strong"),

],createNewAdmin)




router.post("/admin-login",[
    body("adminEmail").isEmail().withMessage("Invalid email"),
    body("adminPassword").isStrongPassword().withMessage("Password must be strong")
],loginAdmin)

export default router