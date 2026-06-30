import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Cpu,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  BarChart3,
  CheckCircle2,
  Upload,
  FileText,
  TrendingUp,
  Star,
  ArrowRight,
  Microscope,
  ChevronDown,
  Play,
  Users,
  Award,
  Clock,
  Menu,
  X,
  Bell,
} from "lucide-react";
import BackgroundPatterns from "@/components/BackgroundPatterns";
import useUser from "@/utils/useUser";

// Animated counter
function Counter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const inc = end / steps;
    let current = 0;
    const timer = setInterval(
      () => {
        current += inc;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else setCount(Math.round(current));
      },
      (duration * 1000) / steps,
    );
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const FEATURES = [
  {
    icon: Microscope,
    title: "Micron-Level Detection",
    desc: "AI analyzes warp and weft threads at microscopic precision, matching laboratory-grade equipment.",
    color: "#1D8BFF",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    desc: "Get complete textile analysis reports in under 2 seconds with our GPU-accelerated AI pipeline.",
    color: "#27C4FF",
  },
  {
    icon: Shield,
    title: "ISO 7211 Compliant",
    desc: "All analysis follows international textile testing standards for global industry compliance.",
    color: "#19E3C7",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Comprehensive quality trend charts, batch comparison tools, and statistical reporting.",
    color: "#7568FF",
  },
  {
    icon: FileText,
    title: "Professional Reports",
    desc: "Export beautiful, branded PDF reports with charts, confidence scores, and recommendations.",
    color: "#35D17F",
  },
  {
    icon: Globe,
    title: "API & Integrations",
    desc: "REST API, webhooks, and native integrations with SAP, Oracle, and other ERP systems.",
    color: "#FFB547",
  },
];

const STATS = [
  { value: 99.8, suffix: "%", label: "Analysis Accuracy" },
  { value: 1.2, suffix: "s", label: "Avg Processing Time" },
  { value: 10, suffix: "M+", label: "Analyses Run" },
  { value: 500, suffix: "+", label: "Industry Partners" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Upload Fabric Image",
    desc: "Drag and drop a high-resolution fabric sample image from your camera, microscope, or scanner.",
    icon: Upload,
  },
  {
    step: "02",
    title: "AI Processes Sample",
    desc: "Our neural network analyzes thread patterns, weave structure, and material properties instantly.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Receive Full Report",
    desc: "Get warp count, weft count, TPI, quality grade, and AI recommendations in seconds.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Export & Integrate",
    desc: "Download PDF reports, export data, or push results directly to your quality management system.",
    icon: TrendingUp,
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Head of QC, Milliken & Company",
    text: "ThreadCounty reduced our inspection time by 87%. What used to take a technician 20 minutes now takes 2 seconds with higher accuracy.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "James Kowalski",
    role: "Textile Engineer, INVISTA",
    text: "The confidence scores give our team immediate clarity on sample quality. We've eliminated 98% of manual thread counting.",
    rating: 5,
    avatar: "JK",
  },
  {
    name: "Priya Sharma",
    role: "Research Director, IIT Delhi",
    text: "For textile research, ThreadCounty is invaluable. The API integration allows us to automate our entire testing pipeline.",
    rating: 5,
    avatar: "PS",
  },
];

const FAQ_PREVIEW = [
  {
    q: "How accurate is the AI thread count detection?",
    a: "Our AI achieves 99.8% accuracy on standard woven fabrics, validated against ISO 7211 standards.",
  },
  {
    q: "What image types work best?",
    a: "High-resolution microscope or macro images at 10x-40x magnification produce optimal results.",
  },
  {
    q: "Can I export analysis reports?",
    a: "Yes — all plans include PDF export. Professional plans add CSV, JSON, and Excel formats.",
  },
  {
    q: "Is there an API available?",
    a: "Yes. Student, Professional, and Enterprise plans include REST API access with full documentation.",
  },
];

export default function LandingPage() {
  const { data: user } = useUser();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (id) => {
    if (id.startsWith("/")) {
      window.location.href = id;
      return;
    }
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <main className="relative min-h-screen bg-[#07111F] text-[#F5F7FA] overflow-x-hidden selection:bg-[#1D8BFF] selection:text-white">
      <BackgroundPatterns />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 border-b border-white/5 bg-[#07111F]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B8C4D6]">
              ThreadCounty
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-[#7D8FA6] hover:text-white transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <a
                href="/dashboard"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/account/signin"
                  className="hidden sm:block text-sm text-[#7D8FA6] hover:text-white font-semibold transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </a>
              </>
            )}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-[#7D8FA6] hover:text-white"
            >
              {mobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 space-y-2"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-4 py-2.5 rounded-xl text-[#7D8FA6] hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 text-[#27C4FF] text-xs font-bold uppercase tracking-wider mb-8">
              <Zap className="w-3 h-3" />
              AI Textile Intelligence Platform v3.0
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-space-grotesk leading-tight mb-6 tracking-tight">
              Precision Fabric
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] via-[#27C4FF] to-[#19E3C7]">
                Analysis at Scale
              </span>
            </h1>
            <p className="text-xl text-[#B8C4D6] leading-relaxed mb-10 max-w-lg">
              AI-powered textile intelligence for modern manufacturing. Analyze
              warp counts, weft counts, weave patterns, and material quality in
              under 2 seconds with enterprise-grade accuracy.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href={user ? "/dashboard" : "/account/signup"}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-bold flex items-center gap-2 shadow-xl shadow-blue-500/25 hover:scale-105 transition-transform"
              >
                {user ? "Go to Dashboard" : "Start Free Analysis"}
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                View Pricing
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {STATS.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-space-grotesk text-white">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#7D8FA6] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-[#13263D]/60 backdrop-blur-xl border border-white/8 rounded-[32px] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#1D8BFF]/20">
                    <Microscope className="w-5 h-5 text-[#27C4FF]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Live Fabric Analysis
                    </div>
                    <div className="text-[10px] text-[#7D8FA6]">
                      COTTON_TWILL_SAMPLE_007
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#35D17F]/10 border border-[#35D17F]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#35D17F]" />
                  <span className="text-[10px] font-bold text-[#35D17F]">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="aspect-video rounded-2xl bg-[#07111F] mb-5 overflow-hidden relative border border-white/5">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(39,196,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(39,196,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative w-48 h-48"
                  >
                    <div className="absolute inset-0 rounded-full border-[12px] border-[#1D8BFF]/20" />
                    <div className="absolute inset-4 rounded-full border border-dashed border-[#27C4FF]/30" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-8 rounded-full border border-[#19E3C7]/20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-[#1D8BFF]/50" />
                    </div>
                  </motion.div>
                </div>
                <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-white font-mono">
                  WEAVE: 3/1_TWILL
                </div>
                <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#1D8BFF] text-[10px] font-bold text-white">
                  QUALITY: A+
                </div>
                <motion.div
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#27C4FF]/60 to-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Warp Count",
                    value: "42 threads/in",
                    color: "#1D8BFF",
                  },
                  {
                    label: "Weft Count",
                    value: "38 threads/in",
                    color: "#27C4FF",
                  },
                  { label: "TPI Density", value: "80 TPI", color: "#19E3C7" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-center"
                  >
                    <div
                      className="text-xs font-bold"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[10px] text-[#7D8FA6] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Confidence Bar */}
              <div className="mt-4 p-3 rounded-xl bg-[#35D17F]/10 border border-[#35D17F]/20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#7D8FA6] font-semibold">
                    AI Confidence
                  </span>
                  <span className="text-[#35D17F] font-bold">98.5%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ["0%", "98.5%"] }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#1D8BFF] to-[#35D17F] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-[#13263D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl hidden lg:block"
            >
              <div className="text-xs font-bold text-[#7D8FA6] mb-1">
                Analysis Speed
              </div>
              <div className="text-2xl font-bold font-space-grotesk text-white">
                1.2<span className="text-sm text-[#27C4FF]">s</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -left-6 bg-[#13263D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl hidden lg:block"
            >
              <div className="text-xs font-bold text-[#7D8FA6] mb-1">
                Reports Today
              </div>
              <div className="text-2xl font-bold font-space-grotesk text-[#27C4FF]">
                12,847
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-white/5 bg-[#0C1A2B]/40 backdrop-blur-sm px-6 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl font-bold font-space-grotesk text-white mb-1">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-[#7D8FA6]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 text-[#27C4FF] text-xs font-bold uppercase tracking-wider mb-6">
            Platform Features
          </div>
          <h2 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Everything You Need for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] to-[#19E3C7]">
              Textile QC
            </span>
          </h2>
          <p className="text-[#B8C4D6] max-w-xl mx-auto">
            From instant thread counting to enterprise integrations —
            ThreadCounty covers your entire quality control workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6 hover:border-white/10 hover:bg-[#18324E]/60 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${f.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#7D8FA6] leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 bg-[#0C1A2B]/40 py-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#19E3C7]/10 border border-[#19E3C7]/20 text-[#19E3C7] text-xs font-bold uppercase tracking-wider mb-6">
              Simple Workflow
            </div>
            <h2 className="text-4xl font-bold font-space-grotesk text-white mb-4">
              How ThreadCounty Works
            </h2>
            <p className="text-[#B8C4D6] max-w-xl mx-auto">
              From upload to professional report in 4 simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-gradient-to-r from-[#1D8BFF]/50 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D8BFF] to-[#27C4FF] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20 relative z-10">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-[#27C4FF] mb-2 font-space-grotesk">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#7D8FA6] leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href={user ? "/upload" : "/account/signup"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-bold shadow-xl shadow-blue-500/25 hover:scale-105 transition-transform"
            >
              <Upload className="w-4 h-4" />
              Try It Now — Free
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7568FF]/10 border border-[#7568FF]/20 text-[#7568FF] text-xs font-bold uppercase tracking-wider mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[#FFB547] text-[#FFB547]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#B8C4D6] mb-6 leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-[#7D8FA6]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 bg-[#0C1A2B]/40 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#35D17F]/10 border border-[#35D17F]/20 text-[#35D17F] text-xs font-bold uppercase tracking-wider mb-6">
              Simple Pricing
            </div>
            <h2 className="text-4xl font-bold font-space-grotesk text-white mb-4">
              Start Free, Scale with Confidence
            </h2>
            <p className="text-[#B8C4D6] mb-10">
              No credit card required. Upgrade when you need more.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {[
                {
                  name: "Free",
                  price: "$0",
                  desc: "5 analyses/month",
                  features: [
                    "Basic AI detection",
                    "PDF export",
                    "Email support",
                  ],
                  color: "#7D8FA6",
                },
                {
                  name: "Professional",
                  price: "$49/mo",
                  desc: "500 analyses/month",
                  features: [
                    "Premium AI models",
                    "Full API access",
                    "Priority support",
                    "Batch processing",
                  ],
                  color: "#1D8BFF",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "Unlimited",
                  features: [
                    "Custom AI training",
                    "SLA guarantee",
                    "SSO integration",
                    "Dedicated support",
                  ],
                  color: "#7568FF",
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-[#13263D]/60 border rounded-[20px] p-6 text-left ${plan.popular ? "border-[#1D8BFF]/30 ring-1 ring-[#1D8BFF]/20" : "border-white/5"}`}
                >
                  {plan.popular && (
                    <div className="text-[10px] font-bold text-[#27C4FF] mb-3 uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="text-lg font-bold text-white mb-1">
                    {plan.name}
                  </div>
                  <div
                    className="text-2xl font-bold font-space-grotesk mb-1"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </div>
                  <div className="text-xs text-[#7D8FA6] mb-4">{plan.desc}</div>
                  <div className="space-y-2">
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-xs text-[#B8C4D6]"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: plan.color }}
                        />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/pricing"
              className="inline-flex items-center gap-2 text-[#27C4FF] font-semibold hover:text-white transition-colors"
            >
              See full pricing comparison <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="space-y-3 mb-8">
          {FAQ_PREVIEW.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#13263D]/60 border border-white/5 rounded-[16px] overflow-hidden"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-white pr-4">
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }}>
                  <ChevronDown className="w-5 h-5 text-[#7D8FA6] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {faqOpen === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-[#B8C4D6] border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-[#27C4FF] font-semibold hover:text-white transition-colors"
          >
            View all 20 FAQs <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1D8BFF]/20 to-[#19E3C7]/10 border border-[#1D8BFF]/20 rounded-[28px] p-10 text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 flex items-center justify-center mx-auto mb-6">
            <Bell className="w-6 h-6 text-[#27C4FF]" />
          </div>
          <h2 className="text-2xl font-bold font-space-grotesk text-white mb-2">
            Stay Ahead in Textile Tech
          </h2>
          <p className="text-[#B8C4D6] text-sm mb-6">
            Industry insights, AI updates, and ThreadCounty news delivered
            monthly.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 justify-center text-[#35D17F] font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Subscribed! Thanks for joining.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm"
              />
              <button
                onClick={() => {
                  if (email) setSubscribed(true);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-4">
            Ready to Transform Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] to-[#19E3C7]">
              Quality Control?
            </span>
          </h2>
          <p className="text-[#B8C4D6] text-lg mb-8">
            Join 10,000+ textile professionals. Start your first analysis free
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={user ? "/upload" : "/account/signup"}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-bold text-lg shadow-2xl shadow-blue-500/30 hover:scale-105 transition-transform"
            >
              {user ? "Run New Analysis" : "Get Started — It's Free"}
            </a>
            <a
              href="/contact"
              className="px-10 py-5 rounded-full border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0C1A2B]/60 backdrop-blur-sm px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center">
                  <Cpu className="text-white w-5 h-5" />
                </div>
                <span className="font-bold font-space-grotesk text-white">
                  ThreadCounty
                </span>
              </div>
              <p className="text-xs text-[#7D8FA6] leading-relaxed">
                AI-powered textile analysis platform for manufacturers,
                researchers, and QC professionals worldwide.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: [
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Upload & Analyze", href: "/upload" },
                  { label: "Reports", href: "/reports" },
                  { label: "History", href: "/history" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "About", href: "/about" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Contact", href: "/contact" },
                ],
              },
              {
                title: "Account",
                links: [
                  { label: "Sign In", href: "/account/signin" },
                  { label: "Sign Up", href: "/account/signup" },
                  { label: "Profile", href: "/profile" },
                  { label: "Settings", href: "/settings" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-[#7D8FA6] uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <div className="space-y-3">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-[#7D8FA6] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#7D8FA6]">
              © 2026 ThreadCounty Technologies Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[#7D8FA6]">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                API Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
