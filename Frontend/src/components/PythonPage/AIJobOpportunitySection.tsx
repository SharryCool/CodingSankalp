"use client";

import Image from "next/image";
import Link from "next/link";

const articleShots = [
  "/assets/articles/article-1.png",
  "/assets/articles/article-2.png",
  "/assets/articles/article-3.png",
  "/assets/articles/article-4.png",
  "/assets/articles/article-5.png",
];

function ArticleCard({ src, index }: { src: string; index: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.1)] transition">
      <div className="relative w-full">
        <Image
          src={src}
          alt={`Industry insight ${index + 1}`}
          width={900}
          height={1200}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function AIJobOpportunitySection() {
  return (
    <section className="relative bg-[#f8fafc] py-16 md:py-20 overflow-hidden">

      {/* background glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">

        {/* 🔥 TRUST STRIP */}
        <div className="text-center mb-10">
          <p className="text-sm text-slate-500 font-medium">
            Featured discussions around AI & future of work
          </p>

          {/* Optional logos (replace later if you want real ones) */}
          <div className="mt-4 flex flex-wrap justify-center gap-6 opacity-70 text-sm font-semibold text-slate-400">
            <span>Tech Industry Reports</span>
            <span>Global Workforce Trends</span>
            <span>AI Adoption Insights</span>
            <span>Future Skills Research</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT CONTENT */}
          <div className="lg:sticky lg:top-24">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-emerald-100 px-4 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 bg-[#059669] rounded-full"></span>
              Industry Shift
            </div>

            <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
              Work is evolving with AI
              <span className="block text-[#059669] mt-2">
                faster than most expect
              </span>
            </h2>

            <div className="mt-6 space-y-5">

              {/* PROBLEM */}
              <p className="text-lg md:text-xl text-slate-600 leading-8">
                Many professionals feel uncertain about how AI will impact their
                roles, and where they stand in this shift.
              </p>

              {/* SHIFT */}
              <p className="text-lg md:text-xl text-slate-600 leading-8">
                But the reality is — those who understand how to use AI tools
                effectively are already improving productivity and opening new
                opportunities.
              </p>

              {/* OPPORTUNITY */}
              <p className="text-xl font-semibold text-slate-800 leading-8">
                It’s no longer about replacing skills, but enhancing them with
                the right tools and mindset.
              </p>

              <p className="text-base md:text-lg font-medium text-slate-600">
                These insights highlight how rapidly this transition is happening:
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">

              <Link
                href="/contact"
                className="inline-flex w-full max-w-[520px] items-center justify-center rounded-xl bg-[#059669] hover:bg-[#047857] px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_35px_rgba(5,150,105,0.3)] transition"
              >
                Join the 5-Day Python + AI Program
                <span className="ml-3 text-sm line-through text-green-200">
                  ₹799
                </span>
                <span className="ml-2 text-white font-bold">₹399</span>
              </Link>

              {/* urgency */}
              <p className="mt-4 text-sm text-[#b91c1c] font-medium">
                Limited seats available • Enrollment closing soon
              </p>

              {/* BONUS SECTION (NEW) */}
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm">
                Includes bonus learning resources and guided practice sessions
                for early participants
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            {articleShots.map((src, index) => (
              <ArticleCard key={src} src={src} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}