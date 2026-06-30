import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import BackgroundPatterns from "@/components/BackgroundPatterns";

const FAQS = [
  {
    q: "What types of fabric images work best?",
    a: "High-resolution microscope or macro photos work best. The image should be well-lit, in focus, and show the fabric texture clearly. Images taken at 10x to 40x magnification produce optimal results.",
  },
  {
    q: "How accurate is the AI thread count detection?",
    a: "Our AI achieves 99.8% accuracy on standard woven fabrics (cotton, polyester, linen). Results may vary slightly for novelty fabrics, knits, or non-woven materials.",
  },
  {
    q: "What fabric types can ThreadCounty analyze?",
    a: "We support plain weave, twill (2/2, 3/1, 4/1), satin, basket weave, rib weave, and many more. Knit structures are supported with our Professional and Enterprise plans.",
  },
  {
    q: "Can I analyze non-textile images?",
    a: "The AI is specifically trained for textile analysis. Non-textile images will still process but results may be inaccurate or produce low confidence scores.",
  },
  {
    q: "How long does analysis take?",
    a: "Typical analysis completes in 1-3 seconds for standard images. Batch processing for multiple images on Professional/Enterprise plans runs asynchronously.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All images are encrypted in transit and at rest. We use industry-standard AES-256 encryption. We never share your data with third parties. You can delete your data at any time from Settings.",
  },
  {
    q: "What file formats are supported?",
    a: "We support PNG, JPEG, JPG, and WebP. Maximum file size is 10MB per image. For batch processing, ZIP archives are accepted.",
  },
  {
    q: "Can I export analysis reports?",
    a: "Yes. All plans include PDF export. Professional and Enterprise plans support additional formats including CSV, JSON, and Excel for integration with quality management systems.",
  },
  {
    q: "What does TPI mean?",
    a: "TPI stands for Threads Per Inch. It's the sum of warp threads per inch plus weft threads per inch, and is the standard measure of fabric density in the textile industry.",
  },
  {
    q: "How does the quality grading work?",
    a: "Quality grades (A+ to C) are calculated based on thread density consistency, surface uniformity, weave regularity, and material integrity score. These metrics follow ISO 7211 textile testing standards.",
  },
  {
    q: "Can I compare multiple fabric samples?",
    a: "Yes, on Professional and Enterprise plans you can run side-by-side comparisons of multiple reports. This is useful for QA workflows and supplier comparison.",
  },
  {
    q: "Do you offer an API?",
    a: "Yes. Our REST API is available on Student, Professional, and Enterprise plans. Full documentation, client libraries (Python, Node.js, Java), and webhooks are available in the developer portal.",
  },
  {
    q: "Can ThreadCounty integrate with my ERP system?",
    a: "Enterprise plans include custom integrations with SAP, Oracle, and other major ERP systems. Contact our sales team for a custom integration quote.",
  },
  {
    q: "What is material integrity?",
    a: "Material integrity is our AI's assessment of fabric consistency — it measures thread spacing uniformity, surface defects, weave regularity, and fiber quality on a 0-100% scale.",
  },
  {
    q: "How do I upgrade my plan?",
    a: "Visit the Pricing page and click on your desired plan. Upgrades take effect immediately and you'll be billed pro-rata for the remaining period.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes, Professional plans include a 14-day free trial with full feature access. No credit card required to start.",
  },
  {
    q: "Can multiple team members use one account?",
    a: "Enterprise plans support team collaboration with multiple user seats, role-based access control, and centralized billing.",
  },
  {
    q: "What is the confidence score?",
    a: "The confidence score represents our AI's certainty in the analysis results. Scores above 95% indicate highly reliable results. Lower scores may occur with blurry, poorly lit, or unusual fabric samples.",
  },
  {
    q: "Can I delete my account and data?",
    a: "Yes. Go to Settings > Security and select 'Delete Account'. All your data including uploads, reports, and personal information will be permanently deleted within 30 days.",
  },
  {
    q: "Do you offer educational discounts?",
    a: "Yes, our Student plan is specifically priced for educational use. Institutions can contact us for bulk academic licensing at significantly reduced rates.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter(
    (f) =>
      !search ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

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
            <a href="/contact" className="text-[#7D8FA6] hover:text-white">
              Contact
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

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1D8BFF]/10 border border-[#1D8BFF]/20 mb-6">
            <HelpCircle className="w-7 h-7 text-[#27C4FF]" />
          </div>
          <h1 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#B8C4D6] mb-8">
            Everything you need to know about ThreadCounty AI Textile Analysis
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8FA6]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#13263D]/60 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/50 text-sm"
            />
          </div>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#7D8FA6]">
              No questions match "{search}".{" "}
              <a href="/contact" className="text-[#27C4FF]">
                Contact us
              </a>
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-[#13263D]/60 border border-white/5 rounded-[16px] overflow-hidden hover:border-white/10 transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-white pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#7D8FA6] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center p-8 bg-[#13263D]/60 border border-white/5 rounded-[24px]"
        >
          <h3 className="text-white font-bold font-space-grotesk mb-2">
            Still have questions?
          </h3>
          <p className="text-[#7D8FA6] text-sm mb-4">
            Our team is ready to help you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
