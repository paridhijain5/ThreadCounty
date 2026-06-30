import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Bell,
  BarChart3,
  Globe,
  Moon,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? "bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF]" : "bg-white/10"}`}
  >
    <div
      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0.5"}`}
    />
  </button>
);

export default function SettingsPage() {
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    email_notifications: true,
    analysis_alerts: true,
    weekly_report: false,
    theme: "dark",
    language: "en",
  });

  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const r = await fetch("/api/settings");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  useEffect(() => {
    if (data?.settings) setSettings(data.settings);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const r = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!r.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const sections = [
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      color: "#27C4FF",
      items: [
        {
          key: "email_notifications",
          label: "Email Notifications",
          desc: "Receive analysis results via email",
        },
        {
          key: "analysis_alerts",
          label: "Analysis Alerts",
          desc: "Get notified when AI analysis completes",
        },
        {
          key: "weekly_report",
          label: "Weekly Summary Report",
          desc: "Receive a weekly digest of your analyses",
        },
      ],
    },
  ];

  return (
    <AppLayout activeTab="settings">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
            Settings
          </h1>
          <p className="text-[#7D8FA6] text-sm mt-1">
            Manage your account preferences
          </p>
        </motion.div>

        {sections.map((section, si) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
              className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: section.color }} />
                </div>
                <h3 className="font-bold font-space-grotesk text-white">
                  {section.title}
                </h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#7D8FA6] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    <Toggle
                      checked={settings[item.key]}
                      onChange={(v) =>
                        setSettings({ ...settings, [item.key]: v })
                      }
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Language & Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#7568FF]/15 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#7568FF]" />
            </div>
            <h3 className="font-bold font-space-grotesk text-white">
              Preferences
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full px-3 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white focus:outline-none focus:border-[#1D8BFF]/50 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({ ...settings, theme: e.target.value })
                }
                className="w-full px-3 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white focus:outline-none focus:border-[#1D8BFF]/50 text-sm"
              >
                <option value="dark">Dark (Default)</option>
                <option value="darker">Darker</option>
                <option value="midnight">Midnight</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#FF5A6E]/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FF5A6E]" />
            </div>
            <h3 className="font-bold font-space-grotesk text-white">
              Security
            </h3>
          </div>
          <div className="space-y-3">
            <a
              href="/account/signin"
              className="block p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/3 transition-all"
            >
              <div className="text-sm font-medium text-white">
                Change Password
              </div>
              <div className="text-xs text-[#7D8FA6] mt-0.5">
                Update your account password
              </div>
            </a>
            <a
              href="/account/logout"
              className="block p-4 rounded-xl border border-[#FF5A6E]/20 hover:bg-[#FF5A6E]/5 transition-all"
            >
              <div className="text-sm font-medium text-[#FF5A6E]">Sign Out</div>
              <div className="text-xs text-[#7D8FA6] mt-0.5">
                Sign out of your account
              </div>
            </a>
          </div>
        </motion.div>

        {saved && (
          <div className="p-4 rounded-xl bg-[#35D17F]/10 border border-[#35D17F]/20 flex items-center gap-2 text-[#35D17F] text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Settings saved successfully!
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saveMutation.isPending ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
