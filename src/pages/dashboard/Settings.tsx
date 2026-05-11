import { useState } from "react";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Check,
  ChevronRight,
  Camera
} from "lucide-react";
import { cn } from "../../lib/utils";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         {/* Sidebar Tabs */}
         <div className="w-full md:w-64 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-xs overflow-hidden">
            {activeTab === "profile" && (
              <div className="p-8 space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="relative">
                       <div className="w-24 h-24 rounded-[2rem] bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                          A
                       </div>
                       <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-500 transition-all">
                          <Camera size={16} />
                       </button>
                    </div>
                    <div>
                       <h3 className="font-bold text-xl text-slate-900">Andi Pratama</h3>
                       <p className="text-slate-500 text-sm">Owner of Kedai Kopi Modern</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                       <input type="text" defaultValue="Kedai Kopi Modern" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                       <input type="email" defaultValue="andi@kopimodern.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                       <input type="text" defaultValue="+62 812-3456-7890" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Country / Region</label>
                       <div className="relative">
                          <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm appearance-none">
                             <option>Indonesia</option>
                             <option>Singapore</option>
                             <option>Malaysia</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" size={16} />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-50 flex justify-end gap-3">
                    <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                    <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/10 active:scale-95 transition-all">Save Changes</button>
                 </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="p-8 space-y-10">
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl shadow-blue-500/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest mb-4">
                          Current Tier
                       </div>
                       <h4 className="text-3xl font-display font-bold mb-1">PRO Membership</h4>
                       <p className="text-blue-100 text-sm font-medium">Your next billing cycle is on June 12, 2026.</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-end">
                       <div className="text-3xl font-display font-bold mb-1">Rp 199k<span className="text-sm font-normal opacity-60">/bln</span></div>
                       <button className="px-6 py-3 bg-white text-blue-600 rounded-2xl text-xs font-bold hover:bg-blue-50 transition-all shadow-xl shadow-white/10">Manage Subscription</button>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Tier Comparison</h4>
                       <span className="text-[10px] font-bold text-blue-500 uppercase cursor-pointer hover:underline">Compare all features</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {[
                         { name: 'Starter', price: '0', active: false },
                         { name: 'Pro', price: '199k', active: true },
                         { name: 'Enterprise', price: '499k', active: false }
                       ].map((plan) => (
                         <div key={plan.name} className={cn(
                           "p-6 rounded-[2rem] border transition-all relative overflow-hidden",
                           plan.active 
                             ? "border-blue-500 bg-blue-50/30" 
                             : "border-slate-100 bg-white hover:border-slate-300"
                         )}>
                            {plan.active && (
                               <div className="absolute top-2 right-2 p-1.5 bg-blue-500 text-white rounded-full">
                                  <Check size={10} strokeWidth={4} />
                               </div>
                            )}
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{plan.name}</div>
                            <div className="text-xl font-display font-bold text-slate-900 mb-4">Rp {plan.price}</div>
                            <button className={cn(
                              "w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                              plan.active 
                                ? "bg-blue-600 text-white" 
                                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                            )}>
                               {plan.active ? "Current Plan" : "Switch Tier"}
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Active Payment Method</h4>
                    <div className="group p-6 border border-slate-100 hover:border-blue-200 rounded-[2rem] flex items-center justify-between bg-white transition-all">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 italic text-[10px]">VISA</div>
                          <div>
                             <p className="text-sm font-bold text-slate-900 italic font-serif leading-none mb-1">•••• •••• •••• 4242</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Expires 12/2026 • Verified Partner</p>
                          </div>
                       </div>
                       <button className="text-[10px] font-bold text-slate-300 hover:text-blue-500 uppercase tracking-widest">Update</button>
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
