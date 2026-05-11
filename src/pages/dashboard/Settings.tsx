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
              <div className="p-8 space-y-8">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">Current Plan</p>
                       <h4 className="text-2xl font-bold text-slate-900 mt-1">PRO Annual Plan</h4>
                       <p className="text-sm text-slate-500 mt-1">Next payment: $149.00 on Oct 24, 2026</p>
                    </div>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm">Manage Plan</button>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-bold text-slate-900">Payment Methods</h4>
                    <div className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                             <p className="text-xs text-slate-400">Expires 12/26</p>
                          </div>
                       </div>
                       <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">Default</span>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-50">
                    <h4 className="font-bold text-slate-900 mb-4">Billing History</h4>
                    <div className="space-y-4">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex items-center justify-between text-sm py-2">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center"><CreditCard size={14} className="text-slate-400" /></div>
                               <span className="font-medium text-slate-600">Inv-202{i}-042</span>
                            </div>
                            <span className="text-slate-400">Oct 24, 202{3-i}</span>
                            <span className="font-bold text-slate-900">$149.00</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
