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
  Check
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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Kamu adalah spesialis digital marketing untuk UMKM Indonesia. 
        Buatkan 3 opsi caption media sosial (Instagram/TikTok), hashtag populer, dan ide visual untuk promosi berikut:
        Jenis Bisnis: ${businessType}
        Tone: ${tone}
        Topik Promosi: ${prompt}
        
        Berikan jawaban dalam format yang rapi dan menarik.`,
      });

      setGeneratedContent(response.text || "Failed to generate content.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("Error occurred while generating content. Please check your API key.");
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
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">AI Content Generator</h1>
        <p className="text-slate-500 mt-1">Generate high-converting copy and ideas in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Business Type</label>
              <input 
                type="text" 
                placeholder="e.g. Kedai Kopi Modern"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tone & Voice</label>
              <div className="grid grid-cols-2 gap-2">
                {["Professional", "Playful", "Formal", "Technical"].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTone(t)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-xl border transition-all",
                      tone === t ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">What to promote?</label>
              <textarea 
                rows={4}
                placeholder="Describe your promotion, product, or event..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !businessType || !prompt}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  Generate <BrainCircuit size={20} />
                </>
              )}
            </button>
          </div>

          <div className="p-6 bg-blue-600 rounded-[2rem] text-white">
             <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                <Sparkles size={16} /> Pro Tip
             </div>
             <p className="text-xs text-white/80 leading-relaxed">Sebutkan target audiens Anda untuk hasil yang lebih spesifik dan relevan.</p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 h-full">
           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xs h-full flex flex-col min-h-[500px]">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-blue-500">
                       <Sparkles size={18} />
                    </div>
                    <span className="font-bold text-slate-900">AI Result</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => generatedContent && copyToClipboard(generatedContent)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Copy to clipboard"
                    >
                       {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Download as Text">
                       <Download size={18} />
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto">
                 <AnimatePresence mode="wait">
                    {!generatedContent && !isGenerating ? (
                       <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center opacity-40"
                       >
                          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                             <BrainCircuit size={40} />
                          </div>
                          <h4 className="font-bold">Input detail promosi Anda</h4>
                          <p className="text-sm mt-2">AI akan merancang konten terbaik untuk UMKM Anda.</p>
                       </motion.div>
                    ) : isGenerating ? (
                       <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                       >
                          {[1,2,3,4,5,6].map(i => (
                            <div key={i} className={cn("h-4 bg-slate-100 rounded-full animate-pulse", i % 2 === 0 ? "w-full" : "w-3/4")} />
                          ))}
                       </motion.div>
                    ) : (
                       <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-slate max-w-none"
                       >
                          <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-sm">
                             {generatedContent}
                          </pre>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {generatedContent && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 rounded-b-[2rem]">
                   <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready to go?</div>
                      <button className="px-6 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 active:scale-95">
                         Schedule Content
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
