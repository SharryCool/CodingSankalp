"use client";

import Image from "next/image";
import Link from "next/link";

const mentors = [
  {
    name: "Aman Saurav",
    image: "/assets/mentors/aman-saurav.png",
    role: "Data & AI Mentor",
    highlights: [
      "10+ years experience in data & analytics",
      "Mentored thousands of learners",
      "Focus on practical, real-world skills",
    ],
    description:
      "Aman specializes in simplifying complex concepts and helping learners build strong fundamentals in Python, data, and AI tools through hands-on learning.",
  },
  {
    name: "Aditya Kachave",
    image: "/assets/mentors/aditya-kachave.png",
    role: "AI & Productivity Mentor",
    highlights: [
      "Experienced trainer for professionals",
      "Focus on AI-powered workflows",
      "Helps improve real-world productivity",
    ],
    description:
      "Aditya focuses on using AI tools to improve productivity, guiding learners to apply modern techniques in real-world scenarios and projects.",
  },
];

export default function MeetYourMentorsSection() {
  return (
    <section className="bg-[#f7fdf7] py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a]">
            Learn from Experienced Mentors
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Get guidance from professionals with real-world experience in Python, AI, and data.
          </p>

          {/* Trust Strip */}
          <p className="mt-3 text-sm text-[#065f46] font-medium">
            Practical experience • Industry exposure • Teaching-focused approach
          </p>
        </div>

        {/* Mentor Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#065f46]">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{mentor.role}</p>

                  {/* LinkedIn-style trust indicator */}
                  <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                    <span>🔗</span>
                    <span>Professional Profile</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-2 text-gray-700 text-sm">
                {mentor.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[#f8b519]">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Description */}
              <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                {mentor.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg font-bold text-white shadow-md transition"
          >
            Learn from Experts
            <span className="ml-3 text-sm line-through text-green-200">₹799</span>
            <span className="ml-2 text-xl text-[#f8b519]">₹399</span>
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Limited seats available for the upcoming batch
          </p>
        </div>
      </div>
    </section>
  );
}