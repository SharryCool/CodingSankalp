"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  BookOpen01Icon,
  Brain02Icon,
  CodeIcon,
  PlayCircle02Icon,
  StudentIcon,
} from "@hugeicons-pro/core-stroke-rounded";

interface CourseInstructor {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

interface CourseItem {
  _id: string;
  title: string;
  short_description: string;
  full_description: string;
  banner_image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  old_price?: number;
  discount_percentage?: number;
  average_rating?: number;
  total_ratings?: number;
  total_learners?: number;
  total_duration?: string;
  instructors?: CourseInstructor[];
  is_active: boolean;
  is_featured?: boolean;
  last_updated_text?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FetchResponse {
  message: string;
  success: boolean;
  data: CourseItem[];
}

const getCourseTheme = (category: string, index: number) => {
  const categoryText = category.toLowerCase();

  if (categoryText.includes("python")) {
    return {
      icon: BookOpen01Icon,
      tagClass: "bg-orange-50 text-orange-600",
      iconClass: "bg-orange-50 text-orange-500",
      borderClass: "border-orange-100",
      priceClass: "text-orange-500",
      buttonClass: "bg-orange-500 hover:bg-orange-600",
    };
  }

  if (categoryText.includes("dsa") || categoryText.includes("data")) {
    return {
      icon: CodeIcon,
      tagClass: "bg-blue-50 text-blue-700",
      iconClass: "bg-blue-50 text-blue-700",
      borderClass: "border-blue-100",
      priceClass: "text-blue-700",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
    };
  }

  if (
    categoryText.includes("ai") ||
    categoryText.includes("full stack") ||
    categoryText.includes("fastapi") ||
    categoryText.includes("react")
  ) {
    return {
      icon: Brain02Icon,
      tagClass: "bg-emerald-50 text-emerald-600",
      iconClass: "bg-emerald-50 text-emerald-600",
      borderClass: "border-emerald-100",
      priceClass: "text-emerald-600",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700",
    };
  }

  const themes = [
    {
      icon: BookOpen01Icon,
      tagClass: "bg-orange-50 text-orange-600",
      iconClass: "bg-orange-50 text-orange-500",
      borderClass: "border-orange-100",
      priceClass: "text-orange-500",
      buttonClass: "bg-orange-500 hover:bg-orange-600",
    },
    {
      icon: CodeIcon,
      tagClass: "bg-blue-50 text-blue-700",
      iconClass: "bg-blue-50 text-blue-700",
      borderClass: "border-blue-100",
      priceClass: "text-blue-700",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Brain02Icon,
      tagClass: "bg-emerald-50 text-emerald-600",
      iconClass: "bg-emerald-50 text-emerald-600",
      borderClass: "border-emerald-100",
      priceClass: "text-emerald-600",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700",
    },
  ];

  return themes[index % themes.length];
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

export default function FeaturedCoursesSection() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/course-detail-page/fetch-active-course-detail-pages`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result: FetchResponse = await res.json();

        if (result?.success) {
          setCourses(result.data || []);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch active course detail pages:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="bg-[#fffaf5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Featured Courses
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Learn with practical, career-focused programs
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Structured online courses designed for students, freshers, and professionals.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
              >
                <div className="h-60 animate-pulse bg-slate-200" />
                <div className="p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="mt-5 h-14 animate-pulse rounded-2xl bg-slate-100" />
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-12 w-32 animate-pulse rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course, index) => {
              const theme = getCourseTheme(course.category, index);

              return (
                <div
                  key={course._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className={`group overflow-hidden rounded-[28px] border ${theme.borderClass} bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]`}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${course.banner_image}`}
                      alt={course.title}
                      width={900}
                      height={600}
                      className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] backdrop-blur-xl ${theme.tagClass}`}
                    >
                      {course.category}
                    </div>

                    {course.discount_percentage ? (
                      <div className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-3 py-2 text-xs font-extrabold text-white backdrop-blur-xl">
                        {course.discount_percentage}% OFF
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${theme.iconClass}`}
                      >
                        <HugeiconsIcon icon={theme.icon} size={20} strokeWidth={2.2} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-xl font-black text-slate-900">
                          {course.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                          {course.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <HugeiconsIcon icon={StudentIcon} size={18} strokeWidth={2} />
                        {course.total_learners ? `${course.total_learners}+` : "New Batch"}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <HugeiconsIcon icon={PlayCircle02Icon} size={18} strokeWidth={2} />
                        {course.total_duration || "Updated Course"}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                        {course.level}
                      </span>

                      {course.last_updated_text ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {course.last_updated_text}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">Starting from</p>

                        <div className="flex items-center gap-2">
                          <p className={`text-2xl font-black ${theme.priceClass}`}>
                            {formatPrice(course.price)}
                          </p>

                          {course.old_price && course.old_price > course.price ? (
                            <span className="text-sm font-semibold text-slate-400 line-through">
                              {formatPrice(course.old_price)}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course._id}`}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 ${theme.buttonClass}`}
                      >
                        View Course
                        <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2.2} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="mt-12 rounded-[28px] border border-dashed border-orange-200 bg-white p-10 text-center"
          >
            <h3 className="text-2xl font-black text-slate-900">No active courses found</h3>
            <p className="mt-3 text-slate-600">
              Please add active course detail pages from admin panel.
            </p>
          </div>
        )}

        <div data-aos="fade-up" className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-sm transition-all duration-300 hover:border-blue-200 hover:text-blue-800"
          >
            Explore All Courses
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}