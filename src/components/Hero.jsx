import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Cpu, Zap, ShieldCheck, Microscope } from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <div className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 text-[#27C4FF] text-xs font-semibold uppercase tracking-wider mb-8">
            <Zap className="w-3 h-3" />
            <span>AI Textile Analysis v2.4</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold font-space-grotesk leading-tight mb-6 tracking-tight">
            Next-Gen <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] via-[#27C4FF] to-[#19E3C7]">
              Industrial Precision
            </span>
          </h1>

          <p className="text-xl text-[#B8C4D6] leading-relaxed mb-10 max-w-lg">
            AI-powered textile intelligence for modern manufacturing. Analyze
            weave patterns, thread counts, and material quality in real-time
            with enterprise-grade accuracy.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold flex items-center gap-2 shadow-xl shadow-blue-500/25 hover:scale-105 transition-transform duration-300"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors duration-300">
              Watch Demo
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-white">
                99.8%
              </div>
              <div className="text-sm text-[#7D8FA6]">Analysis Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-white">
                1.2s
              </div>
              <div className="text-sm text-[#7D8FA6]">Processing Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-white">
                500+
              </div>
              <div className="text-sm text-[#7D8FA6]">Industry Partners</div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center perspective-1000"
        >
          {/* Main Visual Card */}
          <div className="relative z-10 w-full max-w-md p-6 glass-card rounded-[32px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D8BFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#1D8BFF]/20 text-[#27C4FF]">
                  <Microscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Surface Analysis
                  </div>
                  <div className="text-[10px] text-[#7D8FA6]">
                    LIVE FEED_001
                  </div>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-[#35D17F]/20 text-[#35D17F] text-[10px] font-bold">
                STABLE
              </div>
            </div>

            <div className="aspect-square rounded-2xl bg-[#07111F] mb-6 overflow-hidden relative border border-white/5">
              {/* Mock Fabric Grid */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(#27C4FF 1px, transparent 1px), linear-gradient(90deg, #27C4FF 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-48 h-48 rounded-full border-[10px] border-[#1D8BFF]/30 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-full h-full border border-dashed border-[#27C4FF]/50 rounded-full"
                  />
                </motion.div>
              </div>

              {/* Floating Data Tags */}
              <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-white">
                WEAVE_PATTERN: 3/1_TWILL
              </div>
              <div className="absolute bottom-4 right-4 p-2 rounded-lg bg-[#1D8BFF] text-[10px] font-bold text-white shadow-lg">
                QUALITY: OPTIMAL
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-[#B8C4D6]">TPI Density</span>
                <span className="text-xs font-bold text-white">82.4</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-[#B8C4D6]">
                  Material Integrity
                </span>
                <span className="text-xs font-bold text-[#19E3C7]">98.2%</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#7568FF]/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1D8BFF]/20 rounded-full blur-[100px]" />
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
