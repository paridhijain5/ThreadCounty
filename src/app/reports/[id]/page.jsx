import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  CheckCircle2,
  Zap,
  ArrowLeft,
  TrendingUp,
  Cpu,
  BarChart3,
  Download,
  Share2,
  Printer,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import AppLayout from "@/components/AppLayout";

const GRADE_COLOR = {
  "A+": "#35D17F",
  A: "#35D17F",
  "A-": "#27C4FF",
  "B+": "#27C4FF",
  B: "#1D8BFF",
  "B-": "#7568FF",
};

export default function ReportDetailPage({ params }) {
  const id = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const r = await fetch(`/api/reports/${id}`);
      if (!r.ok) throw new Error("Report not found");
      return r.json();
    },
    enabled: !!id,
  });

  const report = data?.report;

  if (isLoading) {
    return (
      <AppLayout activeTab="reports">
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto mb-4" />
            <p className="text-[#7D8FA6]">Loading report...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !report) {
    return (
      <AppLayout activeTab="reports">
        <div className="p-12 text-center">
          <BarChart3 className="w-16 h-16 text-[#7D8FA6] mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">
            Report Not Found
          </h2>
          <a href="/reports" className="text-[#27C4FF] hover:text-white">
            ← Back to Reports
          </a>
        </div>
      </AppLayout>
    );
  }

  const analysisData =
    typeof report.analysis_data === "string"
      ? JSON.parse(report.analysis_data)
      : report.analysis_data || {};
  const aiSuggestions =
    typeof report.ai_suggestions === "string"
      ? JSON.parse(report.ai_suggestions)
      : report.ai_suggestions || [];
  const detections = analysisData.detections || [];
  const historicalTrend = analysisData.historicalTrend || [];

  const radarData = [
    { metric: "Warp", value: Math.min(100, (report.warp_count / 80) * 100) },
    { metric: "Weft", value: Math.min(100, (report.weft_count / 70) * 100) },
    {
      metric: "Density",
      value: Math.min(100, (report.thread_density / 150) * 100),
    },
    {
      metric: "Integrity",
      value: Math.round((report.material_integrity || 0) * 100),
    },
    {
      metric: "Confidence",
      value: Math.round((report.confidence_score || 0) * 100),
    },
  ];

  return (
    <AppLayout activeTab="reports">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <a
              href="/reports"
              className="flex items-center gap-2 text-[#7D8FA6] hover:text-white text-sm mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Reports
            </a>
            <h1 className="text-2xl font-bold font-space-grotesk text-white">
              {report.filename || "Analysis Report"}
            </h1>
            <p className="text-[#7D8FA6] text-sm mt-1">
              Generated on{" "}
              {new Date(report.created_at).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Image & Summary */}
          <div className="space-y-4">
            {report.image_url && (
              <div className="rounded-[20px] overflow-hidden border border-white/10">
                <img
                  src={report.image_url}
                  alt={report.filename}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 space-y-3">
              <h3 className="font-bold text-white font-space-grotesk mb-4">
                Analysis Summary
              </h3>
              {[
                {
                  label: "Fabric Type",
                  value: report.fabric_type,
                  color: "#27C4FF",
                },
                {
                  label: "Weave Pattern",
                  value: report.weave_pattern,
                  color: "#B8C4D6",
                },
                {
                  label: "Processing Time",
                  value: report.processing_time,
                  color: "#B8C4D6",
                },
                {
                  label: "Analysis Date",
                  value: new Date(report.created_at).toLocaleDateString(),
                  color: "#B8C4D6",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-xs text-[#7D8FA6]">{item.label}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.value || "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Quality Grade */}
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 text-center">
              <div className="text-xs text-[#7D8FA6] mb-2 uppercase tracking-wider font-bold">
                Quality Grade
              </div>
              <div
                className="text-6xl font-bold font-space-grotesk mb-2"
                style={{
                  color: GRADE_COLOR[report.quality_grade] || "#7D8FA6",
                }}
              >
                {report.quality_grade || "—"}
              </div>
              <div className="text-xs text-[#7D8FA6]">Overall Assessment</div>
            </div>
          </div>

          {/* Main Data */}
          <div className="lg:col-span-2 space-y-4">
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Warp Count",
                  value: report.warp_count,
                  unit: "threads/in",
                  color: "#1D8BFF",
                },
                {
                  label: "Weft Count",
                  value: report.weft_count,
                  unit: "threads/in",
                  color: "#27C4FF",
                },
                {
                  label: "Thread Density",
                  value: report.thread_density,
                  unit: "TPI",
                  color: "#19E3C7",
                },
                {
                  label: "Confidence",
                  value: report.confidence_score
                    ? `${(report.confidence_score * 100).toFixed(1)}%`
                    : "—",
                  unit: "accuracy",
                  color: "#35D17F",
                },
                {
                  label: "Material Integrity",
                  value: report.material_integrity
                    ? `${(report.material_integrity * 100).toFixed(1)}%`
                    : "—",
                  unit: "score",
                  color: "#7568FF",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#13263D]/60 border border-white/5 rounded-[16px] p-4 text-center"
                >
                  <div
                    className="text-xl font-bold font-space-grotesk mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value ?? "—"}
                  </div>
                  <div className="text-[10px] text-white font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#7D8FA6]">{stat.unit}</div>
                </div>
              ))}
            </div>

            {/* Confidence Gauge */}
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-white">
                  Confidence Score
                </span>
                <span className="text-lg font-bold text-[#35D17F]">
                  {report.confidence_score
                    ? `${(report.confidence_score * 100).toFixed(2)}%`
                    : "—"}
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(report.confidence_score || 0) * 100}%`,
                  }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#35D17F]"
                />
              </div>
            </div>

            {/* Detections */}
            {detections.length > 0 && (
              <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
                <h4 className="font-bold text-white mb-4">
                  Detection Analysis
                </h4>
                <div className="space-y-3">
                  {detections.map((det) => (
                    <div key={det.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-[#B8C4D6]">
                          {det.label}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-bold text-white">
                            {det.count || det.value}
                          </span>
                          <span className="text-[10px] text-[#7D8FA6] ml-2">
                            {(det.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${det.confidence * 100}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FFB547]" />
                  AI Recommendations
                </h4>
                <div className="space-y-3">
                  {aiSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#35D17F] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#B8C4D6]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quality Trend Chart */}
        {historicalTrend.length > 0 && (
          <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
            <h4 className="font-bold font-space-grotesk text-white mb-4">
              Quality Trend Analysis
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalTrend}>
                  <defs>
                    <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D8BFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1D8BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#7D8FA6"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#7D8FA6"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#13263D",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="quality"
                    stroke="#1D8BFF"
                    strokeWidth={2.5}
                    fill="url(#rptGrad)"
                    dot={{ fill: "#1D8BFF", r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
