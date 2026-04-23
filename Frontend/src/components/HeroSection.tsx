"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from "react-type-animation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  PlayCircle02Icon,
  CheckmarkCircle02Icon,
  BookOpen01Icon,
  Brain02Icon,
  CodeIcon,
  Award01Icon,
  StudentIcon,
  ArrowDown01Icon,
  AiBookIcon,
} from "@hugeicons-pro/core-stroke-rounded";

const coursePills = [
  { title: "Python", icon: BookOpen01Icon, color: "text-orange-600" },
  { title: "DSA", icon: CodeIcon, color: "text-blue-700" },
  { title: "AI Full Stack", icon: Brain02Icon, color: "text-emerald-600" },
];

const stats = [
  { value: "5,000+", label: "Students Learning" },
  { value: "50+", label: "Live Projects" },
  { value: "100%", label: "Online Classes" },
];

const features = [
  "Live online interactive classes",
  "Beginner to advanced roadmap",
  "Real-world projects and assignments",
  "Career-focused learning path",
];

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_45%,#f6fffb_100%)] pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div>
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 shadow-sm backdrop-blur-xl"
          >
            <HugeiconsIcon icon={Award01Icon} size={16} strokeWidth={2} />
            India’s Practical Online Learning Platform
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-6 flex flex-wrap gap-3"
          >
            {coursePills.map((item) => (
              <div
                key={item.title}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
              >
                <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} className={item.color} />
                {item.title}
              </div>
            ))}
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="mt-7">
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn{" "}
              <span className="text-orange-500">
                <TypeAnimation
                  sequence={[
                    "Python",
                    1600,
                    "DSA",
                    1600,
                    "AI Powered Full Stack",
                    1600,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block"
                />
              </span>
              <br />
              with Live Online Classes
            </h1>
          </div>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            CodingSankalp helps students and professionals master Python,
            Data Structures & Algorithms, and AI-powered full stack development
            through live classes, practical projects, expert guidance, and a
            job-focused roadmap.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/courses"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_35px_rgba(249,115,22,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Courses
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-7 py-4 text-sm font-extrabold text-blue-700 shadow-[0_12px_28px_rgba(59,130,246,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-800"
            >
              <HugeiconsIcon
                icon={PlayCircle02Icon}
                size={20}
                strokeWidth={2.2}
              />
              Watch Demo
            </Link>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
              >
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={18}
                  strokeWidth={2.2}
                  className="text-emerald-500"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-10 flex flex-wrap gap-4"
          >
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={`min-w-[150px] rounded-3xl border bg-white/90 px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ${
                  index === 0
                    ? "border-orange-100"
                    : index === 1
                    ? "border-blue-100"
                    : "border-emerald-100"
                }`}
              >
                <h3
                  className={`text-2xl font-black ${
                    index === 0
                      ? "text-orange-500"
                      : index === 1
                      ? "text-blue-700"
                      : "text-emerald-600"
                  }`}
                >
                  {item.value}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-aos="zoom-in" data-aos-delay="250">
          <div className="absolute -left-4 top-10 z-30 hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-[0_14px_35px_rgba(59,130,246,0.10)] sm:block lg:-left-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <HugeiconsIcon icon={StudentIcon} size={20} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Active Learners
                </p>
                <p className="text-lg font-extrabold text-slate-900">2,450+</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-12 z-30 hidden rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-[0_14px_35px_rgba(16,185,129,0.10)] sm:block lg:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <HugeiconsIcon icon={AiBookIcon} size={20} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Course Mode
                </p>
                <p className="text-base font-extrabold text-slate-900">
                  Live + Projects
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
            <div className="relative overflow-hidden rounded-[24px] bg-[#f8fbff]">
              <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_35%)]" />

              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="CodingSankalp online course learning"
                width={900}
                height={700}
                className="relative z-0 h-[440px] w-full object-cover"
                priority
              />

              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.42))]" />

              <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-3">
                <div className="rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-600 backdrop-blur-xl">
                  CodingSankalp
                </div>

                <div className="rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-bold text-blue-700 backdrop-blur-xl">
                  100% Online
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="rounded-[24px] border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                        Start Your Learning Journey
                      </p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">
                        Become Job Ready with Expert-Led Online Courses
                      </h3>
                    </div>

                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:bg-orange-600"
                    >
                      Browse Now
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={18}
                        strokeWidth={2.2}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
            <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2.2} />
            Scroll to explore courses and categories
          </div>
        </div>
      </div>
    </section>
  );
}