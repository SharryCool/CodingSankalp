"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCallback, useEffect, useRef, useState } from "react";

type JobType = {
  _id?: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  role: string;
  job_type: string;
  responsibilities: string[];
  skills: string[];
  salary: string;
  location: string;
  experience: string;
  job_link: string;
  created_at: string;
  job_expiry_date: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  range?: string;
  data: JobType[];
};

const API_URL = "/api/jobs";
const LIMIT = 50;

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const [filters, setFilters] = useState({
    search: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
  });

  const fetchJobs = useCallback(
    async ({
      skip = 0,
      append = false,
      customFilters,
    }: {
      skip?: number;
      append?: boolean;
      customFilters?: typeof appliedFilters;
    }) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        setError("");

        const activeFilters = customFilters || appliedFilters;

        const payload = {
          search: activeFilters.search || "",
          skip,
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        });

        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch jobs");
        }

        const fetchedJobs = Array.isArray(result.data) ? result.data : [];

        if (append) {
          setJobs((prev) => {
            const merged = [...prev, ...fetchedJobs];
            const unique = merged.filter(
              (job, index, self) =>
                index ===
                self.findIndex(
                  (item) =>
                    (item._id && job._id && item._id === job._id) ||
                    (!item._id &&
                      !job._id &&
                      item.title === job.title &&
                      item.job_link === job.job_link)
                )
            );
            return unique;
          });
        } else {
          setJobs(fetchedJobs);
        }

        setHasMore(fetchedJobs.length === LIMIT);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);

        if (!append) {
          setJobs([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [appliedFilters]
  );

  useEffect(() => {
    fetchJobs({ skip: 0, append: false });
  }, [fetchJobs]);

  const handleApplyFilters = async () => {
    const nextFilters = {
      search: filters.search.trim(),
    };

    setAppliedFilters(nextFilters);
    setHasMore(true);
    await fetchJobs({ skip: 0, append: false, customFilters: nextFilters });
  };

  const handleReset = async () => {
    const resetFilters = {
      search: "",
    };

    setFilters(resetFilters);
    setAppliedFilters(resetFilters);
    setHasMore(true);
    await fetchJobs({ skip: 0, append: false, customFilters: resetFilters });
  };

  const lastJobRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchJobs({
            skip: jobs.length,
            append: true,
          });
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchJobs, hasMore, jobs.length, loading, loadingMore]
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f3ee] text-[#0b1633]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,132,43,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(35,186,150,0.08),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.7),rgba(240,248,245,0.5))]" />

          <div className="relative mx-auto max-w-[1320px] px-4 py-14 md:px-6 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#ff8c42]/20 bg-[#fff4ec] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a1a]">
                  Career Opportunities
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#d7e8e1] bg-white px-3 py-1 text-xs font-medium text-[#4d6b63]">
                    Jobs
                  </span>
                  <span className="rounded-full border border-[#dbe4ff] bg-white px-3 py-1 text-xs font-medium text-[#4a67d6]">
                    Tech Roles
                  </span>
                  <span className="rounded-full border border-[#d8eee6] bg-white px-3 py-1 text-xs font-medium text-[#1b9b79]">
                    Career Growth
                  </span>
                </div>

                <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-[58px]">
                  Explore the best
                  <span className="text-[#ff7a1a]"> jobs </span>
                  for your next career move
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#667085] sm:text-lg">
                  Find curated opportunities in Python, DSA, Full Stack, AI, and
                  other growing tech domains. Search and apply easily.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleApplyFilters}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#eb6d11]"
                  >
                    Explore Jobs
                  </button>
                  <a
                    href="#job-list"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#dce4ef] bg-white px-6 text-sm font-semibold text-[#3b4a6b] transition hover:bg-[#f8fafc]"
                  >
                    Browse Openings
                  </a>
                </div>

                <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                  <StatsCard value={`${jobs.length}+`} label="Jobs Visible" />
                  <StatsCard value="50+" label="Roles & Skills" />
                  <StatsCard value="100%" label="Online Access" />
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white p-4 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                  <div className="overflow-hidden rounded-[22px] bg-[#eef5f1]">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                      alt="Career Opportunities"
                      className="h-[360px] w-full object-cover"
                    />
                  </div>

                  <div className="pointer-events-none absolute left-4 top-6 rounded-2xl border border-[#dbe7ff] bg-white px-4 py-3 shadow-lg">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a67d6]">
                      Active Openings
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#0b1633]">
                      {jobs.length > 0 ? `${jobs.length}+` : "0+"}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute bottom-6 right-4 rounded-2xl border border-[#d8eee6] bg-white px-4 py-3 shadow-lg">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1b9b79]">
                      Career Mode
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#0b1633]">
                      Live + Practical
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 pb-6 md:px-6 lg:px-8">
          <div className="rounded-[30px] border border-[#e8e3db] bg-white p-5 shadow-[0_15px_50px_rgba(15,23,42,0.05)] md:p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7a1a]">
                Search Jobs
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#0b1633]">
                Find the right role for you
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Use keyword search to find relevant jobs quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Search jobs by names"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="h-12 rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] px-4 text-sm text-[#0b1633] outline-none placeholder:text-[#98a2b3] focus:border-[#ff7a1a]"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleApplyFilters}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#eb6d11]"
              >
                Apply Filters
              </button>

              <button
                onClick={handleReset}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#dce4ef] bg-white px-6 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {appliedFilters.search && (
                <Badge text={`Search: ${appliedFilters.search}`} />
              )}
            </div>
          </div>

          <div className="mt-6 flex max-w-7xl mx-auto flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8e3db] bg-white px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7a1a]">
                Job Listings
              </p>
              <p className="mt-1 text-sm text-[#667085]">
                Job data and opportunities provided by{" "}
                <a
                  href="https://jobjunction4u.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0b1633] underline decoration-[#ff7a1a] underline-offset-4"
                >
                  Jobjunction4u
                </a>
              </p>
            </div>

            <a
              href="https://jobjunction4u.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#dce4ef] bg-[#fffaf5] px-5 text-sm font-semibold text-[#ff7a1a] transition hover:bg-[#fff1e6]"
            >
              Visit Jobjunction4u
            </a>
          </div>
        </section>

        <section
          id="job-list"
          className="mx-auto max-w-[1320px] px-4 py-10 md:px-6 lg:px-8"
        >
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7a1a]">
              Featured Jobs
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0b1633]">
              Practical opportunities for learners and professionals
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#667085]">
              Browse jobs that align with your current skills, future goals, and
              learning journey.
            </p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="grid animate-pulse gap-0 overflow-hidden rounded-[28px] border border-[#e8e3db] bg-white shadow-sm lg:grid-cols-[320px_1fr]"
                >
                  <div className="h-[260px] bg-[#eef2f6]" />
                  <div className="p-5">
                    <div className="h-6 w-40 rounded bg-[#eef2f6]" />
                    <div className="mt-3 h-8 w-3/4 rounded bg-[#eef2f6]" />
                    <div className="mt-4 h-4 w-full rounded bg-[#eef2f6]" />
                    <div className="mt-2 h-4 w-11/12 rounded bg-[#eef2f6]" />
                    <div className="mt-2 h-4 w-10/12 rounded bg-[#eef2f6]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-red-600">
              {error}
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-[24px] border border-[#e8e3db] bg-white p-10 text-center">
              <h3 className="text-2xl font-bold text-[#0b1633]">No jobs found</h3>
              <p className="mt-2 text-[#667085]">
                Try changing your search keyword.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {jobs.map((job, index) => {
                  const isLast = index === jobs.length - 1;

                  return (
                    <div
                      key={`${job._id || job.title}-${index}`}
                      ref={isLast ? lastJobRef : null}
                      className="group grid overflow-hidden rounded-[28px] border border-[#e8e3db] bg-white shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[320px_1fr]"
                    >
                      <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden border-r border-[#edf1f5] bg-[#ffffff] p-6 lg:min-h-full lg:rounded-l-[28px]">
                        <img
                          src={job.image_url}
                          alt={job.title}
                          className="max-h-[180px] w-full object-contain transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#4a67d6] shadow">
                          {job.job_type}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-5 md:p-6">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#f7f8fc] px-3 py-1 text-xs font-medium text-[#4a67d6]">
                              {job.category}
                            </span>
                            <span className="rounded-full bg-[#eef9f5] px-3 py-1 text-xs font-medium text-[#1b9b79]">
                              {job.role}
                            </span>
                          </div>

                          <h3 className="mt-4 text-2xl font-extrabold leading-snug text-[#0b1633]">
                            {job.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 max-w-4xl text-sm leading-7 text-[#667085]">
                            {job.description}
                          </p>

                          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                            <SmallInfo title="Location" value={job.location} />
                            <SmallInfo title="Salary" value={job.salary} />
                            <SmallInfo title="Experience" value={job.experience} />
                            <SmallInfo
                              title="Expiry"
                              value={formatDate(job.job_expiry_date)}
                            />
                          </div>

                          {Array.isArray(job.skills) && job.skills.length > 0 && (
                            <div className="mt-5">
                              <p className="mb-2 text-sm font-semibold text-[#0b1633]">
                                Skills
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {job.skills.slice(0, 8).map((skill, skillIndex) => (
                                  <span
                                    key={`${skill}-${skillIndex}`}
                                    className="rounded-full border border-[#e6edf5] bg-[#fcfcfd] px-3 py-1 text-xs font-medium text-[#52607a]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={job.job_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#eb6d11]"
                          >
                            Apply Now
                          </a>

                          <a
                            href={job.job_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-[#dce4ef] bg-white px-6 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {loadingMore && (
                <div className="mt-8 space-y-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="grid animate-pulse gap-0 overflow-hidden rounded-[28px] border border-[#e8e3db] bg-white shadow-sm lg:grid-cols-[320px_1fr]"
                    >
                      <div className="h-[260px] bg-[#eef2f6]" />
                      <div className="p-5">
                        <div className="h-6 w-40 rounded bg-[#eef2f6]" />
                        <div className="mt-3 h-8 w-3/4 rounded bg-[#eef2f6]" />
                        <div className="mt-4 h-4 w-full rounded bg-[#eef2f6]" />
                        <div className="mt-2 h-4 w-11/12 rounded bg-[#eef2f6]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!hasMore && jobs.length > 0 && (
                <div className="mt-10 text-center">
                  <p className="text-sm font-medium text-[#667085]">
                    You have reached the end of available jobs.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mx-auto max-w-[1320px] px-4 pb-16 md:px-6 lg:px-8">
          <div className="rounded-[32px] border border-[#e8e3db] bg-[linear-gradient(90deg,#fff7f0_0%,#eef8f3_100%)] p-8 shadow-[0_15px_40px_rgba(15,23,42,0.04)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7a1a]">
                  Start Growing Today
                </p>
                <h3 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-[#0b1633]">
                  Learn the right skills and apply for better opportunities
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#667085]">
                  Build practical skills in Python, DSA, Full Stack, and AI with
                  Coding Sankalp, then use that learning to target the best job
                  opportunities.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#ff7a1a]">
                    Python
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4a67d6]">
                    DSA
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1b9b79]">
                    AI Full Stack
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/courses"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#eb6d11]"
                  >
                    Browse Courses
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#dce4ef] bg-white px-6 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/60 bg-white p-6 shadow-sm">
                <h4 className="text-xl font-bold text-[#0b1633]">
                  Why students choose us
                </h4>

                <div className="mt-5 space-y-4">
                  <FeaturePoint text="Live interactive classes" />
                  <FeaturePoint text="Practical projects and assignments" />
                  <FeaturePoint text="Career-focused roadmap" />
                  <FeaturePoint text="Beginner-friendly guidance" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatsCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-[#e8e3db] bg-white p-4 shadow-sm">
      <h3 className="text-2xl font-extrabold text-[#ff7a1a]">{value}</h3>
      <p className="mt-1 text-sm font-medium text-[#667085]">{label}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[#e8e3db] bg-[#fcfcfd] px-3 py-1 text-xs font-medium text-[#52607a]">
      {text}
    </span>
  );
}

function SmallInfo({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#edf1f5] bg-[#fcfcfd] p-3">
      <p className="text-[11px] font-medium text-[#98a2b3]">{title}</p>
      <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#0b1633]">
        {value}
      </p>
    </div>
  );
}

function FeaturePoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1b9b79]" />
      <p className="text-sm font-medium text-[#52607a]">{text}</p>
    </div>
  );
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}