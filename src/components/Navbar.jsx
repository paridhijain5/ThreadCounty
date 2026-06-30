import React from "react";
import { motion } from "motion/react";
import {
  LayoutGrid,
  Cpu,
  LineChart,
  Settings,
  Search,
  Bell,
} from "lucide-react";

export default function Navbar({ onTabChange, activeTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "analysis", label: "AI Analysis", icon: Cpu },
    { id: "insights", label: "Insights", icon: LineChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-space-grotesk tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B8C4D6]">
            ThreadCounty
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[#13263D]/40 backdrop-blur-xl border border-white/5 rounded-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group ${
                  isActive ? "text-white" : "text-[#7D8FA6] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] rounded-full shadow-lg shadow-blue-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon
                  className={`w-4 h-4 relative z-10 transition-colors ${isActive ? "text-white" : "group-hover:text-[#27C4FF]"}`}
                />
                <span className="relative z-10 font-medium text-sm">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#7D8FA6] hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <div className="relative p-2 text-[#7D8FA6] hover:text-white transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF5A6E] rounded-full border border-[#07111F]" />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 bg-gradient-to-br from-[#1D8BFF]/20 to-transparent">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=industrial"
              alt="Avatar"
              className="w-full h-full rounded-full bg-[#13263D]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
