import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Cpu,
  Zap,
  TrendingUp,
  Scan,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useUpload from "@/utils/useUpload";
import AppLayout from "@/components/AppLayout";
import useUser from "@/utils/useUser";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PROCESSING_STEPS = [
  "Uploading image to secure storage",
  "Compressing and preprocessing",
  "Extracting fabric features",
  "Running neural network analysis",
  "Calculating warp thread count",
  "Calculating weft thread count",
  "Identifying fabric type & structure",
  "Generating AI recommendations",
  "Calculating quality metrics",
  "Creating analysis report",
  "Saving to database",
  "Complete!",
];

export default function UploadPage() {
  const { data: user } = useUser();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const [upload] = useUpload();

  const analyzeMutation = useMutation({
    mutationFn: async (imageUrl) => {
      for (let i = 0; i < PROCESSING_STEPS.length - 1; i++) {
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, 200 + Math.random() * 200));
      }
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      if (!r.ok) throw new Error("Analysis failed");
      const data = await r.json();
      setCurrentStep(PROCESSING_STEPS.length - 1);
      return data;
    },
    onSuccess: (data) => setResult(data),
    onError: (err) => {
      setError(err.message);
      setCurrentStep(-1);
    },
  });

  const handleFile = useCallback(
    async (selectedFile) => {
      if (!selectedFile) return;
      const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!allowed.includes(selectedFile.type)) {
        setError("Please upload a PNG, JPEG, or WebP image");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File must be under 10MB");
        return;
      }
      setError(null);
      setResult(null);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCurrentStep(0);

      const { url, error: uploadErr } = await upload({ file: selectedFile });
      if (uploadErr) {
        setError(uploadErr);
        setCurrentStep(-1);
        return;
      }
      analyzeMutation.mutate(url);
    },
    [upload, analyzeMutation],
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };
  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setCurrentStep(-1);
  };

  const isProcessing = analyzeMutation.isPending;
  const isDone = result !== null;

  return (
    <AppLayout activeTab="upload">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
            Upload & Analyze
          </h1>
          <p className="text-[#7D8FA6] text-sm mt-1">
            Upload a fabric image for AI-powered textile analysis
          </p>
        </motion.div>

        {!isDone ? (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Upload Zone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="bg-[#13263D]/60 backdrop-blur-sm border border-white/5 rounded-[24px] p-6">
                <h3 className="font-bold font-space-grotesk text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#27C4FF]" />
                  Select Fabric Image
                </h3>

                {!preview ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                      isDragging
                        ? "border-[#1D8BFF] bg-[#1D8BFF]/10"
                        : "border-white/10 hover:border-[#1D8BFF]/50 hover:bg-white/3"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#1D8BFF]/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-[#1D8BFF]" />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-white font-semibold text-sm">
                        Drop fabric image here
                      </p>
                      <p className="text-[#7D8FA6] text-xs mt-1">
                        PNG, JPEG, WebP • Max 10MB
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-full border border-[#1D8BFF]/40 text-[#27C4FF] text-xs font-semibold">
                      Browse Files
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {!isProcessing && (
                      <button
                        onClick={reset}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-black/60 text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin" />
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/20 flex items-center gap-2 text-[#FF5A6E] text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              {/* Processing Steps */}
              {isProcessing && currentStep >= 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-5"
                >
                  <h3 className="font-bold font-space-grotesk text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#27C4FF]" />
                    AI Processing Pipeline
                  </h3>
                  <div className="space-y-2">
                    {PROCESSING_STEPS.map((step, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 text-xs transition-all ${i <= currentStep ? "opacity-100" : "opacity-30"}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            i < currentStep
                              ? "bg-[#35D17F]"
                              : i === currentStep
                                ? "bg-[#1D8BFF] custom-pulse"
                                : "bg-white/10"
                          }`}
                        >
                          {i < currentStep && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                          {i === currentStep && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span
                          className={
                            i <= currentStep ? "text-white" : "text-[#7D8FA6]"
                          }
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1D8BFF]/20 to-[#19E3C7]/20 border border-white/5 flex items-center justify-center mb-6">
                  <Scan className="w-10 h-10 text-[#27C4FF]" />
                </div>
                <h3 className="text-xl font-bold font-space-grotesk text-white mb-3">
                  AI Textile Analysis
                </h3>
                <p className="text-[#7D8FA6] text-sm max-w-sm mb-8">
                  Upload a clear, high-resolution microscope or macro image of
                  your fabric sample for the most accurate results.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { label: "Warp Count", desc: "Threads per inch" },
                    { label: "Weft Count", desc: "Cross threads" },
                    { label: "Thread Density", desc: "TPI measurement" },
                    { label: "Fabric Type", desc: "AI classification" },
                    { label: "Quality Grade", desc: "A+ to F rating" },
                    { label: "AI Suggestions", desc: "Improvement tips" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-xl bg-white/3 border border-white/5 text-left"
                    >
                      <div className="text-xs font-bold text-white mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#7D8FA6]">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Results */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#35D17F]/10 border border-[#35D17F]/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#35D17F]" />
                <div>
                  <div className="text-white font-bold">Analysis Complete!</div>
                  <div className="text-xs text-[#7D8FA6]">
                    Processed in {result.processingTime}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  Analyze Another
                </button>
                {result.reportId && (
                  <a
                    href={`/reports/${result.reportId}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View Full Report
                  </a>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Image + Key Metrics */}
              <div className="space-y-4">
                {preview && (
                  <div className="rounded-[20px] overflow-hidden border border-white/10">
                    <img
                      src={preview}
                      alt="Analyzed"
                      className="w-full object-cover"
                    />
                  </div>
                )}
                <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5 space-y-3">
                  {[
                    {
                      label: "Fabric Type",
                      value: result.fabricType,
                      color: "#27C4FF",
                    },
                    {
                      label: "Quality Grade",
                      value: result.qualityGrade,
                      color: "#35D17F",
                    },
                    {
                      label: "Weave Pattern",
                      value: result.weavePattern,
                      color: "#7568FF",
                    },
                    {
                      label: "Processing Time",
                      value: result.processingTime,
                      color: "#FFB547",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-[#7D8FA6]">
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Stats */}
              <div className="lg:col-span-2 space-y-4">
                {/* Confidence */}
                <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white">
                      Overall Confidence Score
                    </span>
                    <span className="text-2xl font-bold font-space-grotesk text-[#35D17F]">
                      {(result.confidenceScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidenceScore * 100}%` }}
                      transition={{ duration: 1.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#35D17F]"
                    />
                  </div>
                </div>

                {/* Thread Data */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Warp Count",
                      value: result.warpCount,
                      unit: "threads/in",
                      color: "#1D8BFF",
                    },
                    {
                      label: "Weft Count",
                      value: result.weftCount,
                      unit: "threads/in",
                      color: "#27C4FF",
                    },
                    {
                      label: "Thread Density",
                      value: result.threadDensity,
                      unit: "TPI",
                      color: "#19E3C7",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#13263D]/60 border border-white/5 rounded-[16px] p-4 text-center"
                    >
                      <div
                        className="text-2xl font-bold font-space-grotesk mb-1"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#7D8FA6]">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-[#7D8FA6]">
                        {stat.unit}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detections */}
                <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
                  <h4 className="text-sm font-bold text-white mb-4">
                    Detection Results
                  </h4>
                  <div className="space-y-3">
                    {result.detections.map((det) => (
                      <div key={det.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-[#B8C4D6]">
                            {det.label}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {det.count || det.value}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${det.confidence * 100}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF]"
                          />
                        </div>
                        <div className="text-[10px] text-[#7D8FA6] text-right mt-0.5">
                          {(det.confidence * 100).toFixed(0)}% confidence
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="bg-[#13263D]/60 border border-white/5 rounded-[20px] p-5">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FFB547]" />
                    AI Recommendations
                  </h4>
                  <div className="space-y-2">
                    {result.aiSuggestions.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#B8C4D6]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27C4FF] flex-shrink-0 mt-1.5" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Trend Chart */}
            <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] p-6">
              <h4 className="font-bold font-space-grotesk text-white mb-4">
                Quality Trend Projection
              </h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.historicalTrend}>
                    <defs>
                      <linearGradient
                        id="trendGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#13263D",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="quality"
                      stroke="#1D8BFF"
                      strokeWidth={2.5}
                      fill="url(#trendGrad)"
                      dot={{ fill: "#1D8BFF", r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
