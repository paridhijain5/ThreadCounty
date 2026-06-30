import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Upload,
  FileText,
  TrendingUp,
  Zap,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Cpu,
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
  BarChart,
  Bar,
} from "recharts";
import AppLayout from "@/components/AppLayout";
import useUser from "@/utils/useUser";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#13263D] border border-white/10 rounded-xl p-3 text-xs">
        <p className="text-[#7D8FA6] mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const { data: user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const r = await fetch("/api/dashboard");
      if (!r.ok) throw new Error("Failed to fetch dashboard");
      return r.json();
    },
    refetchInterval: 30000,
  });

  const stats = data?.stats || {};
  const subscription = data?.subscription || {
    plan: "free",
    uploads_used: 0,
    uploads_limit: 5,
  };
  const recentUploads = data?.recentUploads || [];
  const weeklyData = data?.weeklyUploads || [];
  const monthlyQuality = data?.monthlyQuality || [];

  const statCards = [
    {
      label: "Total Analyses",
      value: isLoading ? "—" : stats.totalUploads || 0,
      icon: Cpu,
      color: "#1D8BFF",
      sub: "lifetime",
    },
    {
      label: "Reports Generated",
      value: isLoading ? "—" : stats.totalReports || 0,
      icon: FileText,
      color: "#27C4FF",
      sub: "saved",
    },
    {
      label: "Avg Confidence",
      value: isLoading
        ? "—"
        : stats.avgConfidence
          ? `${(stats.avgConfidence * 100).toFixed(1)}%`
          : "—",
      icon: TrendingUp,
      color: "#19E3C7",
      sub: "accuracy",
    },
    {
      label: "Notifications",
      value: isLoading ? "—" : stats.unreadNotifications || 0,
      icon: AlertCircle,
      color: "#7568FF",
      sub: "unread",
    },
  ];

  const usagePct =
    subscription.uploads_limit > 0
      ? Math.round(
          (subscription.uploads_used / subscription.uploads_limit) * 100,
        )
      : 0;
  const planColors = {
    free: "#7D8FA6",
    student: "#27C4FF",
    professional: "#1D8BFF",
    enterprise: "#7568FF",
  };

  return (
    <AppLayout activeTab="dashboard">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
                Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
              </h1>
              <p className="text-[#7D8FA6] text-sm mt-1">
                Here's your textile analysis overview.
              </p>
            </div>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform text-sm"
            >
              <Zap className="w-4 h-4" />
              New Analysis
            </a>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#13263D]/60 backdrop-blur-sm border border-white/5 rounded-[20px] p-5 hover:border-white/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span className="text-[10px] text-[#7D8FA6] font-semibold uppercase tracking-wider">
                    {stat.sub}
                  </span>
                </div>
                <div className="text-2xl font-bold font-space-grotesk text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#7D8FA6]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly Uploads Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-[#13263D]/60 backdrop-blur-sm border border-white/5 rounded-[24px] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold font-space-grotesk text-white">
                  Quality Trend
                </h3>
                <p className="text-xs text-[#7D8FA6] mt-0.5">
                  Monthly analysis confidence
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#1D8BFF]/10 text-[#27C4FF] text-xs font-semibold">
                Last 6 Months
              </div>
            </div>
            <div className="h-48">
              {monthlyQuality.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyQuality.map((d) => ({
                      month: new Date(d.month).toLocaleDateString("en", {
                        month: "short",
                      }),
                      quality: Math.round((d.avg_quality || 0) * 100),
                    }))}
                  >
                    <defs>
                      <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#1D8BFF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1D8BFF"
                          stopOpacity={0}
                        />
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
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="quality"
                      stroke="#1D8BFF"
                      strokeWidth={2.5}
                      fill="url(#qualGrad)"
                      dot={{ fill: "#1D8BFF", r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <BarChart3 className="w-10 h-10 text-[#7D8FA6] mb-3" />
                  <p className="text-[#7D8FA6] text-sm">
                    No data yet. Run your first analysis!
                  </p>
                  <a
                    href="/upload"
                    className="mt-3 text-xs text-[#27C4FF] hover:text-white font-semibold"
                  >
                    Upload fabric image →
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#13263D]/60 backdrop-blur-sm border border-white/5 rounded-[24px] p-6"
          >
            <h3 className="font-bold font-space-grotesk text-white mb-6">
              Subscription
            </h3>
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4"
                style={{
                  borderColor: `${planColors[subscription.plan] || "#7D8FA6"}40`,
                  backgroundColor: `${planColors[subscription.plan] || "#7D8FA6"}10`,
                }}
              >
                <span
                  className="text-sm font-bold capitalize"
                  style={{ color: planColors[subscription.plan] || "#7D8FA6" }}
                >
                  {subscription.plan} Plan
                </span>
              </div>
              <div className="text-4xl font-bold font-space-grotesk text-white mb-1">
                {subscription.uploads_used}
                <span className="text-xl text-[#7D8FA6]">
                  /{subscription.uploads_limit}
                </span>
              </div>
              <p className="text-xs text-[#7D8FA6]">
                Analyses used this period
              </p>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#7D8FA6]">Storage used</span>
                <span className="text-white font-bold">{usagePct}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(usagePct, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      usagePct > 80
                        ? "linear-gradient(to right, #FFB547, #FF5A6E)"
                        : "linear-gradient(to right, #1D8BFF, #19E3C7)",
                  }}
                />
              </div>
            </div>
            <a
              href="/pricing"
              className="block w-full py-3 rounded-xl bg-gradient-to-r from-[#1D8BFF]/20 to-[#27C4FF]/10 border border-[#1D8BFF]/30 text-center text-[#27C4FF] text-sm font-semibold hover:from-[#1D8BFF]/30 transition-all"
            >
              Upgrade Plan →
            </a>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#13263D]/60 backdrop-blur-sm border border-white/5 rounded-[24px] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold font-space-grotesk text-white">
              Recent Analyses
            </h3>
            <a
              href="/history"
              className="text-xs text-[#27C4FF] hover:text-white font-semibold flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          {recentUploads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-[#7D8FA6]" />
              </div>
              <h4 className="text-white font-semibold mb-2">No analyses yet</h4>
              <p className="text-[#7D8FA6] text-sm mb-4">
                Upload your first fabric image to get started
              </p>
              <a
                href="/upload"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
              >
                <Zap className="w-4 h-4" />
                Start Analyzing
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {recentUploads.map((upload, i) => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#07111F] border border-white/5 overflow-hidden flex-shrink-0">
                    {upload.image_url ? (
                      <img
                        src={upload.image_url}
                        alt={upload.filename}
                        className="w-full h-full object-cover opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0C1A2B] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#7D8FA6]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {upload.filename}
                    </div>
                    <div className="text-xs text-[#7D8FA6] mt-0.5">
                      {upload.fabric_type || "Analyzing..."} •{" "}
                      {new Date(upload.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {upload.confidence_score && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#35D17F]">
                          {(upload.confidence_score * 100).toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-[#7D8FA6]">
                          {upload.quality_grade || "—"}
                        </div>
                      </div>
                    )}
                    {upload.report_id && (
                      <a
                        href={`/reports/${upload.report_id}`}
                        className="p-2 rounded-lg text-[#7D8FA6] hover:text-[#27C4FF] hover:bg-[#1D8BFF]/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              label: "Upload & Analyze",
              desc: "Analyze a new fabric sample",
              href: "/upload",
              icon: Upload,
              color: "#1D8BFF",
            },
            {
              label: "View Reports",
              desc: "Browse generated reports",
              href: "/reports",
              icon: FileText,
              color: "#27C4FF",
            },
            {
              label: "Analysis History",
              desc: "Review past analyses",
              href: "/history",
              icon: Clock,
              color: "#19E3C7",
            },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-4 p-5 rounded-[20px] bg-[#13263D]/60 border border-white/5 hover:border-white/10 hover:bg-[#18324E]/60 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#27C4FF] transition-colors">
                    {action.label}
                  </div>
                  <div className="text-xs text-[#7D8FA6]">{action.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7D8FA6] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
