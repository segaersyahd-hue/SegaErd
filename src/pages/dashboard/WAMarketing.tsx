import React, { useState, useEffect } from "react";
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
  Import,
  X,
  Trash2,
  Sparkles
} from "lucide-react";
import { cn } from "../../lib/utils";

interface CampaignItem {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  sent: number;
  opened: number;
  date: string;
}

export default function WAMarketing() {
  const [campaignsList, setCampaignsList] = useState<CampaignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignStatus, setCampaignStatus] = useState<"completed" | "active" | "draft">("draft");
  const [sentCount, setSentCount] = useState("100");
  const [openedCount, setOpenedCount] = useState("75");
  const [savingCampaign, setSavingCampaign] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      if (data.success) {
        setCampaignsList(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName) return;
    setSavingCampaign(true);
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName,
          status: campaignStatus,
          sent: Number(sentCount),
          opened: Number(openedCount)
        })
      });
      const data = await response.json();
      if (data.success) {
        await fetchCampaigns();
        setIsModalOpen(false);
        setCampaignName("");
        setCampaignStatus("draft");
        setSentCount("100");
        setOpenedCount("75");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCampaign(false);
    }
  };

  const handleDeleteCampaign = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        setCampaignsList(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCampaigns = campaignsList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-xl shadow-green-500/10 active:scale-95"
          >
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
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns..." 
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:bg-white transition-all w-48" 
                 />
              </div>
           </div>
           
           <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-slate-400 text-sm">Loading campaigns...</div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">Belum ada kampanye WhatsApp.</div>
              ) : (
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50">
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Campaign Name</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Reach (Sent)</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Engagement</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Date</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none text-right">Aksi</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredCampaigns.map((c) => (
                         <tr key={c.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
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
                            <td className="px-8 py-5 text-right">
                               <button 
                                 onClick={(e) => handleDeleteCampaign(c.id, e)}
                                 className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg group-hover:opacity-100 transition-opacity"
                                 title="Hapus"
                               >
                                  <Trash2 size={14} />
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
              )}
           </div>
           
           <div className="p-6 text-center border-t border-slate-100">
              <button onClick={() => alert("Menampilkan semua data kampanye")} className="text-xs font-bold text-blue-500 hover:text-blue-600">View All Campaigns</button>
           </div>
        </div>
      </div>

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full text-slate-400"
            >
              <X size={18} />
            </button>
            
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-green-500" />
                Buat Kampanye WhatsApp Baru
              </h3>
              <p className="text-slate-500 text-xs mt-1">Buat kampanye promosi langsung untuk interaksi pelanggan.</p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Kampanye</label>
                <input 
                  type="text" 
                  required
                  value={campaignName} 
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Contoh: Promo Ramadhan Es Kopi"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Penerbitan</label>
                <select 
                  value={campaignStatus} 
                  onChange={(e) => setCampaignStatus(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                >
                  <option value="draft">Draf (Draft)</option>
                  <option value="active">Aktif (Active)</option>
                  <option value="completed">Selesai (Completed)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Penerima (Sent)</label>
                  <input 
                    type="number" 
                    required
                    value={sentCount} 
                    onChange={(e) => setSentCount(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dibuka (Opened)</label>
                  <input 
                    type="number" 
                    required
                    value={openedCount} 
                    onChange={(e) => setOpenedCount(e.target.value)}
                    placeholder="e.g. 400"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={savingCampaign}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-all active:scale-[0.98] disabled:opacity-40"
                >
                  {savingCampaign ? "Menyimpan..." : "Buat Kampanye"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
