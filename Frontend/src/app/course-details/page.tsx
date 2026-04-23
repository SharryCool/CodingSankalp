"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  BookOpen01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Copy01Icon,
  Download01Icon,
  PlayCircle02Icon,
  Share08Icon,
  StarIcon,
  StudentIcon,
  CodeIcon,
  DatabaseIcon,
  SecurityCheckIcon,
  Mail01Icon,
  NewTwitterIcon,
  Linkedin02Icon,
} from "@hugeicons-pro/core-stroke-rounded";

type TabType = "overview" | "feedback";

const competencies = [
  {
    title: "Client-Side Engineering",
    description: "React, TypeScript, modern UI systems, reusable components.",
    icon: CodeIcon,
    accent: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Server Architecture",
    description: "Node.js, API design, authentication, and scalable structure.",
    icon: BookOpen01Icon,
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "Data Layer Design",
    description: "MongoDB, schema design, indexing, and data organization.",
    icon: DatabaseIcon,
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Quality & Protection",
    description: "Validation, testing basics, token auth, and secure flows.",
    icon: SecurityCheckIcon,
    accent: "bg-orange-50 text-orange-600 border-orange-100",
  },
];

const prerequisites = [
  "Basic understanding of HTML and CSS",
  "Familiarity with JavaScript fundamentals",
  "Laptop or desktop with internet connection",
  "Code editor installed on your system",
];

const includes = [
  "Verified certificate",
  "45+ hours of guided video learning",
  "Downloadable notes and assets",
  "Lifetime access to content",
  "Project-based assignments included",
];

const overview = [
  { label: "Length", value: "14 weeks" },
  { label: "Level", value: "Intermediate" },
  { label: "Language", value: "English" },
  { label: "Assessments", value: "18 quizzes" },
  { label: "Projects", value: "6 major projects" },
  { label: "Last Updated", value: "January 2026" },
];

const feedbackItems = [
  {
    name: "Aman Raj",
    role: "Python Student",
    review:
      "Very practical teaching style. The course helped me connect frontend and backend concepts clearly.",
  },
  {
    name: "Priya Sharma",
    role: "DSA Learner",
    review:
      "The structure feels job-focused. I liked the assignments and project explanations the most.",
  },
  {
    name: "Rahul Verma",
    role: "Full Stack Student",
    review:
      "Best part is clarity and implementation. It is not just theory, it shows how real apps are built.",
  },
];

const syllabusPdf = "/pdfs/course-curriculum.pdf";

function TabButton({
  label,
  value,
  activeTab,
  setActiveTab,
}: {
  label: string;
  value: TabType;
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}) {
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`rounded-full px-6 py-3 text-sm font-extrabold transition-all duration-300 ${
        isActive
          ? "bg-emerald-50 text-emerald-700 shadow-sm"
          : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
      }`}
    >
      {label}
    </button>
  );
}

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabContent = useMemo(() => {
    if (activeTab === "feedback") {
      return (
        <div className="pt-7">
          <h3 className="text-2xl font-black text-slate-900">Student Feedback</h3>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Real comments from learners who joined the program and completed
            guided training.
          </p>

          <div className="mt-6 grid gap-4">
            {feedbackItems.map((item) => (
              <div
                key={item.name}
                className="rounded-[22px] border border-orange-100 bg-white p-5 shadow-sm"
              >
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

                <p className="mt-4 text-base leading-8 text-slate-600">
                  {item.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="pt-7">
          <h3 className="text-2xl font-black text-slate-900">
            About This Program
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-600">
            This course is designed for learners who want a practical, guided
            path into full stack development. Instead of only theory, the
            training focuses on real implementation, helping students understand
            how frontend, backend, APIs, authentication, and databases work
            together in actual projects.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            By the end of the program, learners will have built multiple working
            applications, understood clean project structure, and gained
            confidence for freelance, internship, or job-ready development work.
          </p>
        </div>

        <div className="pt-10">
          <h3 className="text-2xl font-black text-slate-900">
            Core Competencies
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {competencies.map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${item.accent}`}
                >
                  <HugeiconsIcon icon={item.icon} size={22} strokeWidth={2.2} />
                </div>

                <h4 className="mt-4 text-lg font-black text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10">
          <h3 className="text-2xl font-black text-slate-900">Prerequisites</h3>

          <div className="mt-5 space-y-4">
            {prerequisites.map((item) => (
              <div key={item} className="flex items-start gap-3">
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
        </div>
      </>
    );
  }, [activeTab]);

  return (
    <>
    
    <main className="bg-[#fffaf5] text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_55%,#f3fff9_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Course Details
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Explore a structured, project-driven course experience designed to
              help students build real skills with guided learning, practical
              tasks, and career-focused direction.
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
            <span className="text-blue-700">Course Details</span>
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
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                    alt="Course banner"
                    width={1600}
                    height={900}
                    className="h-[260px] w-full object-cover sm:h-[360px]"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))]" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                    <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
                      AI Full Stack
                    </span>
                    <span className="rounded-full bg-blue-700 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
                      Intermediate
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Complete Full Stack JavaScript Bootcamp
                      </h2>

                      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                        Build expertise in modern web technologies including React,
                        Node.js, APIs, authentication, and database integration
                        through practical training, guided assignments, and
                        project-based implementation.
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-600">
                        <div className="flex items-center gap-2 text-orange-500">
                          <HugeiconsIcon icon={StarIcon} size={18} strokeWidth={2} />
                          <span className="text-slate-700">4.9 (1,589 ratings)</span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-700">
                          <HugeiconsIcon
                            icon={StudentIcon}
                            size={18}
                            strokeWidth={2}
                          />
                          <span className="text-slate-700">4,210 learners</span>
                        </div>

                        <div className="flex items-center gap-2 text-emerald-600">
                          <HugeiconsIcon icon={Clock01Icon} size={18} strokeWidth={2} />
                          <span className="text-slate-700">45h total</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-emerald-100 bg-[linear-gradient(135deg,#f3fff9_0%,#eff6ff_100%)] p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <Image
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                          alt="Instructor"
                          width={80}
                          height={80}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Lead Instructor
                          </p>
                          <h3 className="mt-1 text-lg font-black text-slate-900">
                            Lokesh Raikwar
                          </h3>
                          <p className="text-sm font-medium text-slate-600">
                            Full Stack & AI Mentor
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
                    <TabButton
                      label="Overview"
                      value="overview"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />

                    <a
                      href={syllabusPdf}
                      download="course-curriculum.pdf"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-600 transition-all duration-300 hover:border-blue-200 hover:text-blue-700"
                    >
                      <HugeiconsIcon
                        icon={Download01Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                      Syllabus
                    </a>

                    <TabButton
                      label="Feedback"
                      value="feedback"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  </div>

                  {tabContent}
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <h3 className="text-5xl font-black tracking-tight text-orange-500">
                    ₹4,999
                  </h3>
                  <div className="pt-2">
                    <p className="text-lg font-bold text-slate-400 line-through">
                      ₹8,999
                    </p>
                  </div>
                </div>

                <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  Save 44%
                </div>

                <div className="mt-6 space-y-4">
                  {includes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 text-emerald-600">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={18}
                          strokeWidth={2.2}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-4 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(249,115,22,0.24)] transition hover:bg-orange-600"
                  >
                    Start Learning Now
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      size={18}
                      strokeWidth={2.2}
                    />
                  </Link>

             

                  <a
                    href={syllabusPdf}
                    download="course-curriculum.pdf"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <HugeiconsIcon
                      icon={Download01Icon}
                      size={18}
                      strokeWidth={2.2}
                    />
                    Download Curriculum
                  </a>
                </div>

                <div className="mt-5 text-center text-xs font-semibold text-slate-500">
                  30-day satisfaction support included
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <h3 className="text-xl font-black text-slate-900">
                  Program Overview
                </h3>

                <div className="mt-5 divide-y divide-slate-200">
                  {overview.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-sm font-semibold text-slate-500">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Share08Icon} size={20} strokeWidth={2.2} />
                  <h3 className="text-xl font-black text-slate-900">
                    Spread the Word
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                  >
                    <HugeiconsIcon
                      icon={Linkedin02Icon}
                      size={18}
                      strokeWidth={2.2}
                    />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <HugeiconsIcon
                      icon={NewTwitterIcon}
                      size={18}
                      strokeWidth={2.2}
                    />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                  >
                    <HugeiconsIcon icon={Mail01Icon} size={18} strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition hover:bg-orange-100"
                  >
                    <HugeiconsIcon icon={Copy01Icon} size={18} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


    </main>
    </>
  );
}