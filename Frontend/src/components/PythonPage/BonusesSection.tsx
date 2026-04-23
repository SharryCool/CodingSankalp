"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const bonuses = [
  {
    badge: "Project Experience",
    text: "Build 2 real-world capstone projects to strengthen your portfolio",
  },
  {
    badge: "Career Toolkit",
    text: "Access ready-to-use resume formats designed for tech roles",
  },
  {
    badge: "Portfolio Starter",
    text: "Get modern website templates to launch your personal portfolio",
  },
];

function formatTime(value: number) {
  return value.toString().padStart(2, "0");
}

export default function BonusesSection() {
  const initialSeconds = useMemo(() => 600, []); // 10 min timer
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="relative bg-[#f7fdf7] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] leading-tight">
            What You’ll Get Along With The Course
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Practical resources designed to help you apply, build, and stand out.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bonuses.map((item) => (
            <div
              key={item.badge}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <span className="inline-block bg-[#f8b519] text-black font-semibold px-4 py-1.5 rounded-full text-sm">
                {item.badge}
              </span>

              <p className="mt-5 text-lg font-semibold text-[#1f2937] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-[#065f46]">
            Limited Seats for This Batch
          </h3>
          <p className="mt-3 text-gray-600 text-lg">
            Enroll now to secure your spot in the upcoming cohort.
          </p>
        </div>

        {/* Timer */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="bg-white border border-gray-200 rounded-xl px-8 py-6 text-center shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-[#065f46]">
              {formatTime(minutes)}
            </div>
            <p className="text-sm text-gray-500 mt-1">Minutes</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl px-8 py-6 text-center shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-[#065f46]">
              {formatTime(seconds)}
            </div>
            <p className="text-sm text-gray-500 mt-1">Seconds</p>
          </div>
        </div>

        {/* Price */}
        <p className="mt-10 text-center text-lg md:text-xl text-gray-700">
          Early access price for a limited time
        </p>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg md:text-xl font-bold text-white shadow-md transition"
          >
            Start Learning Today
            <span className="ml-3 text-sm line-through text-green-200">₹1999</span>
            <span className="ml-2 text-xl text-[#f8b519]">₹199</span>
          </Link>
        </div>
      </div>
    </section>
  );
}