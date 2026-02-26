"use client";

import React, { useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Download, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface AnalysisProps {
  data: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
  onReset: () => void;
}

export const AnalysisReport = ({ data, onReset }: AnalysisProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Background ko transparent rakha hai taake app ka dark theme PDF mein aaye
      const dataUrl = await toPng(reportRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume-Analysis-Report.pdf");
    } catch (err) {
      console.error("PDF Error:", err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Report Container: Removed forced white bg, kept it consistent with your UI */}
      <div
        ref={reportRef}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-48 h-48 md:w-56 md:h-56">
            <CircularProgressbar
              value={data.score}
              text={`${data.score}%`}
              strokeWidth={10}
              styles={buildStyles({
                textSize: "22px",
                pathColor:
                  data.score > 70
                    ? "#22c55e"
                    : data.score > 40
                      ? "#f59e0b"
                      : "#ef4444",
                textColor: "currentColor", // Yeh text color theme ke hisab se lega
                trailColor: "#1e293b",
                pathTransitionDuration: 2,
              })}
            />
            <p className="text-center mt-4 font-extrabold text-slate-500 uppercase tracking-widest text-[10px]">
              ATS Score
            </p>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-black tracking-tight dark:text-white text-slate-900">
              Analysis Result
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Your profile has been evaluated against current 2026 recruitment
              standards.
            </p>
          </div>
        </div>

        <hr className="my-10 border-slate-100 dark:border-slate-800" />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
              <CheckCircle2 size={20} /> Key Strengths
            </h3>
            <ul className="space-y-3">
              {data.strengths.map((s, i) => (
                <li
                  key={i}
                  className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10 text-slate-700 dark:text-slate-300 text-sm font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
              <AlertCircle size={20} /> Areas to Improve
            </h3>
            <ul className="space-y-3">
              {data.improvements.map((imp, i) => (
                <li
                  key={i}
                  className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 text-slate-700 dark:text-slate-300 text-sm font-medium"
                >
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
        >
          <Download size={20} /> Download Report
        </button>

        {/* FIX: New Scan button hover fix */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
        >
          <RotateCcw size={20} /> New Scan
        </button>
      </div>
    </div>
  );
};
