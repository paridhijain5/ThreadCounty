import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Eye, EyeOff, LogIn } from "lucide-react";
import useAuth from "@/utils/useAuth";
import BackgroundPatterns from "@/components/BackgroundPatterns";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07111F] flex items-center justify-center overflow-hidden">
      <BackgroundPatterns />
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-space-grotesk text-white">
              ThreadCounty
            </span>
          </div>

          <div className="bg-[#13263D]/60 backdrop-blur-xl border border-white/8 rounded-[28px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold font-space-grotesk text-white mb-1">
              Welcome back
            </h2>
            <p className="text-[#7D8FA6] text-sm mb-8">
              Sign in to your ThreadCounty account
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-[#B8C4D6] uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-[#27C4FF] hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full custom-spin" />
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#7D8FA6] mt-6">
              Don't have an account?{" "}
              <a
                href="/account/signup"
                className="text-[#27C4FF] hover:text-white font-semibold transition-colors"
              >
                Create one free
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
