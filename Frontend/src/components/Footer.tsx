"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  Mail01Icon,
  MapPinpoint01Icon,
  NewTwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  BookOpen01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const courseLinks = [
  { label: "Python Course", href: "/courses/python" },
  { label: "DSA Course", href: "/courses/dsa" },
  { label: "AI Full Stack Course", href: "/courses/ai-powered-full-stack-python" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
                <HugeiconsIcon icon={BookOpen01Icon} size={22} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-2xl font-black">CodingSankalp</h3>
                <p className="text-sm text-white/70">Online Learning Platform</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Learn Python, DSA, and AI Powered Full Stack development with
              practical online courses, live sessions, and project-based learning.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500/20"
              >
                <HugeiconsIcon icon={InstagramIcon} size={20} strokeWidth={2.2} />
              </Link>
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-blue-500/20"
              >
                <HugeiconsIcon icon={YoutubeIcon} size={20} strokeWidth={2.2} />
              </Link>
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-emerald-500/20"
              >
                <HugeiconsIcon icon={NewTwitterIcon} size={20} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-orange-300">Quick Links</h4>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/75 transition hover:text-orange-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-blue-300">Courses</h4>
            <div className="mt-5 flex flex-col gap-3">
              {courseLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/75 transition hover:text-blue-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-emerald-300">Contact</h4>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/75">
                <HugeiconsIcon icon={Mail01Icon} size={18} strokeWidth={2.2} />
                <span>support@codingsankalp.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/75">
                <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2.2} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/75">
                <HugeiconsIcon icon={MapPinpoint01Icon} size={18} strokeWidth={2.2} />
                <span>India • Online Classes Available Everywhere</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/65">
          © {new Date().getFullYear()} CodingSankalp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}