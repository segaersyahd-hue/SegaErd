import { useState } from "react";
import { 
  BrainCircuit, 
  Sparkles, 
  Copy, 
  Send, 
  Hash, 
  ChevronDown, 
  RefreshCw,
  Download,
  Check,
  Zap,
  Layout,
  History,
  Languages,
  PenTool
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export default function ContentGenerator() {
  const [businessType, setBusinessType] = useState("");
  const [tone, setTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!businessType || !prompt) return;
    
    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      // In this environment, GEMINI_API_KEY is handled via process.env
      const ai = new GoogleGenAI(process.env.GEMINI_API_KEY!);
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const generationPrompt = `Kamu adalah spesialis digital marketing untuk UMKM Indonesia. 
        Buatkan 3 opsi caption media sosial (Instagram/TikTok), hashtag populer, dan ide visual untuk promosi berikut:
        Jenis Bisnis: ${businessType}
        Tone: ${tone}
        Topik Promosi: ${prompt}
        
        Berikan jawaban dalam format yang rapi dan menarik dengan pemisahan opsi yang jelas (Opsi 1, Opsi 2, Opsi 3).`;

      const result = await model.generateContent(generationPrompt);
      const response = await result.response;
      setGeneratedContent(response.text() || "Failed to generate content.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("Maaf, terjadi kesalahan saat menghubungkan ke AI. Pastikan API Key sudah terpasang di environment.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-10">
        <div>
           <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold uppercase tracking-[0.3em] text-[10px]">
              <Sparkles size={12} />
              AI Studio Suite
           </div>
           <h1 className="text-4xl font-serif font-medium tracking-tight text-slate-900 mb-2">Content <span className="italic">Architect</span></h1>
           <p className="text-sm text-slate-500 font-medium">Crafting narrative-driven marketing pieces for the modern umkm.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-purple-50 border border-purple-100 rounded-xl text-[10px] font-bold text-purple-600 uppercase tracking-widest">
              Gemini 1.5 Flash Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar / Configuration */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-premium space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="relative space-y-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 capitalize underline underline-offset-4 decoration-purple-200 decoration-2">
                  <Layout size={12} /> Nyantri Business Niche
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Handmade Leather Goods"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 capitalize underline underline-offset-4 decoration-purple-200 decoration-2">
                  <Languages size={12} /> Content Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Professional", "Elegant", "Hyper-local", "Modern"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setTone(t)}
                      className={cn(
                        "px-4 py-3 text-xs font-bold rounded-2xl border transition-all duration-300",
                        tone === t 
                          ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10 scale-[1.02]" 
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 capitalize underline underline-offset-4 decoration-purple-200 decoration-2">
                  <PenTool size={12} /> Creative Directive
                </label>
                <textarea 
                  rows={5}
                  placeholder="Tell me about your product or specific event..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-400 focus:bg-white transition-all text-sm font-semibold text-slate-900 resize-none min-h-[140px]"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !businessType || !prompt}
                className="group w-full py-5 bg-linear-to-br from-indigo-700 to-purple-800 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-700/20 transition-all active:scale-[0.98] disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Assembling Narrative...
                  </>
                ) : (
                  <>
                    Architect Content <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Assistant Info */}
          <div className="bg-white p-8 rounded-[2.5rem] border-soft shadow-premium flex items-start gap-5">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <BrainCircuit size={24} />
             </div>
             <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Semantic Context</h4>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">AI analyzes trending hashtags in Indonesia specifically for your business niche before generating options.</p>
             </div>
          </div>
        </div>

        {/* Main Workspace / Output */}
        <div className="lg:col-span-8 h-full">
           <div className="bg-white rounded-[3.5rem] border border-slate-200/60 shadow-premium h-full flex flex-col min-h-[640px] overflow-hidden relative">
              {/* Window Controls - for technical aesthetic */}
              <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    </div>
                    <div className="h-4 w-px bg-slate-200 mx-3" />
                    <History size={14} className="text-slate-300" />
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Generation Node 001</span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => generatedContent && copyToClipboard(generatedContent)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                        copied ? "bg-green-50 text-green-600 shadow-inner" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm"
                      )}
                    >
                       {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Entire</>}
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 p-10 lg:p-14 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 bg-linear-to-b from-white to-slate-50/30">
                 <AnimatePresence mode="wait">
                    {!generatedContent && !isGenerating ? (
                       <motion.div 
                        key="empty"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
                       >
                          <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-premium">
                             <PenTool size={40} className="text-slate-200" />
                          </div>
                          <h4 className="text-xl font-serif italic text-slate-900 mb-3">Begin the architecture.</h4>
                          <p className="text-sm font-medium text-slate-400 leading-relaxed">Fill in the directives on the left sidebar to generate beautiful content options for your UMKM.</p>
                       </motion.div>
                    ) : isGenerating ? (
                       <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                       >
                          <div className="space-y-4">
                             <div className="h-6 bg-slate-100 rounded-xl animate-pulse w-1/4" />
                             <div className="h-32 bg-slate-50/50 rounded-3xl animate-pulse w-full border border-slate-50" />
                          </div>
                          <div className="space-y-4">
                             <div className="h-6 bg-slate-100 rounded-xl animate-pulse w-1/4" />
                             <div className="h-32 bg-slate-50/50 rounded-3xl animate-pulse w-full border border-slate-50" />
                          </div>
                       </motion.div>
                    ) : (
                       <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-slate max-w-none"
                       >
                          <div className="whitespace-pre-wrap font-sans text-slate-700 leading-[1.8] text-[15px] selection:bg-purple-100 italic font-medium p-8 bg-white rounded-3xl border-soft shadow-premium">
                             {generatedContent}
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {generatedContent && (
                <div className="p-8 lg:p-12 border-t border-slate-100 bg-white shadow-2xl relative z-10">
                   <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Send size={20} />
                         </div>
                         <div>
                            <div className="text-sm font-bold text-slate-900">Direct Publication</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect to social accounts</div>
                         </div>
                      </div>
                      <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-tight hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                         Proceed to Scheduler
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
              )}

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-8 flex flex-col gap-2 opacity-5 pointer-events-none">
                 <Hash size={40} />
                 <Hash size={40} className="translate-x-12" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
