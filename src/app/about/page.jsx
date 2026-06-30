import React from "react";
import { motion } from "motion/react";
import {
  Cpu,
  Zap,
  Shield,
  Globe,
  Target,
  Award,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import BackgroundPatterns from "@/components/BackgroundPatterns";

const STATS = [
  { value: "99.8%", label: "AI Accuracy", color: "#35D17F" },
  { value: "1.2s", label: "Avg Process Time", color: "#27C4FF" },
  { value: "500+", label: "Industry Partners", color: "#7568FF" },
  { value: "10M+", label: "Analyses Run", color: "#1D8BFF" },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision First",
    desc: "Every algorithm is tuned for textile-specific accuracy, validated against ISO 7211 standards.",
    color: "#1D8BFF",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "AES-256 encryption, SOC 2 Type II compliant, and full GDPR compliance for global operations.",
    color: "#7568FF",
  },
  {
    icon: Zap,
    title: "Real-Time Intelligence",
    desc: "Analysis results in under 2 seconds, enabling in-line quality control on the production floor.",
    color: "#FFB547",
  },
  {
    icon: Globe,
    title: "Global Standards",
    desc: "Supports industry standards from ASTM, ISO, and regional textile regulatory frameworks worldwide.",
    color: "#19E3C7",
  },
];

const TEAM = [
  {
    name: "Dr. Ariana Chen",
    role: "CEO & Co-Founder",
    spec: "Textile Engineering PhD, MIT",
    avatar: "AC",
  },
  {
    name: "Marcus Oliveira",
    role: "CTO & Co-Founder",
    spec: "ML Research, Stanford",
    avatar: "MO",
  },
  {
    name: "Priya Sharma",
    role: "Head of AI Research",
    spec: "Computer Vision, Carnegie Mellon",
    avatar: "PS",
  },
  {
    name: "James Kowalski",
    role: "VP of Engineering",
    spec: "Systems Architecture, 15y exp",
    avatar: "JK",
  },
];

const TIMELINE = [
  {
    year: "2022",
    event: "Founded with seed funding from Textile Innovation Fund",
  },
  {
    year: "2023",
    event: "Launched ThreadCounty v1.0 with 95% analysis accuracy",
  },
  { year: "2024", event: "Reached 100,000 users, raised Series A funding" },
  {
    year: "2025",
    event: "Launched Enterprise platform, partnered with 500+ manufacturers",
  },
  {
    year: "2026",
    event: "ThreadCounty v3.0 — 99.8% accuracy, real-time processing",
  },
];

export default function AboutPage() {
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
            <a href="/faq" className="text-[#7D8FA6] hover:text-white">
              FAQ
            </a>
            <a href="/contact" className="text-[#7D8FA6] hover:text-white">
              Contact
            </a>
            <a href="/pricing" className="text-[#7D8FA6] hover:text-white">
              Pricing
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

      <div className="relative z-10">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 text-[#27C4FF] text-xs font-bold uppercase tracking-wider mb-8">
              <Cpu className="w-3 h-3" />
              About ThreadCounty
            </div>
            <h1 className="text-5xl font-bold font-space-grotesk text-white mb-6">
              Revolutionizing Textile Quality Control with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] to-[#19E3C7]">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl text-[#B8C4D6] max-w-2xl mx-auto mb-12">
              ThreadCounty was founded with a simple mission: make precision
              textile analysis accessible to every manufacturer, researcher, and
              quality control professional in the world.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-6 text-center"
              >
                <div
                  className="text-3xl font-bold font-space-grotesk mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#7D8FA6]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold font-space-grotesk text-white mb-4">
                Our Mission
              </h2>
              <p className="text-[#B8C4D6] mb-4">
                ThreadCounty bridges the gap between traditional textile quality
                control — which relies on manual inspection with magnifying
                glasses and expensive laboratory equipment — and modern
                AI-powered instant analysis.
              </p>
              <p className="text-[#B8C4D6] mb-6">
                Our platform enables quality control teams to analyze warp
                count, weft count, thread density, weave patterns, and material
                integrity in seconds, not hours. This means faster production
                cycles, fewer defects, and higher customer satisfaction.
              </p>
              <a
                href="/account/signup"
                className="inline-flex items-center gap-2 text-[#27C4FF] font-semibold hover:text-white transition-colors"
              >
                Start analyzing today <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${val.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: val.color }} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {val.title}
                    </h4>
                    <p className="text-xs text-[#7D8FA6]">{val.desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold font-space-grotesk text-white mb-2 text-center">
              Leadership Team
            </h2>
            <p className="text-[#7D8FA6] text-center mb-10">
              Built by experts in textile engineering, machine learning, and
              enterprise software.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#27C4FF] mt-0.5">{member.role}</p>
                  <p className="text-xs text-[#7D8FA6] mt-1">{member.spec}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-space-grotesk text-white mb-2 text-center">
              Our Journey
            </h2>
            <p className="text-[#7D8FA6] text-center mb-10">
              From a university lab project to a global textile intelligence
              platform.
            </p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1D8BFF] to-[#19E3C7]" />
              <div className="space-y-8 pl-16">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#27C4FF] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                      {item.year.slice(-2)}
                    </div>
                    <div className="bg-[#13263D]/60 border border-white/5 rounded-[16px] p-4">
                      <div className="text-xs font-bold text-[#27C4FF] mb-1">
                        {item.year}
                      </div>
                      <div className="text-sm text-[#B8C4D6]">{item.event}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gradient-to-br from-[#1D8BFF]/20 to-[#19E3C7]/10 border border-[#1D8BFF]/20 rounded-[28px] p-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-white mb-4">
              Ready to Transform Your QC Workflow?
            </h2>
            <p className="text-[#B8C4D6] mb-8">
              Join 10,000+ textile professionals using ThreadCounty for
              precision fabric analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/account/signup"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold shadow-xl shadow-blue-500/25 hover:opacity-90 transition-opacity"
              >
                Start Free Analysis
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
