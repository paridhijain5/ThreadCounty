import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Users,
  Upload,
  FileText,
  MessageSquare,
  BarChart3,
  AlertCircle,
  Trash2,
  CheckCheck,
  Eye,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AppLayout from "@/components/AppLayout";

const TABS = ["Overview", "Users", "Uploads", "Messages"];

export default function AdminPage() {
  const [tab, setTab] = useState("Overview");
  const qc = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const r = await fetch("/api/admin?type=stats");
      if (!r.ok)
        throw new Error(
          r.status === 403 ? "Access denied. Admin only." : "Failed",
        );
      return r.json();
    },
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const r = await fetch("/api/admin?type=users");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    enabled: tab === "Users",
  });

  const { data: uploadsData, isLoading: uploadsLoading } = useQuery({
    queryKey: ["admin", "uploads"],
    queryFn: async () => {
      const r = await fetch("/api/admin?type=uploads");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    enabled: tab === "Uploads",
  });

  const { data: messagesData } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const r = await fetch("/api/admin?type=messages");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    enabled: tab === "Messages",
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }) => {
      const r = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id }),
      });
      if (!r.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (messageId) => {
      const r = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markMessageRead", messageId }),
      });
      if (!r.ok) throw new Error("Failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "messages"] }),
  });

  // Access denied check
  if (!statsLoading && stats?.error) {
    return (
      <AppLayout activeTab="admin">
        <div className="p-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 rounded-full bg-[#FF5A6E]/10 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-[#FF5A6E]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Admin Access Required
          </h2>
          <p className="text-[#7D8FA6] mb-6 max-w-md">
            This area is restricted to administrators only. To become an admin,
            sign in and visit{" "}
            <code className="text-[#27C4FF]">/api/admin/promote</code> to
            promote yourself.
          </p>
          <a
            href="/api/admin/promote"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm"
            onClick={async (e) => {
              e.preventDefault();
              await fetch("/api/admin/promote", { method: "POST" });
              window.location.reload();
            }}
          >
            Promote Me to Admin
          </a>
        </div>
      </AppLayout>
    );
  }

  const s = stats?.stats || {};
  const statCards = [
    {
      label: "Total Users",
      value: s.totalUsers || 0,
      icon: Users,
      color: "#1D8BFF",
    },
    {
      label: "Total Uploads",
      value: s.totalUploads || 0,
      icon: Upload,
      color: "#27C4FF",
    },
    {
      label: "Total Reports",
      value: s.totalReports || 0,
      icon: FileText,
      color: "#19E3C7",
    },
    {
      label: "Contact Messages",
      value: s.totalMessages || 0,
      icon: MessageSquare,
      color: "#7568FF",
      badge: s.unreadMessages,
    },
  ];

  const weeklyChartData = (stats?.weeklyData || []).map((d) => ({
    day: new Date(d.day).toLocaleDateString("en", { weekday: "short" }),
    uploads: parseInt(d.count),
  }));

  return (
    <AppLayout activeTab="admin">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#FF5A6E]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-space-grotesk text-white">
              Admin Dashboard
            </h1>
            <p className="text-[#7D8FA6] text-xs mt-0.5">
              Platform management & analytics
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#13263D]/40 rounded-xl w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white shadow" : "text-[#7D8FA6] hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((sc, i) => {
                const Icon = sc.icon;
                return (
                  <motion.div
                    key={sc.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 relative"
                  >
                    {sc.badge > 0 && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF5A6E] flex items-center justify-center text-[10px] font-bold text-white">
                        {sc.badge}
                      </div>
                    )}
                    <div
                      className="p-2 rounded-lg w-fit mb-3"
                      style={{ backgroundColor: `${sc.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: sc.color }} />
                    </div>
                    <div className="text-2xl font-bold font-space-grotesk text-white mb-1">
                      {statsLoading ? "—" : sc.value}
                    </div>
                    <div className="text-xs text-[#7D8FA6]">{sc.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
                <h3 className="font-bold font-space-grotesk text-white mb-4">
                  Uploads (Last 7 Days)
                </h3>
                <div className="h-48">
                  {weeklyChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyChartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
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
                        <Bar
                          dataKey="uploads"
                          fill="#1D8BFF"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-[#7D8FA6] text-sm">
                      No upload data yet
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
                <h3 className="font-bold font-space-grotesk text-white mb-4">
                  Recent Activity
                </h3>
                {(stats?.recentActivity || []).length === 0 ? (
                  <div className="h-48 flex items-center justify-center text-[#7D8FA6] text-sm">
                    No activity yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(stats?.recentActivity || []).slice(0, 6).map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/3"
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${a.type === "upload" ? "bg-[#1D8BFF]/10 text-[#27C4FF]" : "bg-[#35D17F]/10 text-[#35D17F]"}`}
                        >
                          {a.type === "upload" ? "↑" : "✓"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate">
                            {a.label || "Untitled"}
                          </div>
                          <div className="text-[10px] text-[#7D8FA6]">
                            {new Date(a.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#7D8FA6] capitalize">
                          {a.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "Users" && (
          <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] overflow-hidden">
            {usersLoading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {[
                      "User",
                      "Email",
                      "Role",
                      "Uploads",
                      "Joined",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-[10px] font-bold text-[#7D8FA6] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(usersData?.users || []).map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-white/3 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-xs font-bold">
                          {user.name
                            ? user.name[0]
                            : user.email?.[0]?.toUpperCase() || "U"}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-white">
                        {user.email}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${user.role === "admin" ? "bg-[#FF5A6E]/15 text-[#FF5A6E]" : "bg-white/5 text-[#7D8FA6]"}`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#B8C4D6]">
                        {user.upload_count || 0}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#7D8FA6]">
                        {new Date(
                          user.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            deleteMutation.mutate({ type: "user", id: user.id })
                          }
                          className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "Uploads" && (
          <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] overflow-hidden">
            {uploadsLoading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {[
                      "Image",
                      "Filename",
                      "User",
                      "Fabric",
                      "Confidence",
                      "Date",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[10px] font-bold text-[#7D8FA6] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(uploadsData?.uploads || []).map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-white/3 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#07111F]">
                          {u.image_url && (
                            <img
                              src={u.image_url}
                              alt={u.filename}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-white max-w-[120px] truncate">
                        {u.filename}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#7D8FA6] max-w-[120px] truncate">
                        {u.user_email || "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#B8C4D6]">
                        {u.fabric_type || "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#35D17F]">
                        {u.confidence_score
                          ? `${(u.confidence_score * 100).toFixed(0)}%`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#7D8FA6]">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            deleteMutation.mutate({ type: "upload", id: u.id })
                          }
                          className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "Messages" && (
          <div className="space-y-3">
            {(messagesData?.messages || []).length === 0 ? (
              <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-12 text-center">
                <MessageSquare className="w-10 h-10 text-[#7D8FA6] mx-auto mb-3" />
                <p className="text-[#7D8FA6]">No messages yet</p>
              </div>
            ) : (
              (messagesData?.messages || []).map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`bg-[#13263D]/60 border rounded-[16px] p-5 ${msg.status === "unread" ? "border-[#27C4FF]/20" : "border-white/5"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">
                          {msg.name}
                        </span>
                        <span className="text-xs text-[#7D8FA6]">
                          ({msg.email})
                        </span>
                        {msg.status === "unread" && (
                          <span className="px-2 py-0.5 rounded-full bg-[#27C4FF]/10 text-[#27C4FF] text-[10px] font-bold">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#7D8FA6] mb-2">
                        {msg.subject} •{" "}
                        {new Date(msg.created_at).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-[#B8C4D6]">{msg.message}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {msg.status === "unread" && (
                        <button
                          onClick={() => markReadMutation.mutate(msg.id)}
                          className="p-1.5 rounded-lg text-[#35D17F] hover:bg-[#35D17F]/10 transition-all"
                          title="Mark as read"
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          deleteMutation.mutate({ type: "message", id: msg.id })
                        }
                        className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
