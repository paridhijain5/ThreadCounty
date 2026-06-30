import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  CheckCheck,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";

const TYPE_STYLES = {
  success: {
    icon: CheckCircle2,
    color: "#35D17F",
    bg: "#35D17F15",
    border: "#35D17F30",
  },
  error: {
    icon: AlertCircle,
    color: "#FF5A6E",
    bg: "#FF5A6E15",
    border: "#FF5A6E30",
  },
  warning: {
    icon: AlertCircle,
    color: "#FFB547",
    bg: "#FFB54715",
    border: "#FFB54730",
  },
  info: { icon: Info, color: "#27C4FF", bg: "#27C4FF15", border: "#27C4FF30" },
};

export default function NotificationsPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const r = await fetch("/api/notifications");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    refetchInterval: 15000,
  });

  const markReadMutation = useMutation({
    mutationFn: async (id) => {
      const r = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { id } : { markAll: true }),
      });
      if (!r.ok) throw new Error("Failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const r = await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { id } : {}),
      });
      if (!r.ok) throw new Error("Failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  return (
    <AppLayout activeTab="notifications">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-[#7D8FA6] text-sm mt-1">
                {unreadCount} unread
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => markReadMutation.mutate(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white text-sm hover:bg-white/5 transition-colors"
              >
                <CheckCheck className="w-4 h-4 text-[#35D17F]" /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => deleteMutation.mutate(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#FF5A6E]/20 text-[#FF5A6E] text-sm hover:bg-[#FF5A6E]/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Clear all
              </button>
            )}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto mb-3" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-16 text-center">
            <Bell className="w-12 h-12 text-[#7D8FA6] mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">All caught up!</h3>
            <p className="text-[#7D8FA6] text-sm">
              No notifications yet. Start analyzing fabric samples to receive
              updates.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {notifications.map((n, i) => {
                const typeStyle = TYPE_STYLES[n.type] || TYPE_STYLES.info;
                const Icon = typeStyle.icon;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-start gap-4 p-4 rounded-[16px] border transition-all group ${
                      n.is_read
                        ? "bg-[#13263D]/40 border-white/5"
                        : `border-[${typeStyle.border}]`
                    }`}
                    style={
                      !n.is_read
                        ? {
                            backgroundColor: typeStyle.bg,
                            borderColor: typeStyle.border,
                          }
                        : {}
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${typeStyle.color}15` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: typeStyle.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-sm font-bold ${n.is_read ? "text-[#B8C4D6]" : "text-white"}`}
                        >
                          {n.title}
                        </h4>
                        {!n.is_read && (
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                            style={{ backgroundColor: typeStyle.color }}
                          />
                        )}
                      </div>
                      <p className="text-xs text-[#7D8FA6] mt-0.5">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-[#7D8FA6]/60 mt-1">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.is_read && (
                        <button
                          onClick={() => markReadMutation.mutate(n.id)}
                          className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#35D17F] hover:bg-[#35D17F]/10 transition-all"
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMutation.mutate(n.id)}
                        className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
