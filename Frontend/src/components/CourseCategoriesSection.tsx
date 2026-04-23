"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon,
  Brain02Icon,
  CodeIcon,
  StudentIcon,
} from "@hugeicons-pro/core-stroke-rounded";

const categories = [
  {
    title: "Python Programming",
    count: "12 Courses",
    icon: BookOpen01Icon,
    iconWrap: "bg-orange-50 text-orange-500",
    border: "border-orange-100",
  },
  {
    title: "Data Structures",
    count: "8 Courses",
    icon: CodeIcon,
    iconWrap: "bg-blue-50 text-blue-700",
    border: "border-blue-100",
  },
  {
    title: "Algorithms",
    count: "10 Courses",
    icon: CodeIcon,
    iconWrap: "bg-blue-50 text-blue-700",
    border: "border-blue-100",
  },
  {
    title: "AI & ML Basics",
    count: "6 Courses",
    icon: Brain02Icon,
    iconWrap: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    title: "Full Stack Projects",
    count: "9 Courses",
    icon: Brain02Icon,
    iconWrap: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    title: "Interview Preparation",
    count: "7 Courses",
    icon: StudentIcon,
    iconWrap: "bg-orange-50 text-orange-500",
    border: "border-orange-100",
  },
];

export default function CourseCategoriesSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_100%)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Course Categories
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Choose your learning path
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Start from fundamentals or jump into advanced job-ready tracks.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => (
            <div
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className={`rounded-[24px] border ${item.border} bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconWrap}`}>
                  <HugeiconsIcon icon={item.icon} size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">{item.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}