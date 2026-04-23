"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Cropper from "react-easy-crop";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";

type Competency = {
  title: string;
  description: string;
};

type ProgramOverview = {
  label: string;
  value: string;
};

type Instructor = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

type VideoTestimonial = {
  name: string;
  role: string;
  thumbnail: string;
  video_type: "upload" | "youtube" | "vimeo";
  video: string;
  short_text: string;
};

type CourseDetail = {
  _id?: string;
  title: string;
  short_description: string;
  full_description: string;
  banner_image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  old_price: number;
  discount_percentage: number;
  average_rating: number;
  total_ratings: number;
  total_learners: number;
  total_duration: string;
  instructors: Instructor[];
  competencies: Competency[];
  prerequisites: string[];
  includes: string[];
  program_overview: ProgramOverview[];
  syllabus_pdf: string;
  video_testimonials: VideoTestimonial[];
  is_active: boolean;
  is_featured: boolean;
  last_updated_text: string;
};

type CroppingTarget =
  | { type: "banner" }
  | { type: "instructor"; index: number }
  | { type: "testimonial-thumbnail"; index: number }
  | null;

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

const emptyInstructor = (): Instructor => ({
  name: "",
  role: "",
  image: "",
  bio: "",
});

const emptyVideoTestimonial = (): VideoTestimonial => ({
  name: "",
  role: "",
  thumbnail: "",
  video_type: "upload",
  video: "",
  short_text: "",
});

const initialCourseState: CourseDetail = {
  title: "",
  short_description: "",
  full_description: "",
  banner_image: "",
  category: "",
  level: "beginner",
  price: 0,
  old_price: 0,
  discount_percentage: 0,
  average_rating: 0,
  total_ratings: 0,
  total_learners: 0,
  total_duration: "",
  instructors: [emptyInstructor()],
  competencies: [{ title: "", description: "" }],
  prerequisites: [""],
  includes: [""],
  program_overview: [{ label: "", value: "" }],
  syllabus_pdf: "",
  video_testimonials: [emptyVideoTestimonial()],
  is_active: true,
  is_featured: false,
  last_updated_text: "",
};

export default function CourseDetailDashboardPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CourseDetail>(initialCourseState);
  const [coursePages, setCoursePages] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [deletingCourseId, setDeletingCourseId] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState("");
  const [search, setSearch] = useState("");

  const [cropImageSrc, setCropImageSrc] = useState("");
  const [croppingTarget, setCroppingTarget] = useState<CroppingTarget>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [selectedImageFileName, setSelectedImageFileName] = useState("");

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("authToken") || "";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      router.push("/dashboard/login-admin");
      return;
    }

    fetchAllCourses();
  }, [router]);

  const resetForm = () => {
    setFormData(initialCourseState);
    setIsEditMode(false);
    setEditingCourseId("");
  };

  const fetchAllCourses = async (customSearch = "") => {
    try {
      setFetchingCourses(true);

      const params = new URLSearchParams();
      if (customSearch.trim()) params.set("search", customSearch.trim());
      params.set("limit", "100");

      const response = await fetch(
        `${API_BASE}/api/course-detail-page/fetch-all-course-detail-pages?${params.toString()}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Failed to fetch course detail pages");
        return;
      }

      setCoursePages(result?.data || []);
    } catch {
      toast.error("Something went wrong while fetching course detail pages");
    } finally {
      setFetchingCourses(false);
    }
  };

  const handleEditCourse = (course: CourseDetail) => {
    setFormData({
      _id: course._id,
      title: course.title || "",
      short_description: course.short_description || "",
      full_description: course.full_description || "",
      banner_image: course.banner_image || "",
      category: course.category || "",
      level: course.level || "beginner",
      price: course.price || 0,
      old_price: course.old_price || 0,
      discount_percentage: course.discount_percentage || 0,
      average_rating: course.average_rating || 0,
      total_ratings: course.total_ratings || 0,
      total_learners: course.total_learners || 0,
      total_duration: course.total_duration || "",
      instructors:
        course.instructors && course.instructors.length > 0
          ? course.instructors.map((item) => ({
              name: item?.name || "",
              role: item?.role || "",
              image: item?.image || "",
              bio: item?.bio || "",
            }))
          : [emptyInstructor()],
      competencies:
        course.competencies && course.competencies.length > 0
          ? course.competencies
          : [{ title: "", description: "" }],
      prerequisites:
        course.prerequisites && course.prerequisites.length > 0
          ? course.prerequisites
          : [""],
      includes:
        course.includes && course.includes.length > 0 ? course.includes : [""],
      program_overview:
        course.program_overview && course.program_overview.length > 0
          ? course.program_overview
          : [{ label: "", value: "" }],
      syllabus_pdf: course.syllabus_pdf || "",
      video_testimonials:
        course.video_testimonials && course.video_testimonials.length > 0
          ? course.video_testimonials
          : [emptyVideoTestimonial()],
      is_active: course.is_active ?? true,
      is_featured: course.is_featured ?? false,
      last_updated_text: course.last_updated_text || "",
    });

    setIsEditMode(true);
    setEditingCourseId(course._id || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "old_price" ||
        name === "discount_percentage" ||
        name === "average_rating" ||
        name === "total_ratings" ||
        name === "total_learners"
          ? Number(value)
          : value,
    }));
  };

  const handleInstructorChange = (
    index: number,
    field: keyof Instructor,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.instructors];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        instructors: updated,
      };
    });
  };

  const addInstructor = () => {
    setFormData((prev) => ({
      ...prev,
      instructors: [...prev.instructors, emptyInstructor()],
    }));
  };

  const removeInstructor = (index: number) => {
    setFormData((prev) => {
      const updated = prev.instructors.filter((_, i) => i !== index);
      return {
        ...prev,
        instructors: updated.length ? updated : [emptyInstructor()],
      };
    });
  };

  const handleCompetencyChange = (
    index: number,
    field: keyof Competency,
    value: string
  ) => {
    const updated = [...formData.competencies];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      competencies: updated,
    }));
  };

  const addCompetency = () => {
    setFormData((prev) => ({
      ...prev,
      competencies: [...prev.competencies, { title: "", description: "" }],
    }));
  };

  const removeCompetency = (index: number) => {
    const updated = formData.competencies.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      competencies: updated.length ? updated : [{ title: "", description: "" }],
    }));
  };

  const handleArrayStringChange = (
    field: "prerequisites" | "includes",
    index: number,
    value: string
  ) => {
    const updated = [...formData[field]];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const addArrayStringItem = (field: "prerequisites" | "includes") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayStringItem = (
    field: "prerequisites" | "includes",
    index: number
  ) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updated.length ? updated : [""],
    }));
  };

  const handleProgramOverviewChange = (
    index: number,
    field: keyof ProgramOverview,
    value: string
  ) => {
    const updated = [...formData.program_overview];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      program_overview: updated,
    }));
  };

  const addProgramOverview = () => {
    setFormData((prev) => ({
      ...prev,
      program_overview: [...prev.program_overview, { label: "", value: "" }],
    }));
  };

  const removeProgramOverview = (index: number) => {
    const updated = formData.program_overview.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      program_overview: updated.length ? updated : [{ label: "", value: "" }],
    }));
  };

  const handleVideoTestimonialChange = (
    index: number,
    field: keyof VideoTestimonial,
    value: string
  ) => {
    const updated = [...formData.video_testimonials];
    updated[index][field] = value as never;

    if (field === "video_type" && value !== "upload") {
      updated[index].video = "";
    }

    setFormData((prev) => ({
      ...prev,
      video_testimonials: updated,
    }));
  };

  const addVideoTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      video_testimonials: [...prev.video_testimonials, emptyVideoTestimonial()],
    }));
  };

  const removeVideoTestimonial = (index: number) => {
    const updated = formData.video_testimonials.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      video_testimonials: updated.length ? updated : [emptyVideoTestimonial()],
    }));
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const resetCropState = () => {
    setCropImageSrc("");
    setCroppingTarget(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsCropOpen(false);
    setSelectedImageFileName("");
  };

  const getCropAspectRatio = () => {
    if (!croppingTarget) return 4 / 3;

    if (croppingTarget.type === "instructor") return 1/1;
    if (croppingTarget.type === "banner") return 16 / 9;
    if (croppingTarget.type === "testimonial-thumbnail") return 16 / 9;

    return 4 / 3;
  };

  const getCropTitle = () => {
    if (!croppingTarget) return "Crop Image";

    if (croppingTarget.type === "instructor") {
      return "Crop Instructor Image (4:3)";
    }

    if (croppingTarget.type === "banner") {
      return "Crop Banner Image (16:9)";
    }

    if (croppingTarget.type === "testimonial-thumbnail") {
      return "Crop Testimonial Thumbnail (16:9)";
    }

    return "Crop Image";
  };

  const openCropModal = async (file: File, target: CroppingTarget) => {
    const reader = new FileReader();

    reader.onload = () => {
      setCropImageSrc(reader.result as string);
      setCroppingTarget(target);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setSelectedImageFileName(file.name);
      setIsCropOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const uploadSingleFile = async (
    file: File,
    fieldName: "image" | "video" | "pdf"
  ) => {
    const body = new FormData();
    body.append(fieldName, file);

    let endpoint = "";

    if (fieldName === "image") {
      endpoint = "/api/course-detail-page/upload-course-detail-image";
    } else if (fieldName === "video") {
      endpoint = "/api/course-detail-page/upload-course-detail-video";
    } else {
      endpoint = "/api/course-detail-page/upload-course-detail-pdf";
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        token,
      },
      body,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "File upload failed");
    }

    return result?.data?.file_path || "";
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    fileName = "cropped-image.jpg"
  ): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create cropped image"));
            return;
          }

          const baseName = fileName.split(".")[0] || "cropped-image";
          const finalFile = new File([blob], `${baseName}.jpg`, {
            type: "image/jpeg",
          });

          resolve(finalFile);
        },
        "image/jpeg",
        0.95
      );
    });
  };

  const applyCroppedImageToForm = (filePath: string, target: CroppingTarget) => {
    if (!target) return;

    if (target.type === "banner") {
      setFormData((prev) => ({
        ...prev,
        banner_image: filePath,
      }));
      return;
    }

    if (target.type === "instructor") {
      setFormData((prev) => {
        const updated = [...prev.instructors];
        updated[target.index].image = filePath;
        return {
          ...prev,
          instructors: updated,
        };
      });
      return;
    }

    if (target.type === "testimonial-thumbnail") {
      setFormData((prev) => {
        const updated = [...prev.video_testimonials];
        updated[target.index].thumbnail = filePath;
        return {
          ...prev,
          video_testimonials: updated,
        };
      });
    }
  };

  const handleCropAndUpload = async () => {
    if (!cropImageSrc || !croppedAreaPixels || !croppingTarget) {
      toast.error("Crop data not found");
      return;
    }

    const toastId = toast.loading("Cropping and uploading image...");

    try {
      const croppedFile = await getCroppedImg(
        cropImageSrc,
        croppedAreaPixels,
        selectedImageFileName || "cropped-image.jpg"
      );

      const filePath = await uploadSingleFile(croppedFile, "image");
      applyCroppedImageToForm(filePath, croppingTarget);

      toast.success("Image cropped and uploaded successfully", { id: toastId });
      resetCropState();
    } catch (error: any) {
      toast.error(error?.message || "Crop upload failed", { id: toastId });
    }
  };

  const handleBannerUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await openCropModal(file, { type: "banner" });
    e.target.value = "";
  };

  const handleInstructorImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await openCropModal(file, { type: "instructor", index });
    e.target.value = "";
  };

  const handleSyllabusPdfUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading syllabus PDF...");

    try {
      const filePath = await uploadSingleFile(file, "pdf");
      setFormData((prev) => ({
        ...prev,
        syllabus_pdf: filePath,
      }));
      toast.success("Syllabus PDF uploaded", { id: toastId });
    } catch (error: any) {
      toast.error(error?.message || "PDF upload failed", { id: toastId });
    } finally {
      e.target.value = "";
    }
  };

  const handleVideoThumbnailUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await openCropModal(file, { type: "testimonial-thumbnail", index });
    e.target.value = "";
  };

  const handleVideoFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading testimonial video...");

    try {
      const filePath = await uploadSingleFile(file, "video");

      const updated = [...formData.video_testimonials];
      updated[index].video = filePath;
      updated[index].video_type = "upload";

      setFormData((prev) => ({
        ...prev,
        video_testimonials: updated,
      }));

      toast.success("Video uploaded", { id: toastId });
    } catch (error: any) {
      toast.error(error?.message || "Video upload failed", { id: toastId });
    } finally {
      e.target.value = "";
    }
  };

  const sanitizePayload = () => ({
    ...formData,
    title: formData.title.trim(),
    short_description: formData.short_description.trim(),
    full_description: formData.full_description.trim(),
    category: formData.category.trim(),
    total_duration: formData.total_duration.trim(),
    last_updated_text: formData.last_updated_text.trim(),
    instructors: formData.instructors
      .map((item) => ({
        name: item.name.trim(),
        role: item.role.trim(),
        image: item.image.trim(),
        bio: item.bio.trim(),
      }))
      .filter((item) => item.name || item.role || item.image || item.bio),
    prerequisites: formData.prerequisites.filter((item) => item.trim() !== ""),
    includes: formData.includes.filter((item) => item.trim() !== ""),
    competencies: formData.competencies.filter(
      (item) => item.title.trim() !== "" || item.description.trim() !== ""
    ),
    program_overview: formData.program_overview.filter(
      (item) => item.label.trim() !== "" || item.value.trim() !== ""
    ),
    video_testimonials: formData.video_testimonials.filter(
      (item) =>
        item.name.trim() !== "" ||
        item.role.trim() !== "" ||
        item.video.trim() !== "" ||
        item.thumbnail.trim() !== "" ||
        item.short_text.trim() !== ""
    ),
  });

  const validateBeforeSubmit = () => {
    if (!formData.banner_image) {
      toast.error("Banner image is required");
      return false;
    }

    const validInstructors = formData.instructors.filter(
      (item) =>
        item.name.trim() ||
        item.role.trim() ||
        item.image.trim() ||
        item.bio.trim()
    );

    if (validInstructors.length === 0) {
      toast.error("At least one instructor is required");
      return false;
    }

    const invalidInstructor = validInstructors.find(
      (item) => !item.name.trim() || !item.role.trim() || !item.image.trim()
    );

    if (invalidInstructor) {
      toast.error("Each instructor must have name, role and image");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) return;

    try {
      setLoading(true);

      const payload = sanitizePayload();

      const url = isEditMode
        ? `${API_BASE}/api/course-detail-page/update-course-detail-page`
        : `${API_BASE}/api/course-detail-page/create-course-detail-page`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(
          isEditMode
            ? {
                ...payload,
                _id: editingCourseId,
              }
            : payload
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result?.message ||
            (isEditMode
              ? "Failed to update course detail page"
              : "Failed to create course detail page")
        );
        return;
      }

      toast.success(
        isEditMode
          ? "Course detail page updated successfully"
          : "Course detail page created successfully"
      );

      resetForm();
      fetchAllCourses(search);
    } catch {
      toast.error(
        isEditMode
          ? "Something went wrong while updating course"
          : "Something went wrong while creating course"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id?: string) => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      setDeletingCourseId(id);

      const response = await fetch(
        `${API_BASE}/api/course-detail-page/delete-course-detail-page`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ _id: id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Failed to delete course");
        return;
      }

      if (editingCourseId === id) {
        resetForm();
      }

      toast.success("Course detail page deleted successfully");
      fetchAllCourses(search);
    } catch {
      toast.error("Something went wrong while deleting course");
    } finally {
      setDeletingCourseId("");
    }
  };

  const mediaUrl = (filePath: string) => {
    if (!filePath) return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) return filePath;
    return `${API_BASE}${filePath}`;
  };

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">
        <Toaster position="top-right" />

        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-xl">
            <h1 className="text-2xl font-bold md:text-3xl">Course Detail Page Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">
              Create, update and manage course detail pages with multiple instructors,
              image cropping, PDF upload, video testimonials and automatic file replacement.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white p-4 shadow-lg md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditMode ? "Update Course Detail Page" : "Create Course Detail Page"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload files first, then save the course. Replacing paths in update mode lets
                    backend delete previous files automatically.
                  </p>
                </div>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <SectionCard title="Basic Information">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />

                  <Select
                    label="Level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    options={[
                      { label: "Beginner", value: "beginner" },
                      { label: "Intermediate", value: "intermediate" },
                      { label: "Advanced", value: "advanced" },
                    ]}
                  />

                  <Input
                    label="Total Duration"
                    name="total_duration"
                    value={formData.total_duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 16 Weeks"
                  />

                  <Input
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    label="Old Price"
                    name="old_price"
                    type="number"
                    value={formData.old_price}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Discount Percentage"
                    name="discount_percentage"
                    type="number"
                    value={formData.discount_percentage}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Average Rating"
                    name="average_rating"
                    type="number"
                    value={formData.average_rating}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Total Ratings"
                    name="total_ratings"
                    type="number"
                    value={formData.total_ratings}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Total Learners"
                    name="total_learners"
                    type="number"
                    value={formData.total_learners}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Last Updated Text"
                    name="last_updated_text"
                    value={formData.last_updated_text}
                    onChange={handleInputChange}
                    placeholder="e.g. Updated April 2026"
                  />
                </div>

                <div className="mt-4">
                  <TextArea
                    label="Short Description"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <TextArea
                    label="Full Description"
                    name="full_description"
                    value={formData.full_description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Banner Image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="block w-full rounded-xl border border-slate-300 p-3"
                />

                {formData.banner_image && (
                  <div className="mt-4">
                    <img
                      src={mediaUrl(formData.banner_image)}
                      alt="Banner Preview"
                      className="h-52 w-full rounded-2xl border border-slate-200 object-cover"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <PathChip value={formData.banner_image} />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            banner_image: "",
                          }))
                        }
                        className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                      >
                        Remove Banner
                      </button>
                    </div>
                  </div>
                )}
              </SectionCard>

              <SectionCard
                title="Instructors"
                action={
                  <button
                    type="button"
                    onClick={addInstructor}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Add Instructor
                  </button>
                }
              >
                <div className="space-y-4">
                  {formData.instructors.map((instructor, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="text-base font-semibold text-slate-800">
                          Instructor {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeInstructor(index)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Instructor Name"
                          value={instructor.name}
                          onChange={(e) =>
                            handleInstructorChange(index, "name", e.target.value)
                          }
                          required
                        />

                        <Input
                          label="Instructor Role"
                          value={instructor.role}
                          onChange={(e) =>
                            handleInstructorChange(index, "role", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <TextArea
                          label="Instructor Bio"
                          value={instructor.bio}
                          onChange={(e) =>
                            handleInstructorChange(index, "bio", e.target.value)
                          }
                        />
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Instructor Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleInstructorImageUpload(e, index)}
                          className="block w-full rounded-xl border border-slate-300 p-3"
                        />

                        {instructor.image && (
                          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-start">
                            <img
                              src={mediaUrl(instructor.image)}
                              alt={`Instructor ${index + 1}`}
                              className="h-28 w-28 rounded-2xl border border-slate-200 object-cover"
                            />
                            <div className="flex-1 space-y-2">
                              <PathChip value={instructor.image} />
                              <button
                                type="button"
                                onClick={() => handleInstructorChange(index, "image", "")}
                                className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title="Competencies"
                action={
                  <button
                    type="button"
                    onClick={addCompetency}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Add Competency
                  </button>
                }
              >
                <div className="space-y-4">
                  {formData.competencies.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Title"
                          value={item.title}
                          onChange={(e) =>
                            handleCompetencyChange(index, "title", e.target.value)
                          }
                        />
                        <Input
                          label="Description"
                          value={item.description}
                          onChange={(e) =>
                            handleCompetencyChange(index, "description", e.target.value)
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCompetency(index)}
                        className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <ArrayStringSection
                title="Prerequisites"
                items={formData.prerequisites}
                onAdd={() => addArrayStringItem("prerequisites")}
                onRemove={(index) => removeArrayStringItem("prerequisites", index)}
                onChange={(index, value) =>
                  handleArrayStringChange("prerequisites", index, value)
                }
              />

              <ArrayStringSection
                title="Includes"
                items={formData.includes}
                onAdd={() => addArrayStringItem("includes")}
                onRemove={(index) => removeArrayStringItem("includes", index)}
                onChange={(index, value) => handleArrayStringChange("includes", index, value)}
              />

              <SectionCard
                title="Program Overview"
                action={
                  <button
                    type="button"
                    onClick={addProgramOverview}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Add Item
                  </button>
                }
              >
                <div className="space-y-4">
                  {formData.program_overview.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Label"
                          value={item.label}
                          onChange={(e) =>
                            handleProgramOverviewChange(index, "label", e.target.value)
                          }
                        />
                        <Input
                          label="Value"
                          value={item.value}
                          onChange={(e) =>
                            handleProgramOverviewChange(index, "value", e.target.value)
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProgramOverview(index)}
                        className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Syllabus PDF">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleSyllabusPdfUpload}
                  className="block w-full rounded-xl border border-slate-300 p-3"
                />
                {formData.syllabus_pdf && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <PathChip value={formData.syllabus_pdf} />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          syllabus_pdf: "",
                        }))
                      }
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                    >
                      Remove PDF
                    </button>
                  </div>
                )}
              </SectionCard>

              <SectionCard
                title="Video Testimonials"
                action={
                  <button
                    type="button"
                    onClick={addVideoTestimonial}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Add Testimonial
                  </button>
                }
              >
                <div className="space-y-6">
                  {formData.video_testimonials.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Name"
                          value={item.name}
                          onChange={(e) =>
                            handleVideoTestimonialChange(index, "name", e.target.value)
                          }
                        />

                        <Input
                          label="Role"
                          value={item.role}
                          onChange={(e) =>
                            handleVideoTestimonialChange(index, "role", e.target.value)
                          }
                        />

                        <Select
                          label="Video Type"
                          value={item.video_type}
                          onChange={(e) =>
                            handleVideoTestimonialChange(index, "video_type", e.target.value)
                          }
                          options={[
                            { label: "Upload", value: "upload" },
                            { label: "YouTube", value: "youtube" },
                            { label: "Vimeo", value: "vimeo" },
                          ]}
                        />

                        <Input
                          label={
                            item.video_type === "upload"
                              ? "Uploaded Video Path"
                              : "External Video URL"
                          }
                          value={item.video}
                          onChange={(e) =>
                            handleVideoTestimonialChange(index, "video", e.target.value)
                          }
                          placeholder={
                            item.video_type === "upload"
                              ? "Uploaded video path will appear here"
                              : "Paste YouTube/Vimeo URL"
                          }
                        />
                      </div>

                      <div className="mt-4">
                        <TextArea
                          label="Short Text"
                          value={item.short_text}
                          onChange={(e) =>
                            handleVideoTestimonialChange(index, "short_text", e.target.value)
                          }
                        />
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Thumbnail Upload
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleVideoThumbnailUpload(e, index)}
                            className="block w-full rounded-xl border border-slate-300 p-3"
                          />

                          {item.thumbnail && (
                            <div className="mt-4 space-y-2">
                              <img
                                src={mediaUrl(item.thumbnail)}
                                alt="Testimonial Thumbnail"
                                className="h-36 w-full rounded-2xl border border-slate-200 object-cover"
                              />
                              <PathChip value={item.thumbnail} />
                              <button
                                type="button"
                                onClick={() =>
                                  handleVideoTestimonialChange(index, "thumbnail", "")
                                }
                                className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                              >
                                Remove Thumbnail
                              </button>
                            </div>
                          )}
                        </div>

                        {item.video_type === "upload" && (
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Video Upload
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleVideoFileUpload(e, index)}
                              className="block w-full rounded-xl border border-slate-300 p-3"
                            />

                            {item.video && (
                              <div className="mt-4 space-y-2">
                                <PathChip value={item.video} />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleVideoTestimonialChange(index, "video", "")
                                  }
                                  className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                                >
                                  Remove Video
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeVideoTestimonial(index)}
                        className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                      >
                        Remove Testimonial
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <span className="font-medium text-slate-700">Is Active</span>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                  />
                  <span className="font-medium text-slate-700">Is Featured</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Course Detail Page"
                  : "Create Course Detail Page"}
              </button>
            </form>

            <div className="rounded-3xl bg-white p-4 shadow-lg md:p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-slate-800">All Course Pages</h2>
                <div className="flex gap-2">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-900"
                  />
                  <button
                    onClick={() => fetchAllCourses(search)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Search
                  </button>
                </div>
              </div>

              {fetchingCourses ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                  Loading course pages...
                </div>
              ) : coursePages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                  No course detail pages found
                </div>
              ) : (
                <div className="space-y-4">
                  {coursePages.map((course) => (
                    <div
                      key={course._id}
                      className="rounded-2xl border border-slate-200 p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-slate-800">{course.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{course.category}</p>
                          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                            {course.short_description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              course.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {course.is_active ? "Active" : "Inactive"}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              course.is_featured
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {course.is_featured ? "Featured" : "Normal"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                        <div>
                          <span className="font-semibold text-slate-800">Price:</span> ₹
                          {course.price}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Level:</span>{" "}
                          {course.level}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Duration:</span>{" "}
                          {course.total_duration}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Learners:</span>{" "}
                          {course.total_learners}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-slate-800">Instructors:</span>{" "}
                          {(course.instructors || [])
                            .map((item) => item.name)
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          disabled={deletingCourseId === course._id}
                          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
                        >
                          {deletingCourseId === course._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isCropOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-4xl rounded-3xl bg-white p-4 shadow-2xl md:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{getCropTitle()}</h3>
                  <p className="text-sm text-slate-500">
                    Adjust image position and zoom before upload.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetCropState}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Close
                </button>
              </div>

              <div className="relative h-[350px] w-full overflow-hidden rounded-2xl bg-slate-900 md:h-[450px]">
                <Cropper
                  image={cropImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={getCropAspectRatio()}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="rect"
                  showGrid
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetCropState}
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropAndUpload}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                >
                  Crop & Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

function SectionCard({ title, children, action }: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function PathChip({ value }: { value: string }) {
  return (
    <div className="break-all rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
      {value}
    </div>
  );
}

type InputProps = {
  label: string;
  name?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

function Input({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder = "",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
      />
    </div>
  );
}

type TextAreaProps = {
  label: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
};

function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 4,
}: TextAreaProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
      />
    </div>
  );
}

type SelectProps = {
  label: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
};

function Select({ label, name, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type ArrayStringSectionProps = {
  title: string;
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
};

function ArrayStringSection({
  title,
  items,
  onAdd,
  onRemove,
  onChange,
}: ArrayStringSectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              placeholder={`Enter ${title.toLowerCase()} item`}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}