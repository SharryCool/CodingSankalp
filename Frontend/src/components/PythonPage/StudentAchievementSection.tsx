"use client";

import Link from "next/link";

const outcomes = [
  "Gained confidence in writing clean and efficient Python code",
  "Improved problem-solving and logical thinking skills",
  "Learned structured debugging techniques to save time",
  "Used AI tools to speed up development workflows",
  "Automated repetitive tasks for better productivity",
  "Built a strong foundation for long-term career growth",
];

export default function StudentAchievementSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#ecfdf5] via-[#f7fdf9] to-[#fffbeb]">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#10b981]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#f59e0b]/20 blur-[120px] rounded-full" />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#064e3b] leading-tight">
            What You’ll Gain From This Program
          </h2>

          <p className="mt-4 text-lg text-[#475569]">
            Practical skills and real-world understanding that help you grow as a developer.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {outcomes.map((item) => (
            <div
              key={item}
              className="group flex items-start gap-4 rounded-2xl p-[1px] bg-gradient-to-br from-[#10b981]/40 via-transparent to-[#f59e0b]/40 hover:scale-[1.02] transition duration-300"
            >
              <div className="flex gap-4 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                {/* Icon */}
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-[#059669] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Text */}
                <p className="text-base md:text-lg text-[#1f2937] leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">

          <p className="text-lg md:text-xl font-semibold text-[#064e3b]">
            If this aligns with your goals, you can get started today.
          </p>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#059669] to-[#10b981] px-8 py-4 text-lg md:text-xl font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:scale-105"
            >
              Start Learning Python with AI
              <span className="ml-3 text-white/70 line-through">₹799</span>
              <span className="ml-2">₹399</span>
            </Link>
          </div>

          <p className="mt-6 text-sm md:text-base text-[#6b7280]">
            Limited-time offer. Bonuses included for early learners.
          </p>
        </div>
      </div>
    </section>
  );
}