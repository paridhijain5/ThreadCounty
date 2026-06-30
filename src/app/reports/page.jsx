import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Eye,
  Trash2,
  BarChart3,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";

const GRADE_COLOR = {
  "A+": "#35D17F",
  A: "#35D17F",
  "A-": "#27C4FF",
  "B+": "#27C4FF",
  B: "#1D8BFF",
  "B-": "#7568FF",
  C: "#FFB547",
};

export default function ReportsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const r = await fetch("/api/reports");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const r = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Delete failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reports"] }),
  });

  const reports = data?.reports || [];
  const stats = data?.stats || {};
  const total = data?.total || 0;

  return (
    <AppLayout activeTab="reports">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
              Reports
            </h1>
            <p className="text-[#7D8FA6] text-sm mt-1">
              {total} analysis reports generated
            </p>
          </div>
          <a
            href="/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
          >
            + Generate Report
          </a>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Reports", value: total, color: "#1D8BFF" },
            {
              label: "Avg Confidence",
              value: stats.avg_confidence
                ? `${(stats.avg_confidence * 100).toFixed(1)}%`
                : "—",
              color: "#27C4FF",
            },
            {
              label: "Avg Density",
              value: stats.avg_density
                ? `${Math.round(stats.avg_density)} TPI`
                : "—",
              color: "#19E3C7",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 text-center"
            >
              <div
                className="text-2xl font-bold font-space-grotesk mb-1"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-xs text-[#7D8FA6]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reports Grid */}
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto mb-3" />
            <p className="text-[#7D8FA6] text-sm">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-16 text-center">
            <BarChart3 className="w-12 h-12 text-[#7D8FA6] mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No reports yet</h3>
            <p className="text-[#7D8FA6] text-sm mb-6">
              Analyze a fabric image to generate your first report
            </p>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
            >
              Analyze Fabric
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 hover:border-white/10 hover:bg-[#18324E]/60 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-xl bg-[#1D8BFF]/10">
                    <FileText className="w-5 h-5 text-[#27C4FF]" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`/reports/${r.id}`}
                      className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#27C4FF] hover:bg-[#1D8BFF]/10 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => deleteMutation.mutate(r.id)}
                      className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-white font-bold text-sm truncate">
                    {r.filename || `Report ${r.id.slice(0, 8)}`}
                  </h3>
                  <p className="text-xs text-[#7D8FA6] mt-0.5">
                    {new Date(r.created_at).toLocaleDateString("en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7D8FA6]">Fabric</span>
                    <span className="text-[#B8C4D6] font-medium">
                      {r.fabric_type || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7D8FA6]">TPI</span>
                    <span className="text-[#B8C4D6] font-medium">
                      {r.thread_density || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7D8FA6]">Confidence</span>
                    <span className="text-[#35D17F] font-bold">
                      {r.confidence_score
                        ? `${(r.confidence_score * 100).toFixed(1)}%`
                        : "—"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {r.quality_grade ? (
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{
                        color: GRADE_COLOR[r.quality_grade] || "#7D8FA6",
                        backgroundColor: `${GRADE_COLOR[r.quality_grade] || "#7D8FA6"}15`,
                      }}
                    >
                      Grade {r.quality_grade}
                    </span>
                  ) : (
                    <span />
                  )}
                  <a
                    href={`/reports/${r.id}`}
                    className="flex items-center gap-1 text-xs text-[#7D8FA6] hover:text-[#27C4FF] font-semibold transition-colors"
                  >
                    View <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
