"use client";

import Link from "next/link";

const salaryCards = [
  {
    value: "₹4–6 LPA",
    description: "Typical starting range for entry-level Python roles",
  },
  {
    value: "₹8–12 LPA",
    description: "Professionals with a few years of hands-on experience",
  },
  {
    value: "₹15+ LPA",
    description: "Advanced roles involving automation, data & AI skills",
  },
];

export default function SalaryHikeSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#ecfdf5] via-[#f7fdf9] to-[#fffbeb]">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#10b981]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#f59e0b]/20 blur-[120px] rounded-full" />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#064e3b]">
            Build Skills That Increase Your Earning Potential
          </h2>

          <p className="mt-4 text-lg text-[#475569]">
            Python combined with automation and AI is widely used across industries, 
            opening doors to higher-value roles over time.
          </p>
        </div>

        {/* Salary Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {salaryCards.map((item) => (
            <div
              key={item.value}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[#10b981]/40 via-transparent to-[#f59e0b]/40 hover:scale-[1.03] transition duration-300"
            >
              {/* Glass Card */}
              <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl px-6 py-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                <h3 className="text-3xl md:text-4xl font-extrabold text-[#059669]">
                  {item.value}
                </h3>

                <p className="mt-4 text-base md:text-lg text-[#374151] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 h-[3px] w-10 mx-auto bg-[#f59e0b] rounded-full transition-all duration-300 group-hover:w-16" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#059669] to-[#10b981] px-8 py-4 text-lg md:text-xl font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:scale-105"
          >
            Become a Python & AI Professional
            <span className="ml-3 text-white/70 line-through">₹799</span>
            <span className="ml-2">₹399</span>
          </Link>

          <p className="mt-6 text-sm md:text-base text-[#6b7280]">
            Limited-time offer. Pricing subject to change.
          </p>
        </div>
      </div>
    </section>
  );
}