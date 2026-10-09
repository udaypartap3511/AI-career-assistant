function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <path d="M12 16V5" strokeLinecap="round" />
      <path d="M8 9l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17.5v1.5a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050c18] px-4 py-8 text-slate-100 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{
       backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
       backgroundSize: "18px 18px",
       maskImage: "radial-gradient(circle at center, black 35%, transparent 100%)"
      }} />

      <div className="relative mx-auto w-full max-w-[1180px] rounded-[24px] border border-[#2b3b52] bg-[#071321]/90 px-5 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_25px_80px_rgba(0,0,0,0.55)] md:px-8 md:py-8">
       <div className="mx-auto max-w-[980px]">
         <h1 className="mb-4 text-center text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
           Create Your Custom <span className="bg-gradient-to-r from-[#ff8afd] via-[#ff4cc6] to-[#ff3c8b] bg-clip-text text-transparent">Interview Plan</span>
         </h1>

         <p className="mx-auto mb-8 max-w-[720px] text-center text-base text-slate-300 md:text-[1.1rem]">
           Let our AI analyze the job requirements and your unique profile to build a winning strategy.
         </p>

         <div className="grid gap-5 md:grid-cols-2">
           <section className="rounded-[18px] border border-[#23354a] bg-[#0d1d2d] p-4 shadow-inner shadow-[#0e1a28]">
             <div className="mb-4 flex items-center justify-between">
               <div className="flex items-center gap-2 text-lg font-semibold text-slate-100">
                 <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#17283b] text-[#ff9ec9]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                     <path d="M7 5.5A2.5 2.5 0 0 1 9.5 3H17a2 2 0 0 1 2 2v10.5A2.5 2.5 0 0 1 16.5 18H9.5A2.5 2.5 0 0 1 7 15.5v-10Z" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M7 8.5h9M7 12h7" strokeLinecap="round"/>
                   </svg>
                 </span>
                 Target Job Description
               </div>
               <span className="rounded-md bg-[#ff2d56]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff6989]">
                 Required
               </span>
             </div>

             <textarea
               aria-label="Target Job Description"
               placeholder={'Paste the full job description here... e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'}
               className="h-[360px] w-full resize-none rounded-[14px] border border-[#1e2e3c] bg-[#0f1f2f] px-4 py-3 text-[15px] leading-7 text-slate-200 placeholder:text-slate-500 focus:outline-none"
             />

             <div className="mt-3 text-right text-xs tracking-[0.12em] text-slate-500">0 / 5000 chars</div>
           </section>

           <section className="space-y-4">
             <div className="rounded-[18px] border border-[#23354a] bg-[#0d1d2d] p-4 shadow-inner shadow-[#0e1a28]">
               <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
                 <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#17283b] text-[#ff8cdd]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                     <path d="M16 20v-1a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v1" strokeLinecap="round"/>
                     <circle cx="11" cy="7" r="4"/>
                   </svg>
                 </span>
                 Your Profile
               </div>

               <div className="mb-4 rounded-[14px] border border-[#203448] bg-[#111f2d] px-4 py-3">
                 <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                   <span>Upload Resume</span>
                   <span className="rounded-md bg-[#ff2d56]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#ff6989]">Best Results</span>
                 </div>

                 <label className="flex h-[142px] cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed border-[#2d435d] bg-[#0d1d2d] text-center text-slate-400 transition hover:border-[#ff5bb5] hover:text-[#ff8fd9]">
                   <input type="file" accept=".pdf" className="hidden" />
                   <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff2d56]/15 text-[#ff4b89]">
                     <UploadIcon />
                   </span>
                   <span className="text-base font-medium text-slate-200">Click to upload or drag &amp; drop</span>
                   <span className="mt-2 text-sm text-slate-400">PDF or DOCX (Max 3MB)</span>
                 </label>
               </div>

               <div className="my-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
                 <span className="h-px flex-1 bg-[#2a3d53]" />
                 <span>OR</span>
                 <span className="h-px flex-1 bg-[#2a3d53]" />
               </div>

               <div className="rounded-[14px] border border-[#23354a] bg-[#0d1d2d] p-4">
                 <p className="mb-3 text-lg font-semibold text-slate-100">Quick Self-Description</p>
                 <textarea
                   aria-label="Quick Self Description"
                   placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                   className="h-[130px] w-full resize-none rounded-[12px] border border-[#1d2d3b] bg-[#101d2c] px-3 py-3 text-[15px] text-slate-200 placeholder:text-slate-500 focus:outline-none"
                 />
               </div>

               <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#1a2d3d] bg-[#0b1827] px-3 py-3 text-sm text-slate-200">
                 <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff2d56] text-[10px] font-bold text-white">•</span>
                 <span>Either a Resume or a Self Description is required to generate a personalized plan.</span>
               </div>
             </div>
           </section>
         </div>

         <div className="mt-6 flex flex-col items-center justify-between gap-4 text-slate-300 md:flex-row">
           <p className="text-sm text-slate-400">AI-Powered Strategy Generation <span className="text-slate-500">•</span> Approx 30s</p>
           <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#ef2a5a] px-7 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(255,52,122,0.45)] transition hover:brightness-110">
             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
               <PlusIcon />
             </span>
             Generate My Interview Strategy
           </button>
         </div>
       </div>

       <footer className="mt-8 flex justify-center gap-5 text-xs text-slate-400 md:gap-8">
         <a href="#" className="transition hover:text-slate-200">Privacy Policy</a>
         <a href="#" className="transition hover:text-slate-200">Terms of Service</a>
         <a href="#" className="transition hover:text-slate-200">Help Center</a>
       </footer>
      </div>
    </main>
  );
}
