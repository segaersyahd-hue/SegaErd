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
  Rocket,
  ChevronRight,
  Sparkles,
  Command
} from "lucide-react";
import { User } from "../types";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (updatedUser: User) => void;
}

const navItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard", color: "text-blue-500" },
  { name: "AI Generator", icon: BrainCircuit, path: "/dashboard/ai-generator", color: "text-purple-500" },
  { name: "Scheduler", icon: Calendar, path: "/dashboard/scheduler", color: "text-indigo-500" },
  { name: "WhatsApp", icon: MessageCircle, path: "/dashboard/whatsapp", color: "text-green-500" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics", color: "text-orange-500" },
  { name: "Settings", icon: SettingsIcon, path: "/dashboard/settings", color: "text-slate-500" },
];

export default function DashboardLayout({ user, onLogout, onUpdateUser }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 0,
          opacity: isSidebarOpen ? 1 : 0
        }}
        className={cn(
          "relative z-50 h-full bg-white border-r border-slate-200/60 transition-all duration-300 ease-in-out lg:block overflow-hidden hidden",
          !isSidebarOpen && "lg:hidden"
        )}
      >
        <div className="flex flex-col h-full w-[280px]">
          <div className="flex items-center justify-between h-20 px-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 rotate-3">
                <Rocket size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 group">
                UMKM<span className="text-blue-600">Boost</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
            <div>
              <div className="px-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Platform</div>
              <nav className="space-y-1">
                {navItems.slice(0, 5).map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all group",
                        isActive 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("transition-colors", isActive ? "text-blue-400" : cn("text-slate-400 group-hover:", item.color))} size={18} />
                        {item.name}
                      </div>
                      {isActive && <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Configuration</div>
              <nav className="space-y-1">
                {navItems.slice(5).map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all group",
                        isActive 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("transition-colors", isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-900")} size={18} />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100">
            <div className={cn(
              "relative p-5 rounded-[2rem] mb-6 overflow-hidden group border transition-all duration-300",
              user.tier === "Starter" && "bg-slate-50 border-slate-200 text-slate-800",
              user.tier === "Pro" && "bg-linear-to-br from-blue-600 to-indigo-700 text-white border-transparent shadow-lg shadow-blue-500/10",
              user.tier === "Enterprise" && "bg-linear-to-br from-purple-800 to-indigo-900 text-white border-transparent shadow-lg shadow-purple-500/10"
            )}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px]",
                    user.tier === "Starter" ? "bg-slate-200 text-slate-700" : "bg-white/20 text-white"
                  )}>
                    <Sparkles size={12} fill="currentColor" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    user.tier === "Starter" ? "text-slate-500" : "text-white/70"
                  )}>{user.tier || "Pro"} Plan</span>
                </div>
                <div className={cn("text-xs font-bold mb-1", user.tier === "Starter" ? "text-slate-900" : "text-white")}>
                  {user.tier === "Starter" ? "Starter Tier" : user.tier === "Pro" ? "Pro Automation" : "Enterprise Suite"}
                </div>
                <div className={cn("text-[10px] font-medium opacity-80", user.tier === "Starter" ? "text-slate-500" : "text-white/65")}>
                  {user.tier === "Starter" ? "10 drafts limit" : user.tier === "Pro" ? "1k WA, Unlimited drafts" : "Unlimited Access Active"}
                </div>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-[1.25rem] text-sm font-bold text-red-500 border border-transparent hover:border-red-100 hover:bg-red-50/50 transition-all active:scale-95"
            >
              <LogOut size={18} />
              Logout Platform
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
            >
              {isSidebarOpen ? <Command size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="hidden lg:flex items-center gap-3 breadcrumbs">
               <div className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">Dashboard</div>
               <ChevronRight size={12} className="text-slate-300" />
               <div className="text-[10px] font-bold text-slate-900 capitalize tracking-widest">
                  {location.pathname.split("/").pop() || "Overview"}
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/60 group focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/5 transition-all">
              <Search size={16} className="text-slate-400 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search commands (⌘+K)" 
                className="bg-transparent border-none text-xs font-semibold outline-none w-48 text-slate-600 placeholder:text-slate-400" 
              />
            </div>

            <div className="flex items-center gap-4">
               <button className="relative p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white ring-4 ring-blue-500/10" />
               </button>
               
               <div className="h-8 w-px bg-slate-100" />

               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</div>
                    <div className={cn(
                      "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px]",
                      user.tier === "Starter" ? "bg-slate-100 border-slate-200 text-slate-700" :
                      user.tier === "Pro" ? "bg-blue-50 border-blue-100 text-blue-600" :
                      "bg-purple-50 border-purple-100 text-purple-600"
                    )}>
                       <div className={cn(
                         "w-1 h-1 rounded-full animate-pulse",
                         user.tier === "Starter" ? "bg-slate-400" :
                         user.tier === "Pro" ? "bg-blue-500" :
                         "bg-purple-500"
                       )} />
                       <span className="font-bold uppercase tracking-tighter">{user.tier || "Pro"} Plan</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-xl shadow-blue-500/20 rotate-1 flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin scrollbar-thumb-slate-200">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-7xl mx-auto"
          >
            <Outlet context={{ user, onUpdateUser }} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
