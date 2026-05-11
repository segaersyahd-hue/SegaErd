import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Users, 
  Target, 
  MousePointer2 
} from "lucide-react";

const engagementData = [
  { name: 'Mon', likes: 400, comments: 240, shares: 100 },
  { name: 'Tue', likes: 300, comments: 139, shares: 80 },
  { name: 'Wed', likes: 600, comments: 980, shares: 300 },
  { name: 'Thu', likes: 278, comments: 390, shares: 150 },
  { name: 'Fri', likes: 189, comments: 480, shares: 200 },
  { name: 'Sat', likes: 239, comments: 380, shares: 250 },
  { name: 'Sun', likes: 349, comments: 430, shares: 310 },
];

const platformData = [
  { name: 'Instagram', value: 45 },
  { name: 'Facebook', value: 25 },
  { name: 'TikTok', value: 30 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4'];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Analytics Insights</h1>
          <p className="text-slate-500 mt-1">Deep dive into your audience and campaign performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 text-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Conversion Rate", value: "3.2%", icon: Target, color: "blue" },
           { label: "Avg. Engagement", value: "8.4%", icon: Users, color: "purple" },
           { label: "Total Clicks", value: "12,842", icon: MousePointer2, color: "orange" },
           { label: "ROI", value: "342%", icon: TrendingUp, color: "green" },
         ].map(item => (
           <div key={item.label} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xs">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 rounded-2xl bg-slate-50">
                    <item.icon size={20} className="text-slate-400" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{item.value}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Engagement Trend */}
         <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-8">Engagement Trend</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="likes" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                     <Line type="monotone" dataKey="comments" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                     <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Platform Distribution */}
         <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-8">Platform Traffic</h3>
            <div className="h-[300px] flex items-center justify-center">
               <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={platformData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-1/2 space-y-4">
                  {platformData.map((item, idx) => (
                     <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                           <span className="text-sm font-bold text-slate-900">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-400">{item.value}%</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
