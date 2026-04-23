'use client';
// app/dashboard/page.tsx
import Link from "next/link";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Briefcase01Icon,
  NoteIcon,
  ContactBookIcon,
  Comment02Icon,
  QuoteUpIcon,
  Home02Icon,
  ArrowRight01Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const dashboardPages = [
  {
    title: "Dashboard Home",
    description: "Overview page of your admin dashboard.",
    href: "/dashboard",
    icon: DashboardSquare01Icon,
  },

  {
    title: "Careers",
    description: "Manage all career openings and job posts.",
    href: "/dashboard/careers",
    icon: Briefcase01Icon,
  },
  {
    title: "Blogs",
    description: "Create and manage blog records.",
    href: "/dashboard/blogs",
    icon: NoteIcon,
  },
  {
    title: "Contacts",
    description: "View submitted contact form records.",
    href: "/dashboard/contacts",
    icon: ContactBookIcon,
  },
  {
    title: "Client Feedback",
    description: "Watch and manage client feedback records.",
    href: "/dashboard/client-feedback",
    icon: Comment02Icon,
  },
  {
    title: "Testimonials",
    description: "Manage testimonial records with images.",
    href: "/dashboard/testimonials",
    icon: QuoteUpIcon,
  },
];

export default function Page() {

    const router = useRouter();

    useEffect(()=>{

      if(typeof window !== "undefined" && !sessionStorage.getItem("authToken")){
        router.push("/dashboard/login");
        // User is authenticated
      } 
    },[])

  return (
    <>
      <DashboardNavbar />

      <section className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2">
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={18}
                strokeWidth={1.8}
                className="text-cyan-300"
              />
              <span className="text-sm font-medium text-cyan-100">
                Admin Dashboard
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Dashboard Home
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Here are all your dashboard pages. Click any card to open that section.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardPages.map((page, index) => (
              <Link
                key={page.href || index}
                href={page.href}
                className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
                  <HugeiconsIcon
                    icon={page.icon}
                    size={24}
                    strokeWidth={1.8}
                    className="text-cyan-300"
                  />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  {page.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {page.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                  Open Page
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={1.8}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}