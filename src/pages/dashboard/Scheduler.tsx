import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Instagram, 
  Facebook, 
  MoreVertical,
  Clock,
  Image as ImageIcon,
  Trash2,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "../../lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Post {
  id: string;
  platform: string;
  time: string;
  title: string;
  date: number;
  content?: string;
}

export default function Scheduler() {
  const [currentDate] = useState(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state for creating post
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [time, setTime] = useState("19:00");
  const [date, setDate] = useState("24");
  const [content, setContent] = useState("");
  const [savingCompleted, setSavingCompleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/schedules");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !time || !date) return;
    setSavingCompleted(true);
    try {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          time,
          title,
          date: Number(date),
          content
        })
      });
      const data = await response.json();
      if (data.success) {
        // Refresh local list
        await fetchPosts();
        setIsModalOpen(false);
        // Reset form
        setTitle("");
        setPlatform("instagram");
        setTime("19:00");
        setDate("24");
        setContent("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCompleted(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Social Media Scheduler</h1>
          <p className="text-slate-500 mt-1">Plan and automate your social media presence.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
        >
          <Plus size={20} /> Create Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-200 shadow-xs overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-xl text-slate-900">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <div className="flex items-center gap-2">
                 <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
                 <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg">Today</button>
                 <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
              </div>
           </div>

           <div className="grid grid-cols-7 border-b border-slate-100">
              {days.map(d => (
                <div key={d} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
              ))}
           </div>

           <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
              {Array.from({ length: 35 }).map((_, i) => {
                const dayValue = i - 2; // Rough adjustment
                const hasPost = posts.find(p => p.date === dayValue);
                
                return (
                  <div key={i} className="border-r border-b border-slate-50 p-2 hover:bg-slate-50 transition-colors group relative">
                    <span className={cn(
                      "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 transition-all",
                      dayValue === 24 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400"
                    )}>
                      {dayValue > 0 && dayValue < 31 ? dayValue : ""}
                    </span>
                    
                    {hasPost && (
                      <div className="mt-1 space-y-1">
                          <div className={cn(
                            "p-2 rounded-lg text-[10px] font-bold border truncate",
                            hasPost.platform === 'instagram' ? "bg-pink-50 border-pink-100 text-pink-600" : 
                            hasPost.platform === 'tiktok' ? "bg-slate-900 border-slate-800 text-white" :
                            "bg-blue-50 border-blue-100 text-blue-600"
                          )}>
                             {hasPost.time} - {hasPost.title}
                          </div>
                      </div>
                    )}

                    {dayValue > 0 && dayValue < 31 && (
                      <button 
                        onClick={() => { setDate(String(dayValue)); setIsModalOpen(true); }}
                        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-indigo-600 transition-opacity"
                      >
                         <Plus size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
           </div>
        </div>

        {/* Upcoming Posts Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 mb-6 font-display">Upcoming Queue</h3>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-10 bg-slate-100 rounded-xl animate-pulse w-full" />
                  <div className="h-10 bg-slate-100 rounded-xl animate-pulse w-full" />
                </div>
              ) : posts.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs font-medium">
                  Belum ada postingan terjadwal.
                </div>
              ) : (
                <div className="space-y-6 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin">
                   {posts.map(post => (
                     <div key={post.id} className="flex gap-4 group items-center justify-between">
                        <div className="flex gap-3 min-w-0 flex-1">
                           <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                              <ImageIcon size={16} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">{post.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                 {post.platform === 'instagram' ? <Instagram size={10} className="text-pink-500" /> : <Facebook size={10} className="text-blue-500" />}
                                 <span className="text-[9px] font-bold text-slate-400">{post.time} • Tanggal {post.date}</span>
                              </div>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Hapus"
                        >
                           <Trash2 size={13} />
                        </button>
                     </div>
                   ))}
                </div>
              )}
           </div>

           <div className="bg-green-600 p-8 rounded-[2rem] text-white">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                 <Clock size={16} /> Posting Success
              </div>
              <div className="text-3xl font-display font-bold mb-1">98.2%</div>
              <p className="text-xs text-white/80">Your posts are hitting the targets accurately.</p>
           </div>
        </div>
      </div>

      {/* Manual Creation Modal */}
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
                <Sparkles size={18} className="text-indigo-600" />
                Buat Jadwal Baru
              </h3>
              <p className="text-slate-500 text-xs mt-1">Simpan postingan media sosial Anda ke in-memory database.</p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Judul Event / Postingan</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Diskon Kopi Aren Spesial"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</label>
                  <select 
                    value={platform} 
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu Posting</label>
                  <input 
                    type="text" 
                    required
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 19:30"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal (1-31 Mei 2026)</label>
                <input 
                  type="number" 
                  min="1"
                  max="31"
                  required
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Isi Caption / Konten</label>
                <textarea 
                  rows={3}
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis caption menarik di sini..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs font-semibold text-slate-950 resize-none"
                />
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
                  disabled={savingCompleted}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-40 font-sans"
                >
                  {savingCompleted ? "Menyimpan..." : "Simpan Postingan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
