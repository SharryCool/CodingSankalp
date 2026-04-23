"use client";

const cohortWeeks = [
  {
    title: "Week 1 · Foundations",
    topics: [
      "Programming basics & logic building",
      "Working with variables & data types",
      "Decision making with conditions",
      "Loops for automation",
      "Lists and data handling",
    ],
  },
  {
    title: "Week 2 · Core Development",
    topics: [
      "Functions and reusable code",
      "String handling & transformations",
      "Debugging and fixing errors",
      "Working with files",
      "Writing cleaner code",
    ],
  },
  {
    title: "Week 3 · Advanced Concepts",
    topics: [
      "Dictionaries, sets & tuples",
      "Organizing code using modules",
      "Working with structured data",
      "Improving problem-solving skills",
    ],
  },
  {
    title: "Week 4 · Application & Projects",
    topics: [
      "Building real-world applications",
      "Using AI tools in development",
      "Data visualization basics",
      "Project development workflow",
    ],
  },
  {
    title: "Final Phase · Showcase",
    topics: [
      "Capstone project implementation",
      "Project presentation",
      "Code review & improvements",
      "Next steps guidance",
    ],
  },
];

export default function CohortCoveredSection() {
  return (
    <section className="relative bg-[#f7fdf7] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a]">
            Your Learning Roadmap
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            A structured journey from fundamentals to building real-world projects.
          </p>
          <p className="mt-2 text-sm text-[#065f46] font-semibold">
            Next batch starts soon
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cohortWeeks.map((week) => (
            <div
              key={week.title}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#065f46]">
                {week.title}
              </h3>

              <ul className="mt-5 space-y-2 text-gray-700 text-sm md:text-base">
                {week.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="text-[#f8b519] mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-12 rounded-2xl bg-[#065f46] text-white p-8 text-center shadow-md">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            This program is designed to help you build practical skills, apply AI tools,
            and confidently work on real-world problems.
          </p>
        </div>
      </div>
    </section>
  );
}