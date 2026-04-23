import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import CourseDetailPage from "../models/CourseDetailPage.js";
import Admin from "../models/Admin.js";

interface ExtendedRequest extends Request {
  token?: any;
}

const deletePhysicalFile = (filePath: string) => {
  try {
    if (!filePath || typeof filePath !== "string") return;

    // only delete local uploaded files
    if (!filePath.startsWith("/static/uploads/course-detail/")) return;

    const absolutePath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error("File delete error:", error);
  }
};

const getCourseFiles = (course: any): string[] => {
  if (!course) return [];

  const files: string[] = [];

  if (course.banner_image) files.push(course.banner_image);
  if (course.syllabus_pdf) files.push(course.syllabus_pdf);

  if (Array.isArray(course.instructors)) {
    for (const instructor of course.instructors) {
      if (instructor?.image) files.push(instructor.image);
    }
  }

  if (Array.isArray(course.video_testimonials)) {
    for (const item of course.video_testimonials) {
      if (item?.thumbnail) files.push(item.thumbnail);

      if (item?.video_type === "upload" && item?.video) {
        files.push(item.video);
      }
    }
  }

  return [...new Set(files)];
};

const getRemovedFiles = (oldCourse: any, newData: any): string[] => {
  const oldFiles = new Set(getCourseFiles(oldCourse));
  const newFiles = new Set(getCourseFiles(newData));
  const removedFiles: string[] = [];

  for (const file of oldFiles) {
    if (!newFiles.has(file)) {
      removedFiles.push(file);
    }
  }

  return removedFiles;
};

const uploadSingleCourseDetailFile = async (req: ExtendedRequest, res: Response) => {
  try {
    const exist_admin = await Admin.findOne({ _id: req.token.adminId });
    if (!exist_admin) {
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "File is required",
        success: false,
      });
    }

    let filePath = "";
    let file_type = "";

    if (file.fieldname === "image") {
      filePath = `/static/uploads/course-detail/images/${file.filename}`;
      file_type = "image";
    } else if (file.fieldname === "video") {
      filePath = `/static/uploads/course-detail/videos/${file.filename}`;
      file_type = "video";
    } else if (file.fieldname === "pdf") {
      filePath = `/static/uploads/course-detail/pdfs/${file.filename}`;
      file_type = "pdf";
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      success: true,
      data: {
        file_type,
        file_path: filePath,
        original_name: file.originalname,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const createCourseDetailPage = async (req: ExtendedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
        errors: errors.array(),
      });
    }

    const exist_admin = await Admin.findOne({ _id: req.token.adminId });
    if (!exist_admin) {
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    const {
      title,
      short_description,
      full_description,
      banner_image,
      category,
      level,
      price,
      old_price,
      discount_percentage,
      average_rating,
      total_ratings,
      total_learners,
      total_duration,
      instructors,
      competencies,
      prerequisites,
      includes,
      program_overview,
      syllabus_pdf,
      video_testimonials,
      is_active,
      is_featured,
      last_updated_text,
    } = req.body;

    const newCourseDetailPage = new CourseDetailPage({
      admin_id: req.token.adminId,
      title,
      short_description,
      full_description,
      banner_image,
      category,
      level,
      price,
      old_price,
      discount_percentage,
      average_rating,
      total_ratings,
      total_learners,
      total_duration,
      instructors,
      competencies,
      prerequisites,
      includes,
      program_overview,
      syllabus_pdf,
      video_testimonials,
      is_active,
      is_featured,
      last_updated_text,
    });

    await newCourseDetailPage.save();

    return res.status(201).json({
      message: "Course detail page created successfully",
      success: true,
      data: newCourseDetailPage,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const fetchAllCourseDetailPages = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 20;
    const is_active = req.query.is_active as string | undefined;
    const is_featured = req.query.is_featured as string | undefined;

    const query: any = {};

    if (search.trim()) {
      query.$text = { $search: search.trim() };
    }

    if (is_active === "true") query.is_active = true;
    if (is_active === "false") query.is_active = false;

    if (is_featured === "true") query.is_featured = true;
    if (is_featured === "false") query.is_featured = false;

    const coursePages = await CourseDetailPage.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CourseDetailPage.countDocuments(query);

    return res.status(200).json({
      message: "Course detail pages fetched successfully",
      success: true,
      total,
      data: coursePages,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const fetchActiveCourseDetailPages = async (req: Request, res: Response) => {
  try {
    const coursePages = await CourseDetailPage.find({ is_active: true });

    return res.status(200).json({
      message: "Active course detail pages fetched successfully",
      success: true,
      data: coursePages,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const fetchSingleCourseDetailPage = async (req: Request, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
        errors: errors.array(),
      });
    }

    const { _id } = req.body;

    const findCoursePage = await CourseDetailPage.findOne({ _id });

    if (!findCoursePage) {
      return res.status(404).json({
        message: "Course detail page not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course detail page fetched successfully",
      success: true,
      data: findCoursePage,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const updateCourseDetailPage = async (req: ExtendedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
        errors: errors.array(),
      });
    }

    const exist_admin = await Admin.findOne({ _id: req.token.adminId });
    if (!exist_admin) {
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    const { _id } = req.body;

    const findCoursePage = await CourseDetailPage.findOne({ _id, admin_id: req.token.adminId });

    if (!findCoursePage) {
      return res.status(404).json({
        message: "Course detail page not found",
        success: false,
      });
    }

    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.admin_id;

    const mergedCourseObject = {
      ...findCoursePage.toObject(),
      ...updateData,
    };

    const removedFiles = getRemovedFiles(findCoursePage.toObject(), mergedCourseObject);

    const updatedCoursePage = await CourseDetailPage.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    for (const file of removedFiles) {
      deletePhysicalFile(file);
    }

    return res.status(200).json({
      message: "Course detail page updated successfully",
      success: true,
      data: updatedCoursePage,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

const deleteCourseDetailPage = async (req: ExtendedRequest, res: Response) => {
  try {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
        errors: errors.array(),
      });
    }

    const exist_admin = await Admin.findOne({ _id: req.token.adminId });
    if (!exist_admin) {
      return res.status(401).json({ message: "Unauthorized Access", success: false });
    }

    const { _id } = req.body;

    const findCoursePage = await CourseDetailPage.findOne({ _id, admin_id: req.token.adminId });

    if (!findCoursePage) {
      return res.status(404).json({
        message: "Course detail page not found",
        success: false,
      });
    }

    const courseFiles = getCourseFiles(findCoursePage);

    await CourseDetailPage.findByIdAndDelete(_id);

    for (const file of courseFiles) {
      deletePhysicalFile(file);
    }

    return res.status(200).json({
      message: "Course detail page deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      success: false,
    });
  }
};

export {
  uploadSingleCourseDetailFile,
  createCourseDetailPage,
  fetchAllCourseDetailPages,
  fetchActiveCourseDetailPages,
  fetchSingleCourseDetailPage,
  updateCourseDetailPage,
  deleteCourseDetailPage,
};