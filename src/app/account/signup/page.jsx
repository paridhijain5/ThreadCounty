import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Eye, EyeOff, Zap, CheckCircle2 } from "lucide-react";
import useAuth from "@/utils/useAuth";
import BackgroundPatterns from "@/components/BackgroundPatterns";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError("This email may already be registered. Try signing in.");
      setLoading(false);
    }
  };

  const features = [
    "AI Textile Analysis",
    "Unlimited Reports",
    "Export & Share",
    "Priority Support",
  ];

  return (
    <div className="relative min-h-screen bg-[#07111F] flex items-center justify-center overflow-hidden">
      <BackgroundPatterns />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-space-grotesk text-white">
              ThreadCounty
            </span>
          </div>
          <h1 className="text-4xl font-bold font-space-grotesk text-white mb-4">
            Start Your Free <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D8BFF] to-[#19E3C7]">
              AI Analysis
            </span>
          </h1>
          <p className="text-[#B8C4D6] mb-8">
            Join thousands of textile professionals using ThreadCounty for
            precision fabric analysis.
          </p>
          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#35D17F] flex-shrink-0" />
                <span className="text-[#B8C4D6] text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-[#13263D]/60 backdrop-blur-xl border border-white/8 rounded-[28px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold font-space-grotesk text-white mb-2">
              Create Account
            </h2>
            <p className="text-[#7D8FA6] text-sm mb-8">
              Free forever. No credit card required.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/60 focus:ring-1 focus:ring-[#1D8BFF]/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/60 focus:ring-1 focus:ring-[#1D8BFF]/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#07111F]/80 border border-white/10 text-white placeholder-[#7D8FA6] focus:outline-none focus:border-[#1D8BFF]/60 focus:ring-1 focus:ring-[#1D8BFF]/30 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D8FA6] hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/20 text-[#FF5A6E] text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Create Free Account
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#7D8FA6] mt-6">
              Already have an account?{" "}
              <a
                href="/account/signin"
                className="text-[#27C4FF] hover:text-white font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
