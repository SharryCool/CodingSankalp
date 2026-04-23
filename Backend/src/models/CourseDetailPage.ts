import mongoose from "mongoose";

const competencySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const videoTestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      default: "",
      trim: true,
    },
    video_type: {
      type: String,
      enum: ["upload", "youtube", "vimeo"],
      default: "upload",
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
    short_text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const programOverviewSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const courseDetailPageSchema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin_details",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    short_description: {
      type: String,
      required: true,
      trim: true,
    },

    full_description: {
      type: String,
      required: true,
      trim: true,
    },

    banner_image: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    old_price: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount_percentage: {
      type: Number,
      default: 0,
      min: 0,
    },

    average_rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    total_ratings: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_learners: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_duration: {
      type: String,
      default: "",
      trim: true,
    },

    instructors: {
      type: [instructorSchema],
      default: [],
      validate: {
        validator: function (value: any[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one instructor is required",
      },
    },

    competencies: {
      type: [competencySchema],
      default: [],
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    includes: {
      type: [String],
      default: [],
    },

    program_overview: {
      type: [programOverviewSchema],
      default: [],
    },

    syllabus_pdf: {
      type: String,
      default: "",
      trim: true,
    },

    video_testimonials: {
      type: [videoTestimonialSchema],
      default: [],
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    last_updated_text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

courseDetailPageSchema.index({
  title: "text",
  short_description: "text",
  category: "text",
});

const CourseDetailPage = mongoose.model(
  "cd_sankalp_course_detail_pages",
  courseDetailPageSchema
);

export default CourseDetailPage;