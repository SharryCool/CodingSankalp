// components/dashboard/DashboardNavbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home02Icon,
  DashboardSquare01Icon,

  Logout03Icon,
  Login03Icon,
  Menu01Icon,
  Cancel01Icon,
  Search01Icon,
  Notification01Icon,

  QuoteUpIcon,
  ContactBookIcon,
  NoteIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import { useRouter } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon: any;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardSquare01Icon },

  { name: "Blogs", href: "/dashboard/blogs", icon: NoteIcon },
  { name: "Contacts", href: "/dashboard/contacts", icon: ContactBookIcon },

  {
    name: "Testimonials",
    href: "/dashboard/testimonials",
    icon: QuoteUpIcon,
  },

    {
    name: "Course Control",
    href: "/dashboard/course-control",
    icon: QuoteUpIcon,
  },
];
export default function DashboardNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/dashboard/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex  items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={22}
                className="text-cyan-300"
                strokeWidth={1.8}
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                Admin Panel
              </p>
              <h1 className="text-lg font-semibold text-white">
                Professional Dashboard
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex lg:flex-wrap lg:justify-end">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-2 rounded-2xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              <HugeiconsIcon
                icon={item.icon}
                size={18}
                className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-300"
                strokeWidth={1.8}
              />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <HugeiconsIcon
              icon={Notification01Icon}
              size={18}
              strokeWidth={1.8}
            />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-200 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/20"
            >
              <HugeiconsIcon
                icon={Logout03Icon}
                size={18}
                strokeWidth={1.8}
              />
              Logout
            </button>
          ) : (
            <Link
              href="/dashboard/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/20"
            >
              <HugeiconsIcon icon={Login03Icon} size={18} strokeWidth={1.8} />
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
        >
          <HugeiconsIcon
            icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06]"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={18}
                  className="text-cyan-300"
                  strokeWidth={1.8}
                />
                {item.name}
              </Link>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200"
              >
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                Search
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200"
              >
                <HugeiconsIcon
                  icon={Notification01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                Alerts
              </button>
            </div>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200"
              >
                <HugeiconsIcon
                  icon={Logout03Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                Logout
              </button>
            ) : (
              <Link
                href="/dashboard/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100"
              >
                <HugeiconsIcon icon={Login03Icon} size={18} strokeWidth={1.8} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}