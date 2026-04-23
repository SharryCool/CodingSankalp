"use client";

import Image from "next/image";
import Link from "next/link";

export default function CertificateImpactSection() {
  return (
    <section className="relative bg-[#f7fdf7] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] leading-tight">
            Earn a Certificate That Reflects Your Skills
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Showcase your learning, projects, and practical knowledge with a professionally designed certificate.
          </p>
        </div>

        {/* Certificate Card */}
        <div className="mt-12 mx-auto max-w-5xl rounded-2xl border border-[#e5e7eb] bg-white shadow-md overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* Left Content */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold">
                    CS
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#065f46]">
                    Coding Sankalp
                  </h4>
                </div>

                <h3 className="mt-8 text-3xl md:text-5xl font-extrabold text-black">
                  Certificate of Completion
                </h3>

                <p className="mt-4 text-gray-600 text-lg">
                  Awarded for successfully completing the
                </p>

                <p className="mt-2 text-xl md:text-2xl font-semibold text-[#065f46]">
                  Python with AI Practical Program
                </p>

                <ul className="mt-8 space-y-2 text-gray-700 text-base md:text-lg">
                  <li>• Hands-on project experience</li>
                  <li>• Practical use of AI tools in development</li>
                  <li>• Portfolio-ready work</li>
                </ul>
              </div>

              {/* Signature */}
              <div className="mt-10">
                <div className="text-lg italic text-gray-500">
                  Authorized Signature
                </div>
                <div className="h-[2px] w-40 bg-gray-400 mt-1" />
              </div>
            </div>

            {/* Right Panel */}
            <div className="bg-[#065f46] text-white flex flex-col items-center justify-center p-8">
              <div className="text-center">
                <h4 className="text-xl md:text-2xl font-bold">
                  Verified Credential
                </h4>

                <div className="mt-6 h-28 w-28 rounded-full bg-white text-[#065f46] flex items-center justify-center text-xl font-bold shadow-md">
                  CS
                </div>

                <p className="mt-4 text-sm text-green-100">
                  Issued digitally
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-4xl font-bold text-[#0f172a]">
            Add credibility to your resume and portfolio
          </p>

          <p className="mt-4 text-lg text-gray-600">
            Highlight your practical skills and stand out in interviews with proof of work.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#065f46] hover:bg-[#047857] px-8 py-4 text-lg md:text-xl font-bold text-white shadow-md transition"
          >
            Join the Program
            <span className="ml-3 text-sm line-through text-green-200">₹1999</span>
            <span className="ml-2 text-xl text-[#f8b519]">₹199</span>
          </Link>
        </div>

        {/* Supporting Line */}
        <p className="mt-6 text-center text-base md:text-lg text-gray-500">
          Limited seats available for the upcoming batch
        </p>
      </div>
    </section>
  );
}