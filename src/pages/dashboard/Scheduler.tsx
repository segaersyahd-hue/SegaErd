import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Instagram, 
  Facebook, 
  MoreVertical,
  Clock,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "../../lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const scheduledPosts = [
  { id: "1", platform: "instagram", time: "19:00", title: "Promo Coffee Late", date: 15 },
  { id: "2", platform: "facebook", time: "10:30", title: "New Opening Branch", date: 18 },
  { id: "3", platform: "tiktok", time: "21:00", title: "Behind the Scene", date: 20 },
];

export default function Scheduler() {
  const [currentDate] = useState(new Date());
  
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Social Media Scheduler</h1>
          <p className="text-slate-500 mt-1">Plan and automate your social media presence.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
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
                const hasPost = scheduledPosts.find(p => p.date === dayValue);
                
                return (
                  <div key={i} className="border-r border-b border-slate-50 p-2 hover:bg-slate-50 transition-colors group relative">
                    <span className={cn(
                      "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 transition-all",
                      dayValue === 12 ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-400"
                    )}>
                      {dayValue > 0 && dayValue < 31 ? dayValue : ""}
                    </span>
                    
                    {hasPost && (
                      <div className="mt-1 space-y-1">
                         <div className={cn(
                           "p-2 rounded-lg text-[10px] font-bold border truncate",
                           hasPost.platform === 'instagram' ? "bg-pink-50 border-pink-100 text-pink-600" : "bg-blue-50 border-blue-100 text-blue-600"
                         )}>
                            {hasPost.time} - {hasPost.title}
                         </div>
                      </div>
                    )}

                    <button className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-slate-600 transition-opacity">
                       <Plus size={14} />
                    </button>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Upcoming Posts Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 mb-6">Upcoming Queue</h3>
              <div className="space-y-6">
                 {scheduledPosts.map(post => (
                   <div key={post.id} className="flex gap-4 group">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                         <ImageIcon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="text-sm font-bold text-slate-900 truncate">{post.title}</div>
                         <div className="flex items-center gap-2 mt-1">
                            {post.platform === 'instagram' ? <Instagram size={12} className="text-pink-500" /> : <Facebook size={12} className="text-blue-500" />}
                            <span className="text-[10px] font-bold text-slate-400">{post.time} • Today</span>
                         </div>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         <MoreVertical size={16} />
                      </button>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
                 View Full Queue
              </button>
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
    </div>
  );
}
