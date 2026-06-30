import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MessageSquare,
  Building2,
  Phone,
  Globe,
  CheckCircle2,
  Send,
  MapPin,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import BackgroundPatterns from "@/components/BackgroundPatterns";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const sendMutation = useMutation({
    mutationFn: async () => {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Failed to send");
    },
    onSuccess: () => {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    sendMutation.mutate();
  };

  const info = [
    {
      icon: Mail,
      label: "Email",
      value: "support@threadcounty.ai",
      href: "mailto:support@threadcounty.ai",
    },
    {
      icon: Building2,
      label: "Company",
      value: "ThreadCounty Technologies Inc.",
      href: null,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA 94102",
      href: null,
    },
    {
      icon: Globe,
      label: "Website",
      value: "threadcounty.ai",
      href: "https://threadcounty.ai",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Billing",
    "Enterprise Sales",
    "Partnership",
    "Feature Request",
    "Bug Report",
    "Other",
  ];

  return (
    <div className="relative min-h-screen bg-[#07111F]">
      <BackgroundPatterns />
      <nav className="relative z-10 px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold font-space-grotesk text-white"
          >
            ThreadCounty
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" className="text-[#7D8FA6] hover:text-white">
              Home
            </a>
            <a href="/faq" className="text-[#7D8FA6] hover:text-white">
              FAQ
            </a>
            <a
              href="/account/signup"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 mb-6">
            <MessageSquare className="w-7 h-7 text-[#27C4FF]" />
          </div>
          <h1 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Contact Us
          </h1>
          <p className="text-[#B8C4D6] text-lg max-w-lg mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team
            typically responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6 space-y-4">
              <h3 className="font-bold font-space-grotesk text-white mb-2">
                Get in Touch
              </h3>
              {info.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1D8BFF]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#27C4FF]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#7D8FA6] mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-white hover:text-[#27C4FF] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm text-white">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
              <h3 className="font-bold font-space-grotesk text-white mb-4">
                Response Times
              </h3>
              {[
                { plan: "General", time: "24-48 hours" },
                { plan: "Professional", time: "4-8 hours" },
                { plan: "Enterprise", time: "1-2 hours" },
              ].map((rt) => (
                <div
                  key={rt.plan}
                  className="flex justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-[#7D8FA6]">{rt.plan}</span>
                  <span className="text-sm font-semibold text-white">
                    {rt.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#1D8BFF]/20 to-[#19E3C7]/10 border border-[#1D8BFF]/20 rounded-[24px] p-6">
              <h3 className="font-bold font-space-grotesk text-white mb-2">
                Enterprise Sales
              </h3>
              <p className="text-[#B8C4D6] text-sm mb-4">
                Looking for a custom enterprise solution? Let's talk about your
                needs.
              </p>
              <a
                href="mailto:enterprise@threadcounty.ai"
                className="flex items-center gap-2 text-[#27C4FF] text-sm font-semibold hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                enterprise@threadcounty.ai
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#35D17F]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#35D17F]" />
                  </div>
                  <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#B8C4D6] mb-6">
                    We've received your message and will get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-3 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-bold font-space-grotesk text-white mb-2">
                    Send a Message
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        type="email"
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white focus:outline-none focus:border-[#1D8BFF]/50 text-sm transition-all"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      placeholder="Describe your question or issue in detail..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm transition-all resize-none"
                    />
                  </div>
                  {sendMutation.isError && (
                    <div className="p-3 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/20 text-[#FF5A6E] text-sm">
                      Failed to send. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sendMutation.isPending}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {sendMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
