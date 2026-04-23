"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  BookOpen01Icon,
  Brain02Icon,
  CodeIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons-pro/core-stroke-rounded";

const items = [
  {
    title: "Python",
    icon: BookOpen01Icon,
    className: "border-orange-200 text-orange-600",
  },
  {
    title: "DSA",
    icon: CodeIcon,
    className: "border-blue-200 text-blue-700",
  },
  {
    title: "AI Full Stack",
    icon: Brain02Icon,
    className: "border-emerald-200 text-emerald-600",
  },
];

const points = [
  "Live interactive classes",
  "Projects and assignments",
  "Career-focused roadmap",
  "Beginner friendly approach",
];

export default function CTASection() {
  return (
    <section className="bg-[#fffaf5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="relative overflow-hidden rounded-[36px] border border-blue-100 bg-[linear-gradient(135deg,#fff7ed_0%,#eff6ff_50%,#ecfdf5_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:p-10 lg:p-12"
        >
          <div className="absolute inset-0">
            <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                Start Learning Today
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Transform your future with expert-led online courses
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Join CodingSankalp and master Python, DSA, and AI Powered Full
                Stack development through live classes, guided projects, and
                practical learning.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className={`inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm font-bold ${item.className}`}
                  >
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2.2} />
                    {item.title}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_35px_rgba(249,115,22,0.24)] transition-all duration-300 hover:bg-orange-600"
                >
                  Browse Courses
                  <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={2.2} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-7 py-4 text-sm font-extrabold text-blue-700 transition-all duration-300 hover:border-blue-200 hover:text-blue-800"
                >
                  Enroll Now
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur-xl">
              <h3 className="text-2xl font-black text-slate-900">
                Why students choose us
              </h3>

              <div className="mt-6 space-y-4">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={20}
                      strokeWidth={2.2}
                      className="text-emerald-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}