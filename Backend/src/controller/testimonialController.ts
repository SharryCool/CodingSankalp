import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Admin from "../models/Admin.js";
import Testimonial from "../models/Testimonials.js";
import path from "path"
import fs from "fs"
interface ExtentedRequest extends Request {
  token?: any;
  file?: Express.Multer.File;
}

const getImageUrl = (req: Request, fileName: string) => {
  return `${req.protocol}://${req.get("host")}/static/uploads/testimonials/${fileName}`;
};

const checkAdmin = async (adminId: string) => {
  if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) return null;
  return await Admin.findById(adminId);
};
const uploadDir:string = path.join(process.cwd(), "static", "uploads", "testimonials");
const createTestimonial = async (req: ExtentedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
         if(fs.existsSync(path.join(uploadDir,req.file?.filename || ""))){
          
          fs.unlinkSync(path.join(uploadDir,req.file?.filename || ""));
        }
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const existAdmin = await checkAdmin(req.token?.adminId);

    if (!existAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const testimonial = new Testimonial({
      name: req.body.name,
      message: req.body.message,
      imageUrl: getImageUrl(req, req.file.filename),
      postion: req.body.postion,
      company: req.body.company,
    });

    await testimonial.save();

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error: any) {

      if(fs.existsSync(path.join(uploadDir,req.file?.filename || ""))){
          
          fs.unlinkSync(path.join(uploadDir,req.file?.filename || ""));
        }
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const fetchAllTestimonials = async (req: Request, res: Response) => {
  try {
    const { search = "", skip = 0, limit = 20 } = req.query;

    const query: any = {};

    if (search && typeof search === "string") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { postion: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Testimonial.countDocuments(query);

    const testimonials = await Testimonial.find(query)
      .sort({ _id: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      total,
      count: testimonials.length,
      testimonials,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const fetchSingleTestimonial = async (req: Request, res: Response) => {
  try {
    const { testimonial_id } = req.params;


    const testimonial = await Testimonial.findById(testimonial_id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial fetched successfully",
      testimonial,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateTestimonial = async (req: ExtentedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const existAdmin = await checkAdmin(req.token?.adminId);

    if (!existAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { testimonial_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(testimonial_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Testimonial ID",
      });
    }

    const existingTestimonial = await Testimonial.findById(testimonial_id);

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const updateData: any = {
      name: req.body.name ?? existingTestimonial.name,
      message: req.body.message ?? existingTestimonial.message,
      postion: req.body.postion ?? existingTestimonial.postion,
      company: req.body.company ?? existingTestimonial.company,
    };

    if (req.file?.filename) {
      updateData.imageUrl = getImageUrl(req, req.file.filename);
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonial_id,
      updateData,
      { new: true }
    );


    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const deleteTestimonial = async (req: ExtentedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const existAdmin = await checkAdmin(req.token?.adminId);

    if (!existAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { testimonial_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(testimonial_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Testimonial ID",
      });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonial_id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

export {
  createTestimonial,
  fetchAllTestimonials,
  fetchSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};