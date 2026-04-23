import express from "express";
import { body, query, param } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";
import uploadTestimonialImage from "../middleware/uploadTestimonialImage.js";
import {
  createTestimonial,
  fetchAllTestimonials,
  fetchSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/testimonialController.js";

const router = express.Router();

router.post(
  "/create-testimonial",
  verifyToken,
  uploadTestimonialImage.single("image"),
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters"),

    body("message")
      .isString()
      .trim()
      .isLength({ min: 5, max: 2000 })
      .withMessage("Message must be between 5 and 2000 characters"),

    body("postion")
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Postion must be between 2 and 100 characters"),

    body("company")
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Company must be between 2 and 100 characters"),
  ],
  createTestimonial as any
);

router.get(
  "/fetch-all-testimonials",
  [
    query("search").optional().isString().withMessage("Search must be string"),
    query("skip").optional().isNumeric().withMessage("Skip must be number"),
    query("limit").optional().isNumeric().withMessage("Limit must be number"),
  ],
  fetchAllTestimonials
);

router.get(
  "/fetch-testimonial-by-id/:testimonial_id",
  [
    param("testimonial_id")
      .isMongoId()
      .withMessage("Invalid Testimonial ID"),
  ],
  fetchSingleTestimonial
);

router.put(
  "/update-testimonial",
  verifyToken,
  uploadTestimonialImage.single("image"),
  [
    body("testimonial_id")
      .isMongoId()
      .withMessage("Valid Testimonial ID is required"),

    body("name")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters"),

    body("message")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 5, max: 2000 })
      .withMessage("Message must be between 5 and 2000 characters"),

    body("postion")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Postion must be between 2 and 100 characters"),

    body("company")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Company must be between 2 and 100 characters"),
  ],
  updateTestimonial as any
);

router.delete(
  "/delete-testimonial",
  verifyToken,
  [
    body("testimonial_id")
      .isMongoId()
      .withMessage("Valid Testimonial ID is required"),
  ],
  deleteTestimonial as any
);

export default router;