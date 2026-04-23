"use client";

import Image from "next/image";

const articleImages = [
  {
    id: 1,
    src: "/assets/articles/article-1.png",
    alt: "Industry insight 1",
    className: "h-[390px]",
  },
  {
    id: 2,
    src: "/assets/articles/article-2.png",
    alt: "Industry insight 2",
    className: "h-[190px]",
  },
  {
    id: 3,
    src: "/assets/articles/article-3.png",
    alt: "Industry insight 3",
    className: "h-[190px]",
  },
  {
    id: 4,
    src: "/assets/articles/article-4.png",
    alt: "Industry insight 4",
    className: "h-[375px]",
  },
  {
    id: 5,
    src: "/assets/articles/article-5.png",
    alt: "Industry insight 5",
    className: "h-[355px]",
  },
];

function ArticleShot({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.1)] transition ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover object-top" />
    </div>
  );
}

export default function AIShiftSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-16 md:py-24">

      {/* 🌿 background accents */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1450px] px-4 md:px-8 lg:px-10">

        {/* HEADER */}
        <div className="mx-auto max-w-5xl text-center">

          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-emerald-100 px-4 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm">
            <span className="h-2 w-2 bg-[#059669] rounded-full"></span>
            Industry Trends
          </div>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            AI is transforming the way
            <span className="block text-[#059669] mt-2">
              people work and grow
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-lg md:text-xl text-slate-600 leading-8">
            Across industries, professionals are increasingly using AI to
            automate tasks, improve efficiency, and make better decisions.
            Those who adapt early are gaining a clear advantage.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Here are some recent insights highlighting this shift:
          </p>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.05fr_1fr]">
          <div>
            <ArticleShot {...articleImages[0]} />
          </div>

          <div className="space-y-5">
            <ArticleShot {...articleImages[1]} />
            <ArticleShot {...articleImages[3]} />
          </div>

          <div className="space-y-5">
            <ArticleShot {...articleImages[2]} />
            <ArticleShot {...articleImages[4]} />
          </div>
        </div>

        {/* 🔥 ENHANCED BOTTOM BLOCK */}
        <div className="mt-14 max-w-3xl mx-auto text-center">

          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md px-6 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

            {/* Insight */}
            <p className="text-lg md:text-xl font-medium text-slate-700 leading-8">
              The shift is already underway — and learning how to work alongside
              AI is quickly becoming a valuable skill across roles.
            </p>

            {/* Transition line */}
            <p className="mt-4 text-base md:text-lg text-slate-600">
              The good news is, you don’t need a technical background to get
              started or benefit from these tools.
            </p>

            {/* Subtle highlight */}
            <div className="mt-5 inline-block rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700">
              Designed for beginners • No prior coding experience required
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}