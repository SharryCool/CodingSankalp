import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid4 } from "uuid";
import type { Request } from "express";

const imageDir = path.join(process.cwd(), "static", "uploads", "course-detail", "images");
const videoDir = path.join(process.cwd(), "static", "uploads", "course-detail", "videos");
const pdfDir = path.join(process.cwd(), "static", "uploads", "course-detail", "pdfs");

[imageDir, videoDir, pdfDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    if (file.fieldname === "image") return cb(null, imageDir);
    if (file.fieldname === "video") return cb(null, videoDir);
    if (file.fieldname === "pdf") return cb(null, pdfDir);

    return cb(new Error("Invalid file field"), "");
  },

  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const ext = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}-${uuid4()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const imageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const videoMimeTypes = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",
  ];

  const pdfMimeTypes = ["application/pdf"];

  if (file.fieldname === "image") {
    if (imageMimeTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only image files are allowed"));
  }

  if (file.fieldname === "video") {
    if (videoMimeTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only video files are allowed"));
  }

  if (file.fieldname === "pdf") {
    if (pdfMimeTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only PDF files are allowed"));
  }

  return cb(new Error("Invalid file field"));
};

const uploadCourseDetailAssets = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});

export default uploadCourseDetailAssets;