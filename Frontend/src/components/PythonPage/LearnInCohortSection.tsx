"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-[#f7fdf7] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-[#f8b519]/20 text-[#065f46] font-semibold px-4 py-2 rounded-full text-sm">
            Beginner Friendly • Live Cohort • Project-Based Learning
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-[#0f172a]">
            Learn Python with AI & Build Real Projects
            <span className="block text-[#065f46] mt-2">
              in Just a Few Weeks
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            A practical program to help you write code faster, automate tasks,
            and build real-world projects using AI tools.
          </p>

          {/* Key Points */}
          <div className="mt-6 space-y-3 text-gray-700 text-sm md:text-base">
            <p>✔ No prior coding experience required</p>
            <p>✔ Hands-on projects & assignments</p>
            <p>✔ Certificate on completion</p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg font-bold text-white shadow-md transition"
            >
              Start Learning Today
              <span className="ml-3 text-sm line-through text-green-200">
                ₹799
              </span>
              <span className="ml-2 text-xl text-[#f8b519]">₹399</span>
            </Link>

            {/* Trust */}
            <p className="mt-3 text-sm text-gray-500">
              Trusted by 100+ learners • Limited seats available
            </p>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg border">
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Coding with AI"
              width={600}
              height={400}
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -top-4 -left-4 bg-white shadow-md rounded-xl px-4 py-2 text-sm font-medium text-[#065f46]">
            ⚡ Faster Coding
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-4 -right-4 bg-white shadow-md rounded-xl px-4 py-2 text-sm font-medium text-[#065f46]">
            🤖 AI Assisted
          </div>
        </div>

      </div>
    </section>
  );
}