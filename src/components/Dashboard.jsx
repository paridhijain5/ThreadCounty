import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  Cpu,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Clock,
  FileText,
  Scan,
  Maximize2,
  Trash2,
  Loader2,
  History,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUpload from "@/utils/useUpload";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [upload] = useUpload();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (imageUrl) => {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      if (!response.ok) throw new Error("Analysis failed");
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
  });

  const handleFileUpload = useCallback(
    async (e) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      setFile(URL.createObjectURL(selectedFile));
      setUploadProgress(10);

      try {
        const { url, error } = await upload({
          url: URL.createObjectURL(selectedFile),
        });
        if (error) throw new Error(error);

        setUploadProgress(100);
        analyzeMutation.mutate(url);
      } catch (err) {
        console.error(err);
        setUploadProgress(0);
      }
    },
    [upload, analyzeMutation],
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileUpload({ target: { files: [droppedFile] } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Upload & Control */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-[24px]"
          >
            <h2 className="text-xl font-bold font-space-grotesk mb-6 flex items-center gap-2">
              <Scan className="w-5 h-5 text-[#27C4FF]" />
              Analysis Input
            </h2>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative aspect-square rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden ${
                isDragging
                  ? "border-[#1D8BFF] bg-[#1D8BFF]/10"
                  : "border-white/10 hover:border-[#1D8BFF]/50 hover:bg-white/5"
              }`}
            >
              {file ? (
                <div className="absolute inset-0">
                  <img
                    src={file}
                    alt="Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setFile(null)}
                      className="p-3 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-[#13263D] border border-white/5 text-[#7D8FA6] group-hover:text-[#27C4FF] group-hover:scale-110 transition-all">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="text-center px-6">
                    <p className="text-sm font-semibold text-white">
                      Upload Fabric Image
                    </p>
                    <p className="text-xs text-[#7D8FA6] mt-1">
                      Drag and drop or click to browse
                    </p>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </>
              )}
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#B8C4D6]">Uploading...</span>
                  <span className="text-white font-bold">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF]"
                  />
                </div>
              </div>
            )}

            {analyzeMutation.isPending && (
              <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-[#1D8BFF]/10 border border-[#1D8BFF]/20">
                <Loader2 className="w-5 h-5 text-[#27C4FF] custom-spin" />
                <span className="text-sm text-[#27C4FF] font-medium tracking-wide">
                  AI Processing In Progress...
                </span>
              </div>
            )}
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-[24px]"
          >
            <h3 className="text-sm font-bold font-space-grotesk mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-[#7568FF]" />
              Recent Analysis
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden">
                    <div className="w-full h-full bg-[#13263D] custom-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      Sample_Batch_0{i}.png
                    </div>
                    <div className="text-[10px] text-[#7D8FA6]">
                      June 29, 2026 • 17:2{i}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-[#35D17F]">
                    99.{i}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Results & Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {!analysisResult ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] glass-card rounded-[32px] flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-white/5 bg-transparent"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 text-[#7D8FA6]">
                  <BarChart3 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-space-grotesk text-white mb-4">
                  Awaiting Input Data
                </h3>
                <p className="text-[#7D8FA6] max-w-sm">
                  Upload a textile sample image to begin high-precision AI
                  analysis and quality reporting.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Fabric Type",
                      value: analysisResult.fabricType,
                      icon: FileText,
                      color: "#1D8BFF",
                    },
                    {
                      label: "Warp Count",
                      value: analysisResult.warpCount,
                      icon: Scan,
                      color: "#27C4FF",
                    },
                    {
                      label: "Weft Count",
                      value: analysisResult.weftCount,
                      icon: Maximize2,
                      color: "#19E3C7",
                    },
                    {
                      label: "Density (TPI)",
                      value: analysisResult.threadDensity,
                      icon: TrendingUp,
                      color: "#7568FF",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="glass-card p-4 rounded-2xl border-l-4"
                      style={{ borderColor: stat.color }}
                    >
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#7D8FA6] mb-2">
                        <stat.icon className="w-3 h-3" />
                        {stat.label}
                      </div>
                      <div className="text-xl font-bold font-space-grotesk text-white">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Results Card */}
                <div className="glass-card rounded-[32px] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold text-[#7D8FA6] uppercase tracking-widest mb-1">
                        Confidence Score
                      </div>
                      <div className="text-4xl font-bold font-space-grotesk text-[#35D17F]">
                        {(analysisResult.confidenceScore * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-space-grotesk mb-8 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-[#1D8BFF]" />
                    Quality Trend Analysis
                  </h3>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analysisResult.historicalTrend}>
                        <defs>
                          <linearGradient
                            id="colorQuality"
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
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#7D8FA6"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#13263D",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            color: "#fff",
                          }}
                          itemStyle={{ color: "#27C4FF" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="quality"
                          stroke="#1D8BFF"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorQuality)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {analysisResult.detections.map((det, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-[#B8C4D6]">
                            {det.label}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-[#35D17F]" />
                        </div>
                        <div className="text-lg font-bold text-white mb-3">
                          {det.count || det.value}
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${det.confidence * 100}%` }}
                            className="h-full bg-[#1D8BFF]"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] mt-1 text-[#7D8FA6]">
                          <span>Confidence</span>
                          <span>{(det.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-4">
                  <button className="px-6 py-3 rounded-xl border border-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors">
                    <FileText className="w-4 h-4" />
                    Export PDF Report
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Analysis
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
