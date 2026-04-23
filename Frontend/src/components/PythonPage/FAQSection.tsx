"use client";

import { useState } from "react";
import Link from "next/link";

const faqItems = [
  {
    question: "When does the next batch begin?",
    answer:
      "The upcoming batch is scheduled to start soon. You will receive all onboarding details via email after registration.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes. The program is designed for beginners as well as working professionals who want to build practical Python and AI skills from scratch.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes, you will receive a certificate of completion after finishing the program and submitting the required work.",
  },
  {
    question: "Will there be assignments or practice work?",
    answer:
      "Yes, you will get structured exercises, assignments, and project work to help you apply what you learn.",
  },
  {
    question: "How much time should I dedicate?",
    answer:
      "On average, 6–8 hours per week is sufficient to comfortably complete the program and projects.",
  },
  {
    question: "What kind of support will I get?",
    answer:
      "You will receive guidance throughout the program, including help with doubts, project feedback, and learning direction.",
  },
  {
    question: "What happens after I enroll?",
    answer:
      "You’ll receive onboarding details, access instructions, and step-by-step guidance to get started before the first session.",
  },
  {
    question: "I completed payment but didn’t receive confirmation",
    answer:
      "Please wait a few minutes and check your spam or promotions folder. If you still don’t see it, you can reach out to our support team for assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-[#f7fdf7] py-16 md:py-20">
      <div className="mx-auto max-w-[1000px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a]">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-5 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-[#065f46]">
                    {item.question}
                  </span>

                  <span
                    className={`text-lg font-bold text-[#065f46] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t px-5 py-4 text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg md:text-xl font-bold text-white shadow-md transition"
          >
            Enroll Now
            <span className="ml-3 text-sm line-through text-green-200">₹799</span>
            <span className="ml-2 text-xl text-[#f8b519]">₹399</span>
          </Link>

          {/* Trust Line */}
          <p className="mt-4 text-sm md:text-base text-gray-500">
            100+ learners have already started their journey
          </p>

          {/* Subtle urgency */}
          <p className="mt-2 text-sm text-[#065f46] font-medium">
            Limited seats available for the upcoming batch
          </p>
        </div>
      </div>
    </section>
  );
}