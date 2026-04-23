import express from "express";
import { body, query } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";
import uploadCourseDetailAssets from "../middleware/uploadCourseDetailAssets.js";
import {
  uploadSingleCourseDetailFile,
  createCourseDetailPage,
  fetchAllCourseDetailPages,
  fetchActiveCourseDetailPages,
  fetchSingleCourseDetailPage,
  updateCourseDetailPage,
  deleteCourseDetailPage,
} from "../controller/courseDetailPageController.js";

const router = express.Router();

router.post(
  "/upload-course-detail-image",
  verifyToken,
  uploadCourseDetailAssets.single("image"),
  uploadSingleCourseDetailFile
);

router.post(
  "/upload-course-detail-video",
  verifyToken,
  uploadCourseDetailAssets.single("video"),
  uploadSingleCourseDetailFile
);

router.post(
  "/upload-course-detail-pdf",
  verifyToken,
  uploadCourseDetailAssets.single("pdf"),
  uploadSingleCourseDetailFile
);

router.post(
  "/create-course-detail-page",
  [
    verifyToken,
    body("title").isString().withMessage("Title is required"),
    body("short_description").isString().withMessage("Short description is required"),
    body("full_description").isString().withMessage("Full description is required"),
    body("banner_image").isString().withMessage("Banner image is required"),
    body("category").isString().withMessage("Category is required"),
    body("level")
      .optional()
      .isIn(["beginner", "intermediate", "advanced"])
      .withMessage("Invalid level"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("old_price").optional().isNumeric().withMessage("Old price must be numeric"),
    body("discount_percentage").optional().isNumeric().withMessage("Discount percentage must be numeric"),
    body("average_rating").optional().isNumeric().withMessage("Average rating must be numeric"),
    body("total_ratings").optional().isNumeric().withMessage("Total ratings must be numeric"),
    body("total_learners").optional().isNumeric().withMessage("Total learners must be numeric"),
    body("total_duration").optional().isString().withMessage("Total duration must be string"),

    body("instructors").isArray({ min: 1 }).withMessage("At least one instructor is required"),
    body("instructors.*.name").isString().withMessage("Instructor name is required"),
    body("instructors.*.role").isString().withMessage("Instructor role is required"),
    body("instructors.*.image").isString().withMessage("Instructor image is required"),
    body("instructors.*.bio").optional().isString().withMessage("Instructor bio must be string"),

    body("competencies").optional().isArray().withMessage("Competencies must be an array"),
    body("prerequisites").optional().isArray().withMessage("Prerequisites must be an array"),
    body("includes").optional().isArray().withMessage("Includes must be an array"),
    body("program_overview").optional().isArray().withMessage("Program overview must be an array"),
    body("syllabus_pdf").optional().isString().withMessage("Syllabus pdf must be string"),
    body("video_testimonials").optional().isArray().withMessage("Video testimonials must be an array"),
  ],
  createCourseDetailPage
);

router.get(
  "/fetch-all-course-detail-pages",
  [
    query("search").optional().isString().withMessage("Search must be string"),
    query("skip").optional().isNumeric().withMessage("Skip must be number"),
    query("limit").optional().isNumeric().withMessage("Limit must be number"),
    query("is_active").optional().isIn(["true", "false"]).withMessage("is_active must be true or false"),
    query("is_featured").optional().isIn(["true", "false"]).withMessage("is_featured must be true or false"),
  ],
  fetchAllCourseDetailPages
);

router.get("/fetch-active-course-detail-pages", fetchActiveCourseDetailPages);

router.post(
  "/fetch-single-course-detail-page",
  [body("_id").isMongoId().withMessage("Enter valid course detail page id")],
  fetchSingleCourseDetailPage
);

router.put(
  "/update-course-detail-page",
  [
    verifyToken,
    body("_id").isMongoId().withMessage("Enter valid course detail page id"),
  ],
  updateCourseDetailPage
);

router.post(
  "/delete-course-detail-page",
  [
    verifyToken,
    body("_id").isMongoId().withMessage("Enter valid course detail page id"),
  ],
  deleteCourseDetailPage
);

export default router;