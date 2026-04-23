"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useParams, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  BookOpen01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Copy01Icon,
  Download01Icon,
  Share08Icon,
  StarIcon,
  StudentIcon,
  CodeIcon,
  DatabaseIcon,
  SecurityCheckIcon,
  Mail01Icon,
  NewTwitterIcon,
  Linkedin02Icon,
  PlayCircle02Icon,
  Cancel01Icon,
  Bookmark02Icon,
} from "@hugeicons-pro/core-solid-sharp";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Competency = {
  title: string;
  description: string;
};

type Instructor = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

type ProgramOverview = {
  label: string;
  value: string;
};

type VideoTestimonial = {
  name: string;
  role: string;
  thumbnail?: string;
  video_type: "upload" | "youtube" | "vimeo";
  video: string;
  short_text?: string;
};

type CourseDetail = {
  _id: string;
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

type ApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};

type OrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

type EnrollForm = {
  name: string;
  email: string;
  mobile_no: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  city: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY || "";

const levelStyles: Record<string, string> = {
  beginner: "bg-emerald-600",
  intermediate: "bg-blue-700",
  advanced: "bg-orange-500",
};

const competencyIcons = [
  CodeIcon,
  BookOpen01Icon,
  DatabaseIcon,
  SecurityCheckIcon,
];

const competencyAccents = [
  "bg-orange-50 text-orange-600 border-orange-100",
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-emerald-50 text-emerald-600 border-emerald-100",
  "bg-orange-50 text-orange-600 border-orange-100",
];

function getYouTubeEmbedUrl(url: string) {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : url;
}

function getEmbedUrl(videoType: string, video: string) {
  if (videoType === "youtube") return getYouTubeEmbedUrl(video);
  if (videoType === "vimeo") return getVimeoEmbedUrl(video);
  return `${API_BASE_URL}${video}`;
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(
    null
  );

  const [formData, setFormData] = useState<EnrollForm>({
    name: "",
    email: "",
    mobile_no: "",
    address: "",
    state: "",
    country: "India",
    pincode: "",
    city: "",
  });

  const leadInstructor = course?.instructors?.[0] || null;

  const basePrice = Number(course?.price || 0);
  const gstAmount = Math.round(basePrice * 0.18);
  const convenienceFeeAmount = Math.round((basePrice  + gstAmount)* 0.03);
  const totalAmount = basePrice + gstAmount + convenienceFeeAmount;

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/course-detail-page/fetch-single-course-detail-page`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: courseId }),
          cache: "no-store",
        }
      );

      const result: ApiResponse<CourseDetail> = await response.json();

      if (!result.success) {
        toast.error(result.message || "Unable to fetch course");
        setCourse(null);
        return;
      }

      setCourse(result.data);
    } catch (error) {
      toast.error("Something went wrong while loading course details");
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Course link copied");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const handlePayment = async () => {
    try {
      if (!course) return;

      if (!formData.name.trim()) return toast.error("Name is required");
      if (!formData.email.trim()) return toast.error("Email is required");
      if (!formData.mobile_no.trim())
        return toast.error("Mobile number is required");
      if (!formData.address.trim()) return toast.error("Address is required");
      if (!formData.state.trim()) return toast.error("State is required");
      if (!formData.country.trim()) return toast.error("Country is required");
      if (!formData.pincode.trim()) return toast.error("Pincode is required");
      if (!formData.city.trim()) return toast.error("City is required");

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      if (!RAZORPAY_KEY) {
        toast.error("Razorpay key is missing");
        return;
      }

      setPaymentLoading(true);

      const orderRes = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: course._id,
          ...formData,
        }),
      });

      const orderResult: ApiResponse<OrderResponse> = await orderRes.json();

      if (!orderResult.success) {
        toast.error(orderResult.message || "Failed to create order");
        return;
      }

      const order = orderResult.data;

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "CodingSankalp",
        description: course.title,
        order_id: order.id,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch(
              `${API_BASE_URL}/api/payment/order-payment-verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  course_id: course._id,
                  ...formData,
                }),
              }
            );

            const verifyResult = await verifyRes.json();

            if (!verifyResult.success) {
              toast.error(
                verifyResult.message || "Payment verification failed"
              );
              return;
            }

            toast.success("Payment successful");
            setOpenEnrollModal(false);
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile_no,
        },
        notes: {
          course_title: course.title,
          course_id: course._id,
        },
        theme: {
          color: "#f97316",
        },
        modal: {
          ondismiss: function () {
            toast("Payment popup closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Unable to start payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <Toaster position="top-right" />
        <p className="text-lg font-semibold text-slate-700">
          Loading course details...
        </p>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <Toaster position="top-right" />
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            Course not found
          </h2>
          <p className="mt-3 text-slate-600">
            The requested course detail page is unavailable.
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-white"
          >
            Back to Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Toaster position="top-right" />
      <Header />

      <main className="bg-[#fffaf5] text-slate-900">
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_55%,#f3fff9_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Course Details
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Explore a structured, project-driven learning experience.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white/70">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
              <Link href="/" className="transition hover:text-orange-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/courses" className="transition hover:text-orange-600">
                Courses
              </Link>
              <span>/</span>
              <span className="text-blue-700">{course.title}</span>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.78fr]">
              <div>
                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="relative">
                    <Image
                      src={`${API_BASE_URL}${course.banner_image}`}
                      alt={course.title}
                      width={1600}
                      height={900}
                      className="h-[260px] w-full object-cover sm:h-[360px]"
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))]" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                      <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
                        {course.category}
                      </span>
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg ${
                          levelStyles[course.level] || "bg-blue-700"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                          {course.title}
                        </h2>

                        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                          {course.short_description}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-600">
                          <div className="flex items-center gap-2 text-orange-500">
                            <HugeiconsIcon
                              icon={StarIcon}
                              size={18}
                              strokeWidth={2}
                            />
                            <span className="text-slate-700">
                              {course.average_rating || 0} (
                              {course.total_ratings || 0} ratings)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-blue-700">
                            <HugeiconsIcon
                              icon={StudentIcon}
                              size={18}
                              strokeWidth={2}
                            />
                            <span className="text-slate-700">
                              {course.total_learners || 0} learners
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-emerald-600">
                            <HugeiconsIcon
                              icon={Clock01Icon}
                              size={18}
                              strokeWidth={2}
                            />
                            <span className="text-slate-700">
                              {course.total_duration || "N/A"}
                            </span>
                          </div>
                        </div>

                        {!!course.last_updated_text && (
                          <p className="mt-4 text-sm font-semibold text-slate-500">
                            Last Updated: {course.last_updated_text}
                          </p>
                        )}
                      </div>

                      {leadInstructor && (
                        <div className="rounded-[24px] border border-emerald-100 bg-[linear-gradient(135deg,#f3fff9_0%,#eff6ff_100%)] p-4 shadow-sm">
                          <div className="flex items-center gap-4">
                            <Image
                              src={`${API_BASE_URL}${leadInstructor.image}`}
                              alt={leadInstructor.name}
                              width={80}
                              height={80}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                                Lead Instructor
                              </p>
                              <h3 className="mt-1 text-lg font-black text-slate-900">
                                {leadInstructor.name}
                              </h3>
                              <p className="text-sm font-medium text-slate-600">
                                {leadInstructor.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-10">
                      <h3 className="text-2xl font-black text-slate-900">
                        About This Program
                      </h3>
                      <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-600">
                        {course.full_description}
                      </p>
                    </div>

                    <div className="pt-10">
                      <h3 className="text-2xl font-black text-slate-900">
                        Core Competencies
                      </h3>

                      {course.competencies.length === 0 ? (
                        <p className="mt-5 text-slate-500">
                          No competencies added.
                        </p>
                      ) : (
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          {course.competencies.map((item, index) => {
                            const icon =
                              competencyIcons[index % competencyIcons.length];
                            const accent =
                              competencyAccents[index % competencyAccents.length];

                            return (
                              <div
                                key={`${item.title}-${index}`}
                                className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                              >
                                <div
                                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${accent}`}
                                >
                                  <HugeiconsIcon
                                    icon={icon}
                                    size={22}
                                    strokeWidth={2.2}
                                  />
                                </div>

                                <h4 className="mt-4 text-lg font-black text-slate-900">
                                  {item.title}
                                </h4>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                  {item.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-10">
                      <h3 className="text-2xl font-black text-slate-900">
                        Prerequisites
                      </h3>

                      {course.prerequisites.length === 0 ? (
                        <p className="mt-5 text-slate-500">
                          No prerequisites added.
                        </p>
                      ) : (
                        <div className="mt-5 space-y-4">
                          {course.prerequisites.map((item, index) => (
                            <div
                              key={`${item}-${index}`}
                              className="flex items-start gap-3"
                            >
                              <div className="mt-1 text-emerald-600">
                                <HugeiconsIcon
                                  icon={CheckmarkCircle02Icon}
                                  size={20}
                                  strokeWidth={2.2}
                                />
                              </div>
                              <p className="text-base text-slate-600">{item}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {course.instructors?.length > 0 && (
                      <div className="pt-10">
                        <h3 className="text-2xl font-black text-slate-900">
                          Instructor Bios
                        </h3>

                        <div className="mt-6 space-y-6">
                          {course.instructors.map((instructor, index) => (
                            <div
                              key={`${instructor.name}-${index}`}
                              className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                            >
                              <div className="flex items-center gap-4">
                                <Image
                                  src={`${API_BASE_URL}${instructor.image}`}
                                  alt={instructor.name}
                                  width={80}
                                  height={80}
                                  className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="text-lg font-black text-slate-900">
                                    {instructor.name}
                                  </h4>
                                  <p className="text-sm font-semibold text-blue-700">
                                    {instructor.role}
                                  </p>
                                </div>
                              </div>

                              {!!instructor.bio && (
                                <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-600">
                                  {instructor.bio}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-10">
                      <h3 className="text-2xl font-black text-slate-900">
                        Student Feedback
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        Real feedback from learners who joined the program.
                      </p>

                      {course.video_testimonials.length === 0 ? (
                        <p className="mt-6 text-slate-500">
                          No testimonials available.
                        </p>
                      ) : (
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          {course.video_testimonials.map((item, index) => (
                            <button
                              key={`${item.name}-${index}`}
                              type="button"
                              onClick={() => setSelectedVideo(item)}
                              className="overflow-hidden rounded-[22px] border border-orange-100 bg-white text-left shadow-sm transition hover:-translate-y-1"
                            >
                              <div className="relative">
                                <Image
                                  src={
                                    item.thumbnail
                                      ? `${API_BASE_URL}${item.thumbnail}`
                                      : `${API_BASE_URL}${course.banner_image}`
                                  }
                                  alt={item.name}
                                  width={900}
                                  height={500}
                                  className="h-52 w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="rounded-full bg-white/90 p-4 text-orange-600 shadow-lg">
                                    <HugeiconsIcon
                                      icon={PlayCircle02Icon}
                                      size={30}
                                      strokeWidth={2.1}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="p-5">
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <h4 className="text-lg font-black text-slate-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm font-medium text-blue-700">
                                      {item.role}
                                    </p>
                                  </div>

                                  <div className="flex gap-1 text-orange-500">
                                    {[...Array(5)].map((_, i) => (
                                      <HugeiconsIcon
                                        key={i}
                                        icon={StarIcon}
                                        size={16}
                                        strokeWidth={2}
                                      />
                                    ))}
                                  </div>
                                </div>

                                {!!item.short_text && (
                                  <p className="mt-4 text-base leading-7 text-slate-600">
                                    {item.short_text}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-white p-6 shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-orange-500">
                        Enroll Today
                      </p>
                      <h3 className="mt-2 text-2xl font-black text-slate-900">
                        Course Pricing
                      </h3>
                    </div>

                    {course.discount_percentage > 0 && (
                      <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 shadow-sm">
                        Save {course.discount_percentage}%
                      </div>
                    )}
                  </div>

                  <div className="rounded-[26px] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-inner">
                    {course.old_price > 0 && (
                      <div className="mb-2">
                        <p className="text-2xl font-bold text-slate-400 line-through">
                          ₹{course.old_price}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-end gap-2">
                      <h3 className="text-4xl font-black tracking-tight text-orange-500 sm:text-5xl">
                        ₹{course.price}
                      </h3>
                      <span className="mb-1 rounded-full bg-slate-100 px-3 py-1 text-xl font-bold text-slate-600">
                        + 18% GST
                      </span>
              
                    </div>

                  </div>

                  <div className="mt-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={18}
                          strokeWidth={2.2}
                        />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-800">
                        What’s Included
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {course.includes.length > 0 ? (
                        course.includes.map((item, index) => (
                          <div
                            key={`${item}-${index}`}
                            className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50/60"
                          >
                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                              <HugeiconsIcon
                                icon={CheckmarkCircle02Icon}
                                size={16}
                                strokeWidth={2.2}
                              />
                            </div>
                            <span className="text-sm font-semibold leading-6 text-slate-700">
                              {item}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                          No course inclusions added.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      type="button"
                      onClick={() => setOpenEnrollModal(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 text-sm font-extrabold text-white shadow-[0_18px_35px_rgba(249,115,22,0.28)] transition duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
                    >
                      Start Learning Now
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </button>

                    {!!course.syllabus_pdf && (
                      <a
                        href={`${API_BASE_URL}${course.syllabus_pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100"
                      >
                        <HugeiconsIcon
                          icon={Download01Icon}
                          size={18}
                          strokeWidth={2.2}
                        />
                        Download Curriculum
                      </a>
                    )}
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs font-semibold text-slate-500">
                    30-day satisfaction support included
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <HugeiconsIcon
                        icon={Bookmark02Icon}
                        size={20}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        Program Overview
                      </h3>
                      <p className="text-sm text-slate-500">
                        Quick snapshot of the course details
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {course.program_overview.length > 0 ? (
                      course.program_overview.map((item, index) => (
                        <div
                          key={`${item.label}-${index}`}
                          className="grid grid-cols-[minmax(160px,1.2fr)_1fr] items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                        >
                          <span className="text-sm font-semibold text-slate-500">
                            {item.label}
                          </span>
                          <span className="text-left text-sm font-bold leading-6 text-slate-800">
                            {item.value}
                          </span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="grid grid-cols-[minmax(160px,1.2fr)_1fr] items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                          <span className="text-sm font-semibold text-slate-500">
                            Level
                          </span>
                          <span className="text-left text-sm font-bold text-slate-800">
                            {course.level}
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(160px,1.2fr)_1fr] items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                          <span className="text-sm font-semibold text-slate-500">
                            Duration
                          </span>
                          <span className="text-left text-sm font-bold text-slate-800">
                            {course.total_duration || "N/A"}
                          </span>
                        </div>

                        <div className="grid grid-cols-[minmax(160px,1.2fr)_1fr] items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                          <span className="text-sm font-semibold text-slate-500">
                            Category
                          </span>
                          <span className="text-left text-sm font-bold text-slate-800">
                            {course.category}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <HugeiconsIcon
                        icon={Share08Icon}
                        size={20}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        Spread the Word
                      </h3>
                      <p className="text-sm text-slate-500">
                        Share this program with friends and learners
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.href : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-100"
                    >
                      <HugeiconsIcon
                        icon={Linkedin02Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Check out this course: ${course.title}`
                      )}&url=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.href : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-200"
                    >
                      <HugeiconsIcon
                        icon={NewTwitterIcon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </a>

                    <a
                      href={`mailto:?subject=${encodeURIComponent(
                        course.title
                      )}&body=${encodeURIComponent(
                        `Check this course: ${
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        }`
                      )}`}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100"
                    >
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </a>

                    <button
                      type="button"
                      onClick={copyLink}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50 text-orange-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-100"
                    >
                      <HugeiconsIcon
                        icon={Copy01Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {openEnrollModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-8">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Enroll Now
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill your details and continue to Razorpay payment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenEnrollModal(false)}
                  className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={2.2}
                  />
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  name="mobile_no"
                  placeholder="Mobile Number"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 sm:col-span-2"
                />

                <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
                  <h4 className="text-base font-bold text-slate-900">
                    Billing Details
                  </h4>

                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between">
                      <span>Course Fee</span>
                      <span className="font-semibold text-slate-900">
                        ₹{basePrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>GST (18%)</span>
                      <span className="font-semibold text-slate-900">
                        ₹{gstAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Convenience Fee (3%)</span>
                      <span className="font-semibold text-slate-900">
                        ₹{convenienceFeeAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-300 pt-3">
                      <span className="text-base font-bold text-slate-900">
                        Total
                      </span>
                      <span className="text-base font-bold text-orange-600">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-4 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(249,115,22,0.24)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {paymentLoading
                    ? "Processing..."
                    : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedVideo && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 py-8">
            <div className="w-full max-w-4xl rounded-[24px] bg-white p-4 shadow-2xl sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    {selectedVideo.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {selectedVideo.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={2.2}
                  />
                </button>
              </div>

              <div className="overflow-hidden rounded-[20px] bg-black">
                {selectedVideo.video_type === "upload" ? (
                  <video
                    controls
                    className="h-[260px] w-full bg-black sm:h-[480px]"
                    src={getEmbedUrl(
                      selectedVideo.video_type,
                      selectedVideo.video
                    )}
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl(
                      selectedVideo.video_type,
                      selectedVideo.video
                    )}
                    className="h-[260px] w-full sm:h-[480px]"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>

              {!!selectedVideo.short_text && (
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {selectedVideo.short_text}
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}