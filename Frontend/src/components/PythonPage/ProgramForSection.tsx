"use client";

import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Engineering Student",
    image: "/assets/testimonials/user1.jpg",
    feedback:
      "The program helped me understand Python from scratch. The project-based approach made it easy to apply concepts practically.",
  },
  {
    name: "Neha Verma",
    role: "Working Professional",
    image: "/assets/testimonials/user2.jpg",
    feedback:
      "I was able to automate several repetitive tasks at work using what I learned. The AI tools covered were very useful.",
  },
  {
    name: "Amit Singh",
    role: "Job Seeker",
    image: "/assets/testimonials/user3.jpg",
    feedback:
      "Building projects during the cohort really helped strengthen my resume. I feel much more confident applying for roles now.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-[#f8b519]">
      {"★★★★★".split("").map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f7fdf7] py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a]">
            What learners are saying
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Feedback from students and professionals who have completed the program
          </p>

          <p className="mt-2 text-sm font-medium text-[#065f46]">
            Practical learning • Real projects • Useful skills
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <Stars />

              {/* Feedback */}
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#065f46]">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg font-bold text-white shadow-md transition"
          >
            Start Learning Python with AI
            <span className="ml-3 text-sm line-through text-green-200">₹799</span>
            <span className="ml-2 text-xl text-[#f8b519]">₹399</span>
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Join learners building practical skills today
          </p>
        </div>
      </div>
    </section>
  );
}