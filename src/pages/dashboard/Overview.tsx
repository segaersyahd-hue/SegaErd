import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  BrainCircuit,
  Zap
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
  Bar
} from 'recharts';
import { motion } from "motion/react";

const data = [
  { name: 'Mon', reach: 4000, engagement: 2400 },
  { name: 'Tue', reach: 3000, engagement: 1398 },
  { name: 'Wed', reach: 2000, engagement: 9800 },
  { name: 'Thu', reach: 2780, engagement: 3908 },
  { name: 'Fri', reach: 1890, engagement: 4800 },
  { name: 'Sat', reach: 2390, engagement: 3800 },
  { name: 'Sun', reach: 3490, engagement: 4300 },
];

const stats = [
  { 
    label: "Total Reach", 
    value: "142,402", 
    change: "+12.5%", 
    trend: "up", 
    icon: TrendingUp, 
    color: "blue" 
  },
  { 
    label: "Total Engagement", 
    value: "28,501", 
    change: "+24.2%", 
    trend: "up", 
    icon: Users, 
    color: "purple" 
  },
  { 
    label: "WA Leads", 
    value: "412", 
    change: "-2.1%", 
    trend: "down", 
    icon: MessageCircle, 
    color: "green" 
  },
  { 
    label: "Marketing ROI", 
    value: "4.8x", 
    change: "+5.4%", 
    trend: "up", 
    icon: DollarSign, 
    color: "orange" 
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Hello Andi, here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">+5 team members</span>
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
            className="group p-6 bg-white rounded-[2rem] border border-slate-200 shadow-xs hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-blue-50 transition-colors`}>
                <stat.icon className={`text-slate-400 group-hover:text-blue-500 transition-colors`} size={20} />
              </div>
              <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={16} /></button>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-display font-bold text-slate-900">{stat.value}</div>
              <div className={`flex items-center text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="font-bold text-slate-900">Growth Analytics</h3>
                <p className="text-xs text-slate-500">Reach vs Engagement of your campaign</p>
             </div>
             <div className="flex bg-slate-50 p-1 rounded-xl">
                {['7D', '30D', '90D'].map(t => (
                  <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${t === '7D' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'}`}>{t}</button>
                ))}
             </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
           {/* AI Prompt Card */}
           <div className="bg-linear-to-br from-blue-600 to-purple-600 p-8 rounded-[2rem] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <BrainCircuit size={20} />
                 </div>
                 <h4 className="text-xl font-display font-bold mb-3">AI Marketing Insight</h4>
                 <p className="text-sm text-white/80 leading-relaxed mb-6">"Based on last week's data, Tuesday at 7 PM is your golden hour for conversions. Try to schedule a high-intent post then."</p>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                    Action this Insight <Zap size={16} className="text-orange-500 fill-orange-500" />
                 </button>
              </div>
           </div>

           {/* Quick Conversion Card */}
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="font-bold text-slate-900 text-sm">Conversion Rate</h4>
                 <div className="text-xs font-bold text-green-500">+4.2%</div>
              </div>
              <div className="h-[120px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.slice(2)}>
                       <Bar dataKey="reach" fill="#f1f5f9" radius={[4, 4, 4, 4]} />
                       <Bar dataKey="engagement" fill="#3b82f6" radius={[4, 4, 4, 4]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400">Target: 5%</span>
                 <span className="text-xs font-bold text-blue-500">Current: 4.8%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
