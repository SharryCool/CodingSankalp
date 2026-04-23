"use client";

import Image from "next/image";
import Link from "next/link";

const highlights = [
  "5-day structured beginner program",
  "Live instructor-led sessions",
  "Hands-on guided exercises",
  "Certificate on completion",
];

const features = [
  "Understand Python concepts with clarity",
  "Write your first programs confidently",
  "Use AI tools to assist development",
  "Build small real-world use cases",
  "Avoid common beginner mistakes",
  "Clear roadmap for your next steps",
];

export default function PythonProOfferSection() {
  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">

      {/* 🌿 Soft green background glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-3xl" />

      {/* 🔴 Urgency Bar */}
      <div className="bg-[#b91c1c] text-white text-center text-sm py-3 font-medium tracking-wide">
        Enrollment closing soon • Limited seats available for this batch
      </div>

      <div className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* HERO */}
          <div className="text-center max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-emerald-100 px-4 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 bg-[#059669] rounded-full"></span>
              5-Day Live Program
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Learn Python Fundamentals & Explore AI
              <span className="block text-[#059669] mt-2">
                in Just 5 Days
              </span>
            </h1>

            <p className="mt-5 text-slate-600 text-lg leading-7">
              A focused, hands-on program designed to help beginners understand
              coding basics, write their first programs, and gain practical
              exposure to AI-assisted workflows.
            </p>

            {/* subtle urgency */}
            <p className="mt-3 text-sm text-[#b91c1c] font-medium">
              Limited seats available • Registrations closing shortly
            </p>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-[#059669] hover:bg-[#047857] transition shadow-[0_10px_30px_rgba(5,150,105,0.3)]"
            >
              Enroll for ₹399
              <span className="ml-3 text-sm line-through text-green-200">
                ₹799
              </span>
            </Link>
          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
            {highlights.map((item) => (
              <div
                key={item}
                className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-slate-200 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <div className="relative h-[260px] md:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                alt="Python learning"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span className="text-[#059669] font-bold mt-0.5">✓</span>
                <p className="text-slate-700 leading-6">{feature}</p>
              </div>
            ))}
          </div>

          {/* FINAL CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-white bg-[#f59e0b] hover:bg-[#d97706] transition shadow-[0_12px_35px_rgba(245,158,11,0.35)]"
            >
              Reserve Your Seat for ₹399
            </Link>

            <p className="mt-3 text-sm text-slate-500">
              Secure your spot in the upcoming batch
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}