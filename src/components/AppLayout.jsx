import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Clock,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cpu,
  BarChart3,
  HelpCircle,
  Mail,
  Info,
  DollarSign,
  Shield,
  Menu,
  X,
  Home,
  Zap,
} from "lucide-react";
import useUser from "@/utils/useUser";
import BackgroundPatterns from "@/components/BackgroundPatterns";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { id: "upload", label: "Upload & Analyze", icon: Upload, href: "/upload" },
  { id: "history", label: "History", icon: Clock, href: "/history" },
  { id: "reports", label: "Reports", icon: FileText, href: "/reports" },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
];

const bottomNavItems = [
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "pricing", label: "Pricing", icon: DollarSign, href: "/pricing" },
  { id: "admin", label: "Admin", icon: Shield, href: "/admin" },
];

export default function AppLayout({ children, activeTab }) {
  const { data: user, loading } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/api/notifications")
        .then((r) => r.json())
        .then((d) => setNotifications(d.unreadCount || 0))
        .catch(() => {});
    }
  }, [user]);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <Cpu className="text-white w-5 h-5" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B8C4D6]">
              ThreadCounty
            </span>
          )}
        </a>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-bold text-[#7D8FA6] uppercase tracking-widest px-3 py-2">
            Main
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-gradient-to-r from-[#1D8BFF]/20 to-[#27C4FF]/10 text-white border border-[#1D8BFF]/30"
                  : "text-[#7D8FA6] hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#1D8BFF] to-[#27C4FF] rounded-r-full" />
              )}
              <div
                className={`relative flex-shrink-0 ${isActive ? "text-[#27C4FF]" : "group-hover:text-[#27C4FF]"}`}
              >
                <Icon className="w-5 h-5" />
                {item.id === "notifications" && notifications > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF5A6E] rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </a>
          );
        })}

        {!collapsed && (
          <p className="text-[10px] font-bold text-[#7D8FA6] uppercase tracking-widest px-3 py-2 mt-4">
            More
          </p>
        )}
        <a
          href="/about"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[#7D8FA6] hover:text-white hover:bg-white/5 ${currentPath === "/about" ? "text-white bg-white/5" : ""}`}
        >
          <Info className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">About</span>}
        </a>
        <a
          href="/faq"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[#7D8FA6] hover:text-white hover:bg-white/5 ${currentPath === "/faq" ? "text-white bg-white/5" : ""}`}
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">FAQ</span>}
        </a>
        <a
          href="/contact"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[#7D8FA6] hover:text-white hover:bg-white/5 ${currentPath === "/contact" ? "text-white bg-white/5" : ""}`}
        >
          <Mail className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Contact</span>}
        </a>
      </nav>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-white/10"
                  : "text-[#7D8FA6] hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </a>
          );
        })}

        {/* User */}
        <div className="pt-2 border-t border-white/5 mt-2">
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name
                  ? user.name[0].toUpperCase()
                  : user.email?.[0]?.toUpperCase() || "U"}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {user.name || "User"}
                  </div>
                  <div className="text-[10px] text-[#7D8FA6] truncate">
                    {user.email}
                  </div>
                </div>
              )}
              {!collapsed && (
                <a
                  href="/account/logout"
                  className="text-[#7D8FA6] hover:text-[#FF5A6E] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            !collapsed && (
              <div className="flex gap-2 px-1">
                <a
                  href="/account/signin"
                  className="flex-1 py-2 text-center text-xs font-semibold text-[#27C4FF] border border-[#27C4FF]/30 rounded-lg hover:bg-[#27C4FF]/10 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="flex-1 py-2 text-center text-xs font-semibold text-white bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex bg-[#07111F] text-[#F5F7FA]">
      <BackgroundPatterns />

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-[#0C1A2B]/95 backdrop-blur-xl border-r border-white/5 overflow-hidden"
      >
        <SidebarContent />

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-[#13263D] border border-white/10 flex items-center justify-center text-[#7D8FA6] hover:text-white hover:border-[#1D8BFF]/50 transition-all shadow-lg z-10"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 w-60 z-50 bg-[#0C1A2B]/98 backdrop-blur-xl border-r border-white/5 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-[#7D8FA6] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isDesktop ? (collapsed ? 72 : 240) : 0 }}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#07111F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-[#7D8FA6] hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <a
                  href="/"
                  className="text-[#7D8FA6] hover:text-white flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </a>
                {activeTab && (
                  <>
                    <span className="text-[#7D8FA6]">/</span>
                    <span className="text-white capitalize">{activeTab}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/upload"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1D8BFF] to-[#27C4FF] text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
              >
                <Zap className="w-4 h-4" />
                New Analysis
              </a>
              <a
                href="/notifications"
                className="relative p-2 text-[#7D8FA6] hover:text-white transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF5A6E] rounded-full border-2 border-[#07111F]" />
                )}
              </a>
              {user && (
                <a
                  href="/profile"
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D8BFF] to-[#19E3C7] flex items-center justify-center text-white text-xs font-bold"
                >
                  {user.name
                    ? user.name[0].toUpperCase()
                    : user.email?.[0]?.toUpperCase() || "U"}
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 relative z-10"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
