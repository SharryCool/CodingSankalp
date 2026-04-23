// app/dashboard/testimonials/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  QuoteUpIcon,
  Add01Icon,
  Delete02Icon,
  Search01Icon,
  ArrowDown01Icon,
  Edit02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  TaskDone01Icon,
  Image01Icon,
  UserIcon,
  Briefcase01Icon,
  Building02Icon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";

type TestimonialItem = {
  _id: string;
  name: string;
  message: string;
  imageUrl: string;
  postion: string;
  company: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardTestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [fetchingTestimonials, setFetchingTestimonials] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [search, setSearch] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);

  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [postion, setPostion] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [testimonialId, setTestimonialId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateMessageText, setUpdateMessageText] = useState("");
  const [updatePostion, setUpdatePostion] = useState("");
  const [updateCompany, setUpdateCompany] = useState("");
  const [updateImage, setUpdateImage] = useState<File | null>(null);

  const [deleteTestimonialId, setDeleteTestimonialId] = useState("");
  const [singleTestimonialId, setSingleTestimonialId] = useState("");
  const [singleTestimonial, setSingleTestimonial] =useState<TestimonialItem | null>(null);

  
    const router=useRouter();
    useEffect(()=>{
  
      const token = sessionStorage.getItem("authToken");
      if(!token){
          router.push("/dashboard/login")
      }
    },[])

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken");
      setAuthToken(token);
    }

    fetchAllTestimonials();
  }, []);

  const showMessage = (text: string, type: boolean) => {
    setMessage(text);
    setSuccess(type);

    setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 3000);
  };

  const resetCreateForm = () => {
    setName("");
    setMessageText("");
    setPostion("");
    setCompany("");
    setImage(null);

    const fileInput = document.getElementById(
      "testimonial-image"
    ) as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";
  };

  const resetUpdateForm = () => {
    setTestimonialId("");
    setUpdateName("");
    setUpdateMessageText("");
    setUpdatePostion("");
    setUpdateCompany("");
    setUpdateImage(null);

    const fileInput = document.getElementById(
      "update-testimonial-image"
    ) as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";
  };

  const validateCreateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!messageText.trim()) return "Message is required";
    if (!postion.trim()) return "Postion is required";
    if (!company.trim()) return "Company is required";
    if (!image) return "Image is required";
    return null;
  };

  const validateUpdateForm = () => {
    if (!testimonialId.trim()) return "Testimonial id is required";
    return null;
  };

  const fetchAllTestimonials = async () => {
    try {
      setFetchingTestimonials(true);

      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      params.set("skip", "0");
      params.set("limit", "50");

      const response = await fetch(
        `${API_BASE}/api/testimonial/fetch-all-testimonials?${params.toString()}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to fetch testimonials", false);
        setTestimonials([]);
        return;
      }

      setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
    } catch (error) {
      showMessage("Something went wrong while fetching testimonials", false);
    } finally {
      setFetchingTestimonials(false);
    }
  };

  const handleCreateTestimonial = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    const validationMessage = validateCreateForm();
    if (validationMessage) {
      showMessage(validationMessage, false);
      return;
    }

    try {
      setCreateLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", messageText);
      formData.append("postion", postion);
      formData.append("company", company);
      if (image) formData.append("image", image);

      const response = await fetch(
        `${API_BASE}/api/testimonial/create-testimonial`,
        {
          method: "POST",
          headers: {
            token: authToken,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to create testimonial", false);
        return;
      }

      showMessage(data.message || "Testimonial created successfully", true);
      resetCreateForm();
      fetchAllTestimonials();
    } catch (error) {
      showMessage("Something went wrong while creating testimonial", false);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateTestimonial = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    const validationMessage = validateUpdateForm();
    if (validationMessage) {
      showMessage(validationMessage, false);
      return;
    }

    try {
      setUpdateLoading(true);

      const formData = new FormData();
      formData.append("testimonial_id", testimonialId);
      if (updateName.trim()) formData.append("name", updateName);
      if (updateMessageText.trim()) formData.append("message", updateMessageText);
      if (updatePostion.trim()) formData.append("postion", updatePostion);
      if (updateCompany.trim()) formData.append("company", updateCompany);
      if (updateImage) formData.append("image", updateImage);

      const response = await fetch(
        `${API_BASE}/api/testimonial/update-testimonial`,
        {
          method: "PUT",
          headers: {
            token: authToken,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to update testimonial", false);
        return;
      }

      showMessage(data.message || "Testimonial updated successfully", true);
      resetUpdateForm();
      fetchAllTestimonials();
    } catch (error) {
      showMessage("Something went wrong while updating testimonial", false);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id?: string) => {
    const finalId = id || deleteTestimonialId;

    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    if (!finalId.trim()) {
      showMessage("Testimonial id is required", false);
      return;
    }

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${API_BASE}/api/testimonial/delete-testimonial`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: authToken,
          },
          body: JSON.stringify({
            testimonial_id: finalId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to delete testimonial", false);
        return;
      }

      showMessage(data.message || "Testimonial deleted successfully", true);
      setDeleteTestimonialId("");
      setTestimonials((prev) => prev.filter((item) => item._id !== finalId));

      if (singleTestimonial?._id === finalId) {
        setSingleTestimonial(null);
        setSingleTestimonialId("");
      }
    } catch (error) {
      showMessage("Something went wrong while deleting testimonial", false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleGetSingleTestimonial = async () => {
    if (!singleTestimonialId.trim()) {
      showMessage("Testimonial id is required", false);
      return;
    }

    try {
      setSingleLoading(true);

      const response = await fetch(
        `${API_BASE}/api/testimonial/fetch-testimonial-by-id/${singleTestimonialId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSingleTestimonial(null);
        showMessage(data.message || "Failed to fetch testimonial", false);
        return;
      }

      setSingleTestimonial(data.testimonial || null);
      showMessage(data.message || "Testimonial fetched successfully", true);
    } catch (error) {
      setSingleTestimonial(null);
      showMessage("Something went wrong while fetching testimonial", false);
    } finally {
      setSingleLoading(false);
    }
  };

  const handleLoadForUpdate = (testimonial: TestimonialItem) => {
    setTestimonialId(testimonial._id);
    setUpdateName(testimonial.name);
    setUpdateMessageText(testimonial.message);
    setUpdatePostion(testimonial.postion);
    setUpdateCompany(testimonial.company);
    setUpdateImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredTestimonials = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return testimonials;

    return testimonials.filter((testimonial) => {
      return (
        testimonial.name.toLowerCase().includes(q) ||
        testimonial.message.toLowerCase().includes(q) ||
        testimonial.postion.toLowerCase().includes(q) ||
        testimonial.company.toLowerCase().includes(q)
      );
    });
  }, [testimonials, search]);

  return (

    <>
   <DashboardNavbar />
    <section className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2">
              <HugeiconsIcon
                icon={QuoteUpIcon}
                size={18}
                strokeWidth={1.8}
                className="text-cyan-300"
              />
              <span className="text-sm font-medium text-cyan-100">
                Testimonial Management
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Professional Testimonials Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Create, fetch, update, and delete testimonials using your current
              model, routes, and controller structure. :contentReference[oaicite:0]
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Total Testimonials
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {testimonials.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Visible Results
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {filteredTestimonials.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Auth Status
              </p>
              <h3 className="mt-2 text-base font-semibold text-cyan-200">
                {mounted ? (authToken ? "Logged In" : "Not Logged In") : "Checking..."}
              </h3>
            </div>
          </div>
        </div>

        {message ? (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
              success
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                : "border-red-400/20 bg-red-500/10 text-red-200"
            }`}
          >
            <HugeiconsIcon
              icon={success ? CheckmarkCircle02Icon : Alert02Icon}
              size={20}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0"
            />
            <span>{message}</span>
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
                <HugeiconsIcon
                  icon={Add01Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-cyan-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create Testimonial
                </h2>
                <p className="text-sm text-slate-400">
                  Add a new testimonial with image upload.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateTestimonial} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <HugeiconsIcon
                      icon={UserIcon}
                      size={18}
                      strokeWidth={1.8}
                      className="text-slate-400"
                    />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Postion
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <HugeiconsIcon
                      icon={Briefcase01Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="text-slate-400"
                    />
                    <input
                      value={postion}
                      onChange={(e) => setPostion(e.target.value)}
                      placeholder="Enter postion"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Company
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <HugeiconsIcon
                    icon={Building02Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="text-slate-400"
                  />
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Enter testimonial message"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Image
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 transition hover:border-cyan-400/30 hover:bg-white/[0.05]">
                  <HugeiconsIcon
                    icon={Image01Icon}
                    size={20}
                    strokeWidth={1.8}
                    className="text-cyan-300"
                  />
                  <span className="text-sm text-slate-300">
                    {image ? image.name : "Choose testimonial image"}
                  </span>
                  <input
                    id="testimonial-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setImage(selectedFile);
                    }}
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={createLoading}
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25 disabled:opacity-60"
                >
                  <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={1.8} />
                  {createLoading ? "Creating..." : "Create Testimonial"}
                </button>

                <button
                  type="button"
                  onClick={resetCreateForm}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10">
                <HugeiconsIcon
                  icon={Edit02Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-amber-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Update Testimonial
                </h2>
                <p className="text-sm text-slate-400">
                  Load a testimonial from the list or update by id.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateTestimonial} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Testimonial ID
                </label>
                <input
                  value={testimonialId}
                  onChange={(e) => setTestimonialId(e.target.value)}
                  placeholder="Enter testimonial id"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    placeholder="Enter updated name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Postion
                  </label>
                  <input
                    value={updatePostion}
                    onChange={(e) => setUpdatePostion(e.target.value)}
                    placeholder="Enter updated postion"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Company
                </label>
                <input
                  value={updateCompany}
                  onChange={(e) => setUpdateCompany(e.target.value)}
                  placeholder="Enter updated company"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={updateMessageText}
                  onChange={(e) => setUpdateMessageText(e.target.value)}
                  placeholder="Enter updated message"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  New Image
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 transition hover:border-amber-400/30 hover:bg-white/[0.05]">
                  <HugeiconsIcon
                    icon={Image01Icon}
                    size={20}
                    strokeWidth={1.8}
                    className="text-amber-300"
                  />
                  <span className="text-sm text-slate-300">
                    {updateImage ? updateImage.name : "Choose new image if needed"}
                  </span>
                  <input
                    id="update-testimonial-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setUpdateImage(selectedFile);
                    }}
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25 disabled:opacity-60"
                >
                  <HugeiconsIcon
                    icon={TaskDone01Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  {updateLoading ? "Updating..." : "Update Testimonial"}
                </button>

                <button
                  type="button"
                  onClick={resetUpdateForm}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  Clear Update Form
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-red-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Delete Testimonial
                </h2>
                <p className="text-sm text-slate-400">
                  Delete a testimonial by id.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                value={deleteTestimonialId}
                onChange={(e) => setDeleteTestimonialId(e.target.value)}
                placeholder="Enter testimonial id"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => handleDeleteTestimonial()}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20 disabled:opacity-60"
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                <HugeiconsIcon
                  icon={ViewIcon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-violet-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Get Single Testimonial
                </h2>
                <p className="text-sm text-slate-400">
                  Fetch one testimonial using its id.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                value={singleTestimonialId}
                onChange={(e) => setSingleTestimonialId(e.target.value)}
                placeholder="Enter testimonial id"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={handleGetSingleTestimonial}
                disabled={singleLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/20 disabled:opacity-60"
              >
                <HugeiconsIcon icon={ViewIcon} size={18} strokeWidth={1.8} />
                {singleLoading ? "Fetching..." : "Get Testimonial"}
              </button>
            </div>

            {singleTestimonial ? (
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <img
                  src={singleTestimonial.imageUrl}
                  alt={singleTestimonial.name}
                  className="mb-4 h-20 w-20 rounded-2xl object-cover"
                />
                <h3 className="text-lg font-bold text-white">
                  {singleTestimonial.name}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {singleTestimonial.postion} - {singleTestimonial.company}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {singleTestimonial.message}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">All Testimonials</h2>
              <p className="text-sm text-slate-400">
                Search and manage testimonials.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchAllTestimonials}
              disabled={fetchingTestimonials}
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:opacity-60"
            >
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={18}
                strokeWidth={1.8}
              />
              {fetchingTestimonials ? "Refreshing..." : "Refresh Testimonials"}
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <HugeiconsIcon
              icon={Search01Icon}
              size={18}
              strokeWidth={1.8}
              className="text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, message, postion, or company"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4">
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id || index}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex gap-4">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {testimonial.postion}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadForUpdate(testimonial)}
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-500/20"
                      >
                        <HugeiconsIcon
                          icon={Edit02Icon}
                          size={16}
                          strokeWidth={1.8}
                        />
                        Load
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(testimonial._id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-500/20"
                      >
                        <HugeiconsIcon
                          icon={Delete02Icon}
                          size={16}
                          strokeWidth={1.8}
                        />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <p className="break-all text-xs leading-6 text-slate-400">
                      <span className="font-semibold text-cyan-200">ID:</span>{" "}
                      {testimonial._id}
                    </p>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-300">
                    {testimonial.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                <h3 className="text-lg font-semibold text-white">
                  No testimonials found
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Create a new testimonial or refresh the list.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
     </>
  );
}