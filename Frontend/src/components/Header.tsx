"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowRight02Icon,
  Cancel01Icon,
  Menu01Icon,
  StudentIcon,
} from "@hugeicons-pro/core-stroke-rounded";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ href, label, pathname, onClick }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? "bg-white text-orange-600 shadow-[0_8px_20px_rgba(249,115,22,0.18)]"
          : "text-slate-700 hover:bg-white/80 hover:text-blue-700"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {!isActive && (
        <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-blue-300 transition-transform duration-300 group-hover:scale-x-100" />
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-[28px] border transition-all duration-300 ${
            scrolled
              ? "border-blue-100 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
              : "border-orange-100 bg-[linear-gradient(135deg,#fffaf5_0%,#eff6ff_48%,#ecfdf5_100%)] shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
          }`}
        >
          <div className="relative flex items-center justify-between px-4 py-3 sm:px-5 lg:px-6">

            {/* ✅ LOGO (Correct Implementation) */}
            <Link href="/" className="flex items-center">
              <div className="h-14 sm:h-16 md:h-[70px] flex items-center">
                <Image
                  src="/logo.png"   // 👉 keep your logo in /public
                  alt="CodingSankalp Logo"
                  width={220}      // controls width ratio
                  height={80}      // not actual render height (Next needs it)
                  priority
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 xl:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                />
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden items-center gap-3 xl:flex">
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                <HugeiconsIcon icon={StudentIcon} size={16} strokeWidth={2} />
                Live Online Classes
              </div>

              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(249,115,22,0.28)] hover:bg-orange-600"
              >
                Explore Courses
                <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white/80 text-blue-700 xl:hidden"
            >
              <HugeiconsIcon
                icon={mobileOpen ? Cancel01Icon : Menu01Icon}
                size={22}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}