import Contact from "../models/Contact.js";
import type{ Request, Response, NextFunction } from "express";
import express from "express";
import { body, validationResult } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";
import { create_new_contact, fetch_all_contact } from "../controller/contactController.js";

const router=express.Router();
router.post("/create-new-contact",
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("mobile").isString().withMessage("Country code must be a string"),
    body("message").isString().withMessage("Message must be a string"),
    create_new_contact
   )



router.post("/fetch-all-contacts",[
    body("search").optional().isString().withMessage("Search must be a string"),
    body("skip").isNumeric().withMessage("Skip must be a number")
],verifyToken,fetch_all_contact as any
)


export default router;