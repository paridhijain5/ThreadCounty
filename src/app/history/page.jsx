import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Search,
  Trash2,
  Eye,
  Download,
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/AppLayout";

const STATUS_COLORS = {
  completed: "#35D17F",
  processing: "#FFB547",
  failed: "#FF5A6E",
};
const GRADE_COLORS = {
  "A+": "#35D17F",
  A: "#35D17F",
  "A-": "#27C4FF",
  "B+": "#27C4FF",
  B: "#1D8BFF",
  "B-": "#7568FF",
};

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["uploads", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
      });
      const r = await fetch(`/api/uploads?${params}`);
      if (!r.ok) throw new Error("Failed to fetch");
      return r.json();
    },
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const r = await fetch(`/api/uploads/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploads"] });
      setConfirmDelete(null);
    },
  });

  const uploads = data?.uploads || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <AppLayout activeTab="history">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-white">
              Analysis History
            </h1>
            <p className="text-[#7D8FA6] text-sm mt-1">
              {total} total analyses
            </p>
          </div>
          <a
            href="/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
          >
            + New Analysis
          </a>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8FA6]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by filename..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#13263D]/60 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#13263D]/60 border border-white/5 rounded-[24px] overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-[#1D8BFF]/30 border-t-[#1D8BFF] rounded-full custom-spin mx-auto mb-3" />
              <p className="text-[#7D8FA6] text-sm">Loading history...</p>
            </div>
          ) : uploads.length === 0 ? (
            <div className="p-16 text-center">
              <Clock className="w-12 h-12 text-[#7D8FA6] mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">
                {search ? "No results found" : "No analyses yet"}
              </h3>
              <p className="text-[#7D8FA6] text-sm mb-6">
                {search
                  ? "Try a different search term"
                  : "Upload your first fabric image to get started"}
              </p>
              {!search && (
                <a
                  href="/upload"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold"
                >
                  Start Analyzing
                </a>
              )}
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-[#7D8FA6] uppercase tracking-wider">
                <div className="col-span-1">Image</div>
                <div className="col-span-3">Filename</div>
                <div className="col-span-2">Fabric Type</div>
                <div className="col-span-2">Confidence</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Grade</div>
                <div className="col-span-1">Actions</div>
              </div>

              <div className="divide-y divide-white/5">
                {uploads.map((u, i) => (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/3 transition-all items-center"
                  >
                    <div className="md:col-span-1">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#07111F] border border-white/5 flex-shrink-0">
                        {u.image_url ? (
                          <img
                            src={u.image_url}
                            alt={u.filename}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-[#7D8FA6]" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="text-sm font-medium text-white truncate">
                        {u.filename}
                      </div>
                      <div className="text-xs text-[#7D8FA6] md:hidden mt-0.5">
                        {new Date(u.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-xs text-[#B8C4D6]">
                        {u.fabric_type || "—"}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      {u.confidence_score ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#1D8BFF] to-[#35D17F] rounded-full"
                                style={{
                                  width: `${u.confidence_score * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-bold text-[#35D17F]">
                              {(u.confidence_score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[#7D8FA6]">—</span>
                      )}
                    </div>
                    <div className="md:col-span-2 hidden md:block">
                      <span className="text-xs text-[#7D8FA6]">
                        {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="md:col-span-1">
                      {u.quality_grade ? (
                        <span
                          className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold"
                          style={{
                            color: GRADE_COLORS[u.quality_grade] || "#7D8FA6",
                            backgroundColor: `${GRADE_COLORS[u.quality_grade] || "#7D8FA6"}15`,
                          }}
                        >
                          {u.quality_grade}
                        </span>
                      ) : (
                        <span className="text-xs text-[#7D8FA6]">—</span>
                      )}
                    </div>
                    <div className="md:col-span-1 flex items-center gap-1">
                      {u.report_id && (
                        <a
                          href={`/reports/${u.report_id}`}
                          className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#27C4FF] hover:bg-[#1D8BFF]/10 transition-all"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => setConfirmDelete(u.id)}
                        className="p-1.5 rounded-lg text-[#7D8FA6] hover:text-[#FF5A6E] hover:bg-[#FF5A6E]/10 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7D8FA6]">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-white/10 text-[#7D8FA6] hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-white/10 text-[#7D8FA6] hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#13263D] border border-white/10 rounded-[24px] p-8 max-w-sm mx-4 text-center shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF5A6E]/10 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-[#FF5A6E]" />
                </div>
                <h3 className="text-white font-bold font-space-grotesk text-lg mb-2">
                  Delete Analysis
                </h3>
                <p className="text-[#7D8FA6] text-sm mb-6">
                  This will permanently delete this upload and its report. This
                  action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(confirmDelete)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 py-3 rounded-xl bg-[#FF5A6E] text-white font-semibold hover:bg-[#FF5A6E]/80 transition-colors text-sm disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
