import React, { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Zap,
  Building2,
  GraduationCap,
  User,
  Crown,
} from "lucide-react";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import useUser from "@/utils/useUser";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, annual: 0 },
    icon: User,
    color: "#7D8FA6",
    gradient: "from-[#7D8FA6]/20 to-transparent",
    border: "border-white/10",
    description: "Get started with basic textile analysis",
    features: [
      "5 analyses per month",
      "Basic fabric detection",
      "PDF export",
      "Email support",
      "Community access",
    ],
    limit: "5 analyses/month",
  },
  {
    id: "student",
    name: "Student",
    price: { monthly: 9, annual: 79 },
    icon: GraduationCap,
    color: "#27C4FF",
    gradient: "from-[#27C4FF]/20 to-transparent",
    border: "border-[#27C4FF]/20",
    description: "Perfect for textile students and researchers",
    features: [
      "50 analyses per month",
      "Advanced AI detection",
      "Priority processing",
      "Report sharing",
      "API access (limited)",
      "Educational resources",
    ],
    limit: "50 analyses/month",
  },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: 49, annual: 449 },
    icon: Zap,
    color: "#1D8BFF",
    gradient: "from-[#1D8BFF]/20 to-[#19E3C7]/10",
    border: "border-[#1D8BFF]/30",
    description: "For textile professionals and small teams",
    features: [
      "500 analyses per month",
      "Premium AI models",
      "Batch processing",
      "Custom reports",
      "Full API access",
      "Priority support",
      "Comparison tools",
      "Data export (all formats)",
    ],
    popular: true,
    limit: "500 analyses/month",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 199, annual: 1799 },
    icon: Building2,
    color: "#7568FF",
    gradient: "from-[#7568FF]/20 to-transparent",
    border: "border-[#7568FF]/20",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited analyses",
      "Custom AI model training",
      "Dedicated support",
      "SLA guarantee",
      "SSO integration",
      "Custom integrations",
      "White-label reports",
      "On-premise option",
    ],
    limit: "Unlimited",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const { data: user } = useUser();

  return (
    <div className="relative min-h-screen bg-[#07111F]">
      <BackgroundPatterns />

      {/* Navbar */}
      <nav className="relative z-10 px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold font-space-grotesk text-white"
          >
            ThreadCounty
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-sm text-[#7D8FA6] hover:text-white transition-colors"
            >
              Dashboard
            </a>
            {user ? (
              <a
                href="/dashboard"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/account/signup"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
              >
                Get Started
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 text-[#27C4FF] text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3 h-3" />
            Flexible Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-4">
            Choose Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] to-[#19E3C7]">
              Analysis Plan
            </span>
          </h1>
          <p className="text-[#B8C4D6] text-lg max-w-xl mx-auto mb-8">
            Start free, scale as you grow. All plans include our core AI textile
            analysis engine.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-[#13263D]/60 rounded-full border border-white/5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white shadow-lg" : "text-[#7D8FA6] hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? "bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white shadow-lg" : "text-[#7D8FA6] hover:text-white"}`}
            >
              Annual <span className="text-[#35D17F] text-xs ml-1">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = annual ? plan.price.annual : plan.price.monthly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-gradient-to-b ${plan.gradient} bg-[#13263D]/60 backdrop-blur-sm border ${plan.border} rounded-[24px] p-6 flex flex-col ${plan.popular ? "ring-1 ring-[#1D8BFF]/50 shadow-xl shadow-blue-500/10" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#7D8FA6]">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-space-grotesk text-white">
                      ${price === 0 ? "0" : price}
                    </span>
                    {price > 0 && (
                      <span className="text-[#7D8FA6] text-sm mb-1">
                        /{annual ? "yr" : "mo"}
                      </span>
                    )}
                  </div>
                  {price === 0 && (
                    <span className="text-[#7D8FA6] text-sm">Forever free</span>
                  )}
                  <div className="text-xs text-[#7D8FA6] mt-1">
                    {plan.limit}
                  </div>
                </div>

                <div className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-xs text-[#B8C4D6]">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={user ? "/dashboard" : "/account/signup"}
                  className={`block w-full py-3 rounded-full text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white shadow-lg hover:opacity-90"
                      : "border text-white hover:bg-white/5"
                  }`}
                  style={
                    !plan.popular
                      ? { borderColor: `${plan.color}40`, color: plan.color }
                      : {}
                  }
                >
                  {plan.id === "free"
                    ? "Get Started Free"
                    : plan.id === "enterprise"
                      ? "Contact Sales"
                      : `Choose ${plan.name}`}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-8">
          <h2 className="text-2xl font-bold font-space-grotesk text-white mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 pr-6 text-xs font-bold text-[#7D8FA6] uppercase tracking-wider">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider"
                      style={{ color: p.color }}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Monthly Analyses", "5", "50", "500", "Unlimited"],
                  ["AI Accuracy", "Basic", "Advanced", "Premium", "Custom"],
                  ["PDF Export", "✓", "✓", "✓", "✓"],
                  ["API Access", "✗", "Limited", "Full", "Full"],
                  ["Batch Processing", "✗", "✗", "✓", "✓"],
                  ["Custom Reports", "✗", "✗", "✓", "✓"],
                  ["Priority Support", "✗", "✗", "✓", "✓"],
                  ["SLA", "✗", "✗", "✗", "99.9%"],
                  ["SSO", "✗", "✗", "✗", "✓"],
                  ["White Label", "✗", "✗", "✗", "✓"],
                ].map(([feature, ...values]) => (
                  <tr
                    key={feature}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 pr-6 text-sm text-[#B8C4D6]">
                      {feature}
                    </td>
                    {values.map((v, vi) => (
                      <td key={vi} className="text-center py-3 px-4 text-sm">
                        {v === "✓" ? (
                          <span className="text-[#35D17F]">✓</span>
                        ) : v === "✗" ? (
                          <span className="text-[#7D8FA6]">—</span>
                        ) : (
                          <span className="text-white">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
