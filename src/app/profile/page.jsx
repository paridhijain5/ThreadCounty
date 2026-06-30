import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  User,
  Camera,
  Building2,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";
import useUpload from "@/utils/useUpload";

export default function ProfilePage() {
  const qc = useQueryClient();
  const [upload] = useUpload();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    bio: "",
    phone: "",
    website: "",
    location: "",
    job_title: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const r = await fetch("/api/profile");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.user?.name || "",
        company: data.profile?.company || "",
        bio: data.profile?.bio || "",
        phone: data.profile?.phone || "",
        website: data.profile?.website || "",
        location: data.profile?.location || "",
        job_title: data.profile?.job_title || "",
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const r = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const user = data?.user;
  const stats = data?.stats || {};
  const subscription = data?.subscription || { plan: "free" };

  const fields = [
    { key: "name", label: "Full Name", icon: User, placeholder: "John Doe" },
    {
      key: "job_title",
      label: "Job Title",
      icon: Briefcase,
      placeholder: "Textile Engineer",
    },
    {
      key: "company",
      label: "Company",
      icon: Building2,
      placeholder: "Acme Textiles Ltd.",
    },
    {
      key: "phone",
      label: "Phone",
      icon: Phone,
      placeholder: "+1 (555) 000-0000",
    },
    {
      key: "website",
      label: "Website",
      icon: Globe,
      placeholder: "https://yoursite.com",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      placeholder: "New York, NY",
    },
  ];

  return (
    <AppLayout activeTab="profile">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
            Your Profile
          </h1>
          <p className="text-[#7D8FA6] text-sm mt-1">
            Manage your personal information and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar + Stats */}
          <div className="space-y-4">
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-3xl font-bold font-space-grotesk mx-auto">
                  {user?.name
                    ? user.name[0].toUpperCase()
                    : user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1D8BFF] flex items-center justify-center text-white hover:bg-[#27C4FF] transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-white font-bold font-space-grotesk">
                {user?.name || "User"}
              </h3>
              <p className="text-[#7D8FA6] text-xs mt-1">{user?.email}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D8BFF]/10 text-[#27C4FF] text-xs font-bold capitalize border border-[#1D8BFF]/20">
                {subscription.plan} Plan
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-5 space-y-3">
              <h4 className="text-xs font-bold text-[#7D8FA6] uppercase tracking-wider">
                Account Statistics
              </h4>
              {[
                { label: "Total Analyses", value: parseInt(stats.total || 0) },
                {
                  label: "Storage Used",
                  value: `${Math.round(parseInt(stats.total_size || 0) / 1024)} KB`,
                },
                {
                  label: "Plan",
                  value:
                    subscription.plan.charAt(0).toUpperCase() +
                    subscription.plan.slice(1),
                },
                {
                  label: "Uploads Left",
                  value: Math.max(
                    0,
                    subscription.uploads_limit - subscription.uploads_used,
                  ),
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-xs text-[#7D8FA6]">{s.label}</span>
                  <span className="text-xs font-bold text-white">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
              <h3 className="font-bold font-space-grotesk text-white mb-6">
                Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {fields.map(({ key, label, icon: Icon, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8FA6]" />
                      <input
                        value={form[key]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        placeholder={placeholder}
                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/60 text-sm transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/60 text-sm transition-all resize-none"
                />
              </div>

              {saved && (
                <div className="mb-4 p-3 rounded-xl bg-[#35D17F]/10 border border-[#35D17F]/20 flex items-center gap-2 text-[#35D17F] text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Profile saved successfully!
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saveMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    if (data)
                      setForm({
                        name: data.user?.name || "",
                        company: data.profile?.company || "",
                        bio: data.profile?.bio || "",
                        phone: data.profile?.phone || "",
                        website: data.profile?.website || "",
                        location: data.profile?.location || "",
                        job_title: data.profile?.job_title || "",
                      });
                  }}
                  className="px-6 py-3 rounded-full border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
