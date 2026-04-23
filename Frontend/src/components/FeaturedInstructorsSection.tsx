"use client";

import { useRef } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, ArrowRight02Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const instructors = [
  {
    name: "Lokesh",
    role: "Python & Full Stack Mentor",
    tag: "7+ Years",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=90",
    description:
      "Teaches Python with practical coding and project-based learning. Focused on building real-world skills through hands-on projects that translate directly into job-ready portfolios.",
    stats: [
      { label: "Students", value: "2,400+" },
      { label: "Projects", value: "180+" },
      { label: "Rating", value: "4.9★" },
    ],
    skills: ["Python", "Django", "React", "Node.js", "PostgreSQL"],
    index: "01",
  },
  {
    name: "Career Mentor",
    role: "Interview & Placement Guide",
    tag: "Ex-Google",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1400&q=90",
    description:
      "Helps students prepare for interviews, craft standout resumes, and navigate hiring strategies to confidently crack top-tier companies across the globe.",
    stats: [
      { label: "Placed", value: "900+" },
      { label: "Companies", value: "60+" },
      { label: "Rating", value: "5.0★" },
    ],
    skills: ["DSA", "System Design", "Resume", "Mock Interviews", "FAANG"],
    index: "02",
  },
];

export default function FeaturedInstructorsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-[#fffaf5] py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-orange-500" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
                Featured Instructors
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Learn from<br />
              <span className="text-orange-500">passionate</span> mentors
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed sm:text-right">
            Hand-picked experts dedicated to transforming your career through real‑world guidance.
          </p>
        </div>

        {/* ── Swiper ── */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="!overflow-visible"
        >
          {instructors.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-orange-100 border border-orange-100 bg-white" style={{ height: 520 }}>

                {/* ── Image Column ── */}
                <div className="relative order-1 h-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1400}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Live badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {item.tag}
                  </div>

                  {/* Large index number watermark */}
                  <span className="absolute bottom-4 right-5 font-black text-7xl leading-none text-white/10 select-none pointer-events-none">
                    {item.index}
                  </span>
                </div>

                {/* ── Content Column ── */}
                <div className="order-2 flex flex-col justify-between p-8 sm:p-10 bg-white">
                  <div>
                    {/* Expert tag */}
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-orange-500 mb-5">
                      <HugeiconsIcon icon={Award01Icon} size={13} />
                      Expert Mentor
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-orange-500 uppercase tracking-widest">
                      {item.role}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-500 max-w-sm">
                      {item.description}
                    </p>

                    {/* Skill pills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                      {item.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-2xl font-black text-slate-900">{s.value}</p>
                          <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-slate-400">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA + Nav arrows */}
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <button className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 active:translate-y-0">
                          Explore Profile
                          <HugeiconsIcon
                            icon={ArrowRight02Icon}
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </button>
                        <button className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                          View all mentors →
                        </button>
                      </div>

                      {/* Prev / Next */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => swiperRef.current?.slidePrev()}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-500 hover:shadow-sm"
                          aria-label="Previous"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={() => swiperRef.current?.slideNext()}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-500 hover:shadow-sm"
                          aria-label="Next"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
