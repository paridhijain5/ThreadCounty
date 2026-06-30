import { useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, LogOut } from "lucide-react";
import useAuth from "@/utils/useAuth";
import BackgroundPatterns from "@/components/BackgroundPatterns";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07111F] flex items-center justify-center">
      <BackgroundPatterns />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center mx-auto mb-6">
          <LogOut className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-space-grotesk text-white mb-2">
          Signing Out...
        </h1>
        <p className="text-[#7D8FA6]">You will be redirected shortly.</p>
      </motion.div>
    </div>
  );
}
