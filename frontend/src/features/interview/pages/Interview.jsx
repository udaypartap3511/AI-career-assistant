import React, { useState } from "react";

const sampleInterviewData = {
  _id: "6ac69a71dc25b99994ef060c",
  matchScore: 88,
  technicalQuestions: [
    {
      question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      intention: "To assess understanding of asynchronous execution in JavaScript runtime.",
      answer:
        "The event loop coordinates timers, I/O callbacks, and microtasks while Node handles concurrency efficiently. A candidate should explain how libuv delegates blocking tasks to the OS and how callbacks are queued back into the event loop for execution."
    },
    {
      question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
      intention: "To evaluate database performance tuning knowledge.",
      answer:
        "Use $match early, project only required fields, add indexes, and avoid expensive operations before filtering. A strong answer also mentions limiting documents before $lookup and using $group only after narrowing the dataset."
    },
    {
      question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
      intention: "To check understanding of caching strategies and trade-offs.",
      answer:
        "Cache reads on a miss and write-through or invalidation on updates. Redis is helpful for sessions, rate limiting, leaderboard data, and storing hot query results that need low latency."
    },
    {
      question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
      intention: "To assess system design awareness and migration planning.",
      answer:
        "Common challenges include data ownership boundaries, deployment complexity, inter-service communication, and maintaining consistent APIs. The candidate should also talk about phased migration, observability, and data consistency trade-offs."
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time you solved a difficult bug in a team project.",
      intention: "To assess debugging process and collaboration.",
      answer:
        "Describe the actual issue, the approach used to isolate root cause, and the end result. Good candidates use STAR and explain how they tested and communicated fixes with the team."
    }
  ],
  skillGaps: [
    { skill: "Message Queue (RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker & CI/CD", severity: "medium" },
    { skill: "Distributed Systems Design", severity: "medium" },
    { skill: "Production-level Redis management", severity: "low" }
  ],
  preparationPlans: [
    {
      day: 1,
      focus: "Advanced JavaScript & React Fundamentals",
      tasks: ["Review closures and async patterns."]
    }
  ]
};

const navMeta = [
  { key: "technical", label: "Technical Questions", count: "4 questions" },
  { key: "behavioral", label: "Behavioral Questions", count: "1 question" },
  { key: "roadmap", label: "Road Map", count: null }
];

const severityClasses = {
  high: "border-[#ff5a7a]/35 bg-[#ff2d56]/10 text-[#ff90a8]",
  medium: "border-[#f7b955]/35 bg-[#f7b955]/10 text-[#ffd48a]",
  low: "border-[#4ade80]/35 bg-[#22c55e]/10 text-[#94f0b1]"
};

function SectionIcon({ active = false }) {
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border ${
        active ? "border-[#ff4d8d]/60 bg-[#ff4d8d]/15 text-[#ff8ad0]" : "border-[#5d728c] bg-transparent text-slate-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-[2px] ${active ? "bg-[#ff7ec8]" : "bg-[#5d728c]"}`} />
    </span>
  );
}

export default function Interview({ data = sampleInterviewData }) {
  const report = data ?? sampleInterviewData;
  const [activeTab, setActiveTab] = useState("technical");
  const [expandedIndexes, setExpandedIndexes] = useState([0]);

  const technicalQuestions = report.technicalQuestions ?? [];
  const behavioralQuestions = report.behavioralQuestions ?? [];
  const skillGaps = report.skillGaps ?? [];
  const matchScore = Number(report.matchScore ?? 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (matchScore / 100) * circumference;

  const activeQuestions = activeTab === "technical" ? technicalQuestions : behavioralQuestions;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050d18] px-4 py-4 text-slate-100 md:px-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(circle at center, black 35%, transparent 100%)"
        }}
      />

      <div className="relative mx-auto flex h-[calc(100vh-32px)] w-full max-w-[1280px] overflow-hidden rounded-[18px] border border-[#233548] bg-[#071421]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.7)]">
        <aside className="w-[220px] shrink-0 border-r border-[#1b2e43] bg-[#091a2a] px-4 py-5">
          <div className="mb-4 px-1 text-[11px] font-semibold tracking-[0.28em] text-slate-500">SECTIONS</div>

          <nav className="space-y-2">
            {navMeta.map((item) => {
              const isActive = item.key === activeTab;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    setExpandedIndexes([0]);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition ${
                    isActive ? "bg-[#0d1d2d] text-white" : "text-slate-400 hover:bg-[#0d1a2a] hover:text-slate-200"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#2a3f55] bg-[#0d1d2d]">
                    <SectionIcon active={isActive} />
                  </span>

                  <span className="flex flex-1 items-center justify-between gap-2">
                    <span className="text-[14px] font-medium text-slate-200">{item.label}</span>
                    {item.count ? <span className="text-[11px] text-slate-500">{item.count}</span> : null}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1 overflow-y-auto bg-[#091a2a] px-5 py-4">
          <div className="mb-4 flex items-center gap-3 border-b border-[#20324a] pb-3">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {activeTab === "technical" ? "Technical Questions" : activeTab === "behavioral" ? "Behavioral Questions" : "Road Map"}
            </span>
            <span className="text-[11px] text-slate-500">
              {activeTab === "technical" ? `${technicalQuestions.length} questions` : activeTab === "behavioral" ? `${behavioralQuestions.length} questions` : "Plan"}
            </span>
          </div>

          {activeTab === "technical" && (
            <div className="space-y-3 pr-1">
              {technicalQuestions.map((item, index) => {
                const isOpen = expandedIndexes.includes(index);

                return (
                  <div
                    key={`${item.question}-${index}`}
                    className={`overflow-hidden rounded-[12px] border ${
                      isOpen ? "border-[#2a4059] bg-[#0f1f2f]" : "border-[#1f2f43] bg-[#0d1a2a]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIndexes((prev) =>
                          prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                        )
                      }
                      className="flex w-full items-center gap-3 px-3 py-3 text-left"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ff7cbd]/50 bg-[#ff4d8d]/10 text-[11px] font-bold text-[#ff8ac3]">
                        Q{index + 1}
                      </span>

                      <p className="flex-1 text-[14px] font-medium leading-6 text-slate-200">{item.question}</p>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#1a2f41] bg-[#0d1a2a] px-4 pb-4 pt-3">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff8ec5]">Intention</p>
                        <p className="mb-4 text-sm leading-6 text-slate-300">{item.intention}</p>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff8ec5]">Model answer</p>
                        <p className="text-sm leading-6 text-slate-300">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="space-y-3 pr-1">
              {behavioralQuestions.map((item, index) => {
                const isOpen = expandedIndexes.includes(index);

                return (
                  <div
                    key={`${item.question}-${index}`}
                    className={`overflow-hidden rounded-[12px] border ${
                      isOpen ? "border-[#2a4059] bg-[#0f1f2f]" : "border-[#1f2f43] bg-[#0d1a2a]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIndexes((prev) =>
                          prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                        )
                      }
                      className="flex w-full items-center gap-3 px-3 py-3 text-left"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ff7cbd]/50 bg-[#ff4d8d]/10 text-[11px] font-bold text-[#ff8ac3]">
                        Q{index + 1}
                      </span>

                      <p className="flex-1 text-[14px] font-medium leading-6 text-slate-200">{item.question}</p>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#1a2f41] bg-[#0d1a2a] px-4 pb-4 pt-3">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff8ec5]">Intention</p>
                        <p className="mb-4 text-sm leading-6 text-slate-300">{item.intention}</p>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff8ec5]">Model answer</p>
                        <p className="text-sm leading-6 text-slate-300">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="rounded-[12px] border border-[#1d2f41] bg-[#091a2a] p-5 text-slate-300">
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-[16px] font-semibold text-slate-100">Preparation Road Map</h2>
                <span className="text-[11px] text-slate-500">{(report.preparationPlans ?? []).length}-day plan</span>
              </div>

              <div className="space-y-4">
                {(report.preparationPlans ?? []).map((plan, index) => (
                  <div key={`${plan.day}-${index}`} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border ${
                          index === 0 ? "border-[#ff4d8d] bg-[#ff4d8d]/15" : "border-[#60758d] bg-[#0b1825]"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#ff4d8d]" : "bg-[#60758d]"}`} />
                      </span>
                      {index < (report.preparationPlans ?? []).length - 1 && (
                        <span className="mt-1 h-full w-px bg-[#243a4b]" />
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[#2b3d52] bg-[#0d1b2b] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Day {plan.day}
                        </span>
                        <span className="text-[15px] font-medium text-slate-100">{plan.focus}</span>
                      </div>

                      <ul className="list-disc space-y-1 pl-5 text-[13px] leading-5 text-slate-400">
                        {(plan.tasks ?? []).map((task, taskIndex) => (
                          <li key={`${plan.day}-${taskIndex}`}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="w-[220px] shrink-0 border-l border-[#1b2e43] bg-[#091a2a] px-4 py-5">
          <div className="mb-5 text-[11px] font-semibold tracking-[0.2em] text-slate-500">MATCH SCORE</div>

          <div className="flex justify-center">
            <div className="relative h-[110px] w-[110px]">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={42} stroke="#1b2e42" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={42}
                  stroke="#4ade80"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[2.1rem] font-bold leading-none text-white">{matchScore}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-300">Strong match for this role</p>

          <div className="mt-8">
            <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-slate-500">SKILL GAPS</div>
            <div className="flex flex-wrap gap-2">
              {skillGaps.map((item, index) => (
                <span
                  key={`${item.skill}-${index}`}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium leading-4 ${
                    severityClasses[item.severity] ?? "border-[#475d76] bg-[#142536] text-slate-300"
                  }`}
                  style={{
                    backgroundColor:
                      item.severity === "high"
                        ? "rgba(255, 82, 116, 0.12)"
                        : item.severity === "medium"
                          ? "rgba(245, 158, 11, 0.12)"
                          : "rgba(52, 211, 153, 0.12)",
                    borderColor:
                      item.severity === "high"
                        ? "rgba(255, 114, 153, 0.3)"
                        : item.severity === "medium"
                          ? "rgba(251, 191, 36, 0.3)"
                          : "rgba(74, 222, 128, 0.3)"
                  }}
                >
                  {item.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
