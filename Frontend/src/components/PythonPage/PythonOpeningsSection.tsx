"use client";

import { useEffect, useState } from "react";

const openingsData = [
  { value: 140000, label: "Available Roles", suffix: "+", subtitle: "Across multiple industries" },
  { value: 120000, label: "Live Opportunities", suffix: "+", subtitle: "Updated regularly" },
  { value: 7000, label: "Experienced Positions", suffix: "+", subtitle: "Mid & senior level roles" },
  { value: 800, label: "Entry-Level Roles", suffix: "+", subtitle: "For freshers & beginners" },
];

// Count Up Hook
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

export default function PythonOpeningsSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#ecfdf5] via-[#f7fdf9] to-[#fffbeb]">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#10b981]/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#f59e0b]/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto opacity-0 translate-y-6 animate-fadeUp">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#064e3b] leading-tight">
            Strong Demand for Python Skills
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            Companies across industries continue to seek professionals with Python expertise.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {openingsData.map((item) => {
            const count = useCountUp(item.value);

            return (
              <div
                key={item.label}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[#10b981]/40 via-transparent to-[#f59e0b]/40 transition duration-300 hover:scale-[1.04]"
              >
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                  {/* Number */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#059669]">
                    {count.toLocaleString()}
                    {item.suffix}
                  </h3>

                  {/* Label */}
                  <p className="mt-2 text-base font-semibold text-[#111827]">
                    {item.label}
                  </p>

                  {/* Subtitle */}
                  <p className="mt-1 text-sm text-[#6b7280]">
                    {item.subtitle}
                  </p>

                  {/* Accent Line */}
                  <div className="mt-4 h-[3px] w-10 mx-auto rounded-full bg-[#f59e0b] transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-[#6b7280] mt-12 opacity-80">
          Based on aggregated hiring patterns and publicly available market trends.
        </p>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}