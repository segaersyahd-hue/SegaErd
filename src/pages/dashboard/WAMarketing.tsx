import { useState } from "react";
import { 
  MessageCircle, 
  Users, 
  Send, 
  History, 
  Settings as SettingsIcon,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Import
} from "lucide-react";
import { cn } from "../../lib/utils";

const campaigns = [
  { id: "1", name: "Promo Coffee Late", status: "completed", sent: 1200, opened: 980, date: "12 Oct 2023" },
  { id: "2", name: "Weekend Special", status: "active", sent: 800, opened: 450, date: "Today" },
  { id: "3", name: "Customer Re-engagement", status: "draft", sent: 0, opened: 0, date: "-" },
];

export default function WAMarketing() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">WhatsApp Marketing</h1>
          <p className="text-slate-500 mt-1">Direct marketing to your customers via WhatsApp Automation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Import size={20} /> Import Contacts
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-xl shadow-green-500/10 active:scale-95">
            <Plus size={20} /> New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 mb-6">Automation Status</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                          <CheckCircle2 size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-slate-900">API Connected</p>
                          <p className="text-[10px] text-slate-500">Device: iPhone 13 Pro</p>
                       </div>
                    </div>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 </div>
                 
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Credit</p>
                       <p className="text-xs font-bold text-slate-900">8,402 / 10,000</p>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="w-[84%] h-full bg-green-500" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: FileText, label: "Templates", color: "blue" },
                   { icon: Users, label: "Segments", color: "purple" },
                   { icon: Clock, label: "History", color: "orange" },
                   { icon: SettingsIcon, label: "Settings", color: "slate" },
                 ].map(item => (
                   <button key={item.label} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all flex flex-col items-center gap-2 group">
                      <item.icon className="text-slate-400 group-hover:text-slate-900 transition-colors" size={20} />
                      <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Campaigns Table */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-xs overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Recent Campaigns</h3>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                 <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:bg-white transition-all w-48" />
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50">
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Campaign Name</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Reach</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Engagement</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Date</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {campaigns.map((c) => (
                       <tr key={c.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="px-8 py-5">
                             <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                          </td>
                          <td className="px-8 py-5">
                             <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold border",
                                c.status === 'active' ? "bg-green-50 border-green-100 text-green-600" : 
                                c.status === 'completed' ? "bg-blue-50 border-blue-100 text-blue-600" :
                                "bg-slate-100 border-slate-200 text-slate-500"
                             )}>
                                {c.status}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{c.sent.toLocaleString()}</td>
                          <td className="px-8 py-5">
                             <div className="text-sm font-medium text-slate-600">
                                {c.sent > 0 ? ((c.opened / c.sent) * 100).toFixed(1) : 0}%
                             </div>
                             <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${c.sent > 0 ? (c.opened / c.sent) * 100 : 0}%` }} />
                             </div>
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-400 font-medium">{c.date}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-6 text-center border-t border-slate-100">
              <button className="text-xs font-bold text-blue-500 hover:text-blue-600">View All Campaigns</button>
           </div>
        </div>
      </div>
    </div>
  );
}
