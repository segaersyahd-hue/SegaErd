import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Calendar, 
  MessageCircle, 
  BarChart3, 
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Rocket
} from "lucide-react";
import { User } from "../types";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const navItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "AI Generator", icon: BrainCircuit, path: "/dashboard/ai-generator" },
  { name: "Scheduler", icon: Calendar, path: "/dashboard/scheduler" },
  { name: "WhatsApp", icon: MessageCircle, path: "/dashboard/whatsapp" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Settings", icon: SettingsIcon, path: "/dashboard/settings" },
];

export default function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:static lg:block"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <Rocket size={18} />
                  </div>
                  <span className="font-bold text-xl tracking-tight">UMKM<span className="text-blue-500">Boost</span></span>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                        isActive 
                          ? "bg-blue-50 text-blue-600 shadow-xs" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.icon className={cn("transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-100">
                <div className="p-4 bg-slate-50 rounded-2xl mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Plan</div>
                  <div className="text-xs font-bold text-slate-900">PRO Yearly • Active</div>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Menu size={20} />
              </button>
            )}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <Search size={14} className="text-slate-400" />
              <input type="text" placeholder="Search features..." className="bg-transparent border-none text-xs outline-none w-48 text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 leading-none">{user.name}</div>
                <div className="text-[10px] font-bold text-green-500 uppercase tracking-wider mt-1">Verified</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
