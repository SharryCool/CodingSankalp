"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";

// Stroke icon (for quote)
import { QuoteUpIcon } from "@hugeicons-pro/core-stroke-rounded";

// Solid icon (for filled stars)
import { StarIcon } from "@hugeicons-pro/core-solid-rounded";

const testimonials = [
  {
    name: "Aman Raj",
    role: "Python Student",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    review:
      "CodingSankalp made Python very easy to understand. The live classes, practice tasks, and support helped me improve quickly.",
  },
  {
    name: "Priya Sharma",
    role: "DSA Learner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    review:
      "The DSA teaching style is very practical. I finally started solving problems with confidence and better logic.",
  },
  {
    name: "Rahul Verma",
    role: "AI Full Stack Student",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    review:
      "This course gave me real clarity on Python, backend, and AI integration. The roadmap feels job oriented and modern.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_100%)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            What our students say
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Real feedback from learners growing with CodingSankalp.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              
              {/* Top section */}
              <div className="flex items-center justify-between">
                
                {/* ⭐ Filled Stars */}
                <div className="flex gap-1 text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarIcon}
                      size={18}
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <HugeiconsIcon
                    icon={QuoteUpIcon}
                    size={20}
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              {/* Review */}
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {item.review}
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-700">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}