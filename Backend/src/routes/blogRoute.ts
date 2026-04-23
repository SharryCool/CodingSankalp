

// const express=require("express")
// const router=express.Router()
// const { body, validationResult } = require('express-validator');
// const fetchadmin=require("../middleware/fetchadmin")

// const multer = require("multer");
// const {v4 : uuid4}=require("uuid");
// const path = require("path");
// const fs = require("fs");
// const Blog = require("../model/Blog");
// const { create_new_blog, delete_blog, fetch_all_blogs } = require("../controller/blogsController");


import express from "express"
import { body } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";
import multer from "multer";
import {v4 as uuid4} from "uuid"
import path from "path"
import fs from "fs"
import {create_new_blog,delete_blog,fetch_all_blogs, fetchSingleBlog} from "../controller/blogsController.js"
import type {Request,Response} from "express"
const router=express.Router();

const uploadDir = path.join(process.cwd(), "static", "blogs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}-${uuid4()}${ext}`);
  }
})



const upload = multer({ storage: storage })




router.post(
  "/create-new-blog",
  verifyToken,
  upload.single("file"),

  // ✅ parse FormData JSON string to array BEFORE validators
  (req: Request, res: Response, next: any) => {
    if (typeof req.body.content === "string") {
      try {
        req.body.content = JSON.parse(req.body.content);
      } catch (e) {
        return res
          .status(400)
          .json({ message: "Invalid content format", success: false });
      }
    }
    next();
  },

  [
    body("image")
      .notEmpty().withMessage("image is required")
      .isString().withMessage("image must be a string")
      .trim(),

    body("title")
      .notEmpty().withMessage("title is required")
      .isString().withMessage("title must be a string")
      .isLength({ min: 5, max: 100 }).withMessage("title must be 5 to 100 characters")
      .trim(),

    body("author")
      .notEmpty().withMessage("author is required")
      .isString().withMessage("author must be a string")
      .isLength({ min: 3, max: 100 }).withMessage("author must be 3 to 100 characters")
      .trim(),

    body("content")
      .notEmpty().withMessage("content is required")
      .isArray({ min: 1 }).withMessage("content must be a non-empty array"),

    body("content.*.headline")
      .notEmpty().withMessage("content headline is required")
      .isString().withMessage("content headline must be a string")
      .isLength({ min: 5 }).withMessage("content headline must be at least 5 characters")
      .trim(),

    body("content.*.description")
      .notEmpty().withMessage("content description is required")
      .isString().withMessage("content description must be a string")
      .isLength({ min: 10 }).withMessage("content description must be at least 10 characters")
      .trim(),
  ],
  create_new_blog
);

router.delete("/delete-publication",verifyToken,[body("_id","Enter the valid id").isMongoId()],delete_blog)




router.post("/fetch-all-publication",fetch_all_blogs)


router.post("/fetch-single-blog",[body("_id","Enter the valid id").isMongoId()],fetchSingleBlog)
export default router;