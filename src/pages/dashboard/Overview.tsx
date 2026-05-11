import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  BrainCircuit,
  Zap,
  Layout,
  Plus,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const data = [
  { name: 'Mon', reach: 4000, engagement: 2400 },
  { name: 'Tue', reach: 3000, engagement: 1398 },
  { name: 'Wed', reach: 5000, engagement: 3800 },
  { name: 'Thu', reach: 2780, engagement: 3908 },
  { name: 'Fri', reach: 1890, engagement: 4800 },
  { name: 'Sat', reach: 2390, engagement: 3800 },
  { name: 'Sun', reach: 3490, engagement: 4300 },
];

const stats = [
  { 
    label: "Impressions", 
    value: "142.4K", 
    change: "+12.5%", 
    trend: "up", 
    icon: TrendingUp, 
    color: "blue" 
  },
  { 
    label: "Engagement", 
    value: "28.5K", 
    change: "+24.2%", 
    trend: "up", 
    icon: Users, 
    color: "purple" 
  },
  { 
    label: "Leads Gen", 
    value: "412", 
    change: "-2.1%", 
    trend: "down", 
    icon: MessageCircle, 
    color: "green" 
  },
  { 
    label: "Avg. ROI", 
    value: "4.8x", 
    change: "+5.4%", 
    trend: "up", 
    icon: DollarSign, 
    color: "orange" 
  },
];

const activities = [
  { id: 1, title: "AI Caption generated for 'Promo June'", time: "2 mins ago", type: "ai" },
  { id: 2, title: "WhatsApp Broadcast 'Welcome' sent", time: "1 hour ago", type: "wa" },
  { id: 3, title: "Instagram Post scheduled for tomorrow", time: "4 hours ago", type: "social" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-10 pb-16">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-8">
        <div>
           <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">
              <Layout size={12} />
              Platform Overview
           </div>
           <h1 className="text-4xl font-serif font-medium tracking-tight text-slate-900 mb-2">Welcome back, <span className="italic">Andi!</span></h1>
           <p className="text-sm text-slate-500 font-medium">Monitoring your marketing ecosystem per <span className="text-slate-900 underline decoration-blue-500 underline-offset-4">May 20, 2026</span>.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <RefreshCw size={14} />
             Sync Data
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
             <Plus size={14} />
             Add Widget
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-premium hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-8">
              <div className={cn(
                "p-4 rounded-2xl bg-slate-50 group-hover:shadow-lg transition-all duration-500",
                stat.color === 'blue' && "bg-blue-50 text-blue-600",
                stat.color === 'purple' && "bg-purple-50 text-purple-600",
                stat.color === 'green' && "bg-green-50 text-green-600",
                stat.color === 'orange' && "bg-orange-50 text-orange-600",
              )}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${stat.trend === 'up' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                {stat.change}
              </div>
            </div>
            <div>
               <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-[0.2em] mb-2">{stat.label}</div>
               <div className="text-3xl font-display font-bold text-slate-900 tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-premium relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                 <h3 className="text-2xl font-display font-bold text-slate-900 mb-1">Growth Matrix</h3>
                 <p className="text-sm font-medium text-slate-400">Comparing reach performance against engagement metrics</p>
              </div>
              <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50 self-start">
                 {['Daily', 'Weekly', 'Monthly'].map(t => (
                   <button key={t} className={cn(
                     "px-6 py-2 text-[10px] uppercase font-bold rounded-[1.125rem] transition-all",
                     t === 'Weekly' ? 'bg-white shadow-xl shadow-slate-200/50 text-slate-900' : 'text-slate-400 hover:text-slate-600'
                   )}>{t}</button>
                 ))}
              </div>
            </div>
            
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.08}/>
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      borderRadius: '20px', 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                      padding: '12px 18px',
                      backdropBlur: '4px'
                    }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#chartGradient)" 
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#7c3aed" 
                    strokeWidth={4} 
                    fillOpacity={0} 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-10">
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Organic Reach</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engagement</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="font-bold text-slate-900">Campaign Accuracy</h4>
                   <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                </div>
                <div className="flex items-end justify-between">
                   <div className="space-y-1">
                      <div className="text-3xl font-display font-bold text-slate-900">94.2%</div>
                      <div className="text-[10px] font-bold text-green-500 uppercase">+1.2% this week</div>
                   </div>
                   <div className="w-24 h-12 flex items-end gap-1">
                      {[4, 7, 5, 8, 3, 9, 6].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-100 rounded-full group transition-all" style={{ height: `${h * 10}%` }}>
                           <div className="w-full h-0 group-hover:h-full bg-blue-600 rounded-full transition-all duration-300" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="font-bold text-slate-900">New Followers</h4>
                   <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                </div>
                <div className="flex items-end justify-between">
                   <div className="space-y-1">
                      <div className="text-3xl font-display font-bold text-slate-900">1,204</div>
                      <div className="text-[10px] font-bold text-blue-500 uppercase">Per month average</div>
                   </div>
                   <div className="h-10 w-24 relative overflow-hidden rounded-lg bg-slate-50">
                      <div className="absolute inset-0 bg-blue-500/10" />
                      <div className="absolute inset-y-0 left-0 bg-blue-500/20 w-3/4 rounded-r-lg" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* AI Intelligence Card */}
          <div className="bg-slate-900 p-8 pt-10 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mb-32 group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[60px] -ml-16 -mt-16" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                 <Sparkles size={14} className="text-blue-400" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">AI IQ Assistant</span>
              </div>
              
              <h4 className="text-2xl font-serif italic font-light mb-6 leading-tight">"Tuesday at <span className="text-blue-400 font-bold not-italic underline underline-offset-4 decoration-2">19:00 WIB</span> is your high-intent window."</h4>
              
              <p className="text-sm text-white/50 leading-relaxed mb-10">Kami menganalisis 1.2k interaksi minggu lalu. User Anda paling aktif merespon konten edukasi di jam tersebut.</p>
              
              <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-2xl shadow-blue-500/10">
                 Execute Strategy
                 <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Quick Tasks */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200/60 shadow-premium">
             <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Real-time Feed</h4>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             </div>
             <div className="space-y-6">
                {activities.map((act) => (
                  <div key={act.id} className="flex gap-4 group cursor-pointer">
                     <div className={cn(
                        "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300",
                        act.type === 'ai' ? 'bg-purple-50 text-purple-600' : act.type === 'wa' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                     )}>
                        {act.type === 'ai' ? <BrainCircuit size={18} /> : act.type === 'wa' ? <MessageCircle size={18} /> : <Calendar size={18} />}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">{act.title}</div>
                        <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{act.time}</div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-10 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                View Transaction Log
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
