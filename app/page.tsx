"use client";

import React, { useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";
import { AnalysisReport } from "@/components/ui/AnalysisReport";
import { Loader2, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function ResumeAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [jobRole, setJobRole] = useState("");

  const handleAnalysis = async (formData: FormData) => {
    setLoading(true);
    formData.append("jobRole", jobRole || "Frontend Developer");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setReport(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] md:w-[40%] md:h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] md:w-[30%] md:h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto text-center space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} /> AI Powered Career Intelligence
          </div>

          <div className="w-full overflow-visible flex justify-center">
            <h1 className="py-4 px-2 text-[clamp(1.5rem,5vw,4.5rem)] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white leading-tight whitespace-nowrap inline-block">
              Smart Resume Intelligence
            </h1>
          </div>

          <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Optimize your professional profile for 2026 tech standards. Get
            instant actionable feedback and outshine the competition.
          </p>
        </header>

        {!report ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Side: Input & Upload */}
            <div className="lg:col-span-7 w-full order-1">
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-1 rounded-[2rem] shadow-2xl shadow-blue-500/10">
                <div className="p-5 md:p-8 space-y-6 md:space-y-8">
                  {/* Target Job Role Section */}
                  <div className="space-y-4">
                    {" "}
                    {/* Container level spacing */}
                    <label className="block text-md font-bold text-slate-700 dark:text-slate-300 ml-1 mb-4">
                      Target Job Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 text-base"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <UploadZone onUpload={handleAnalysis} disabled={loading} />
                    {loading && (
                      <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-5 z-20 border-2 border-blue-500/20">
                        <Loader2
                          className="animate-spin text-blue-600"
                          size={48}
                        />
                        <div className="text-center px-4">
                          <p className="font-bold text-lg md:text-xl">
                            Processing Your Resume...
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            Gemini AI is calculating your industry score
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Info Cards */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6 order-2">
              <div className="group p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm transition-all hover:border-blue-500/30">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="text-blue-500" size={22} /> ATS
                  Optimization
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  We check your resume against 1,000+ industry-specific keywords
                  and formatting rules used by top tech companies.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm transition-all hover:border-amber-500/30">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Zap className="text-amber-500" size={22} /> Actionable
                  Strategy
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Receive a structured breakdown of your profile including top
                  strengths and exact areas for rapid improvement.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <AnalysisReport data={report} onReset={() => setReport(null)} />
          </div>
        )}

        <footer className="mt-20 md:mt-32 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs md:text-sm">
          <p>© 2026 Smart Resume Intelligence. All rights reserved.</p>
          <div className="flex gap-8 font-medium">
            <span className="hover:text-blue-500 transition-colors cursor-pointer">
              Terms
            </span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">
              Documentation
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
