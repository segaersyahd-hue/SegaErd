import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rocket, ArrowRight, Mail, Lock, User, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";
import { User as UserType } from "../types";
import { motion } from "motion/react";

interface RegisterPageProps {
  onLogin: (user: UserType, token: string) => void;
}

export default function RegisterPage({ onLogin }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.user, data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed. Try a different email.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] aspect-square bg-purple-500/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group transition-transform hover:rotate-1">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-purple-500/20 -rotate-3 group-hover:-rotate-6 transition-transform">
              <Rocket size={26} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-display font-bold tracking-tight text-slate-900 leading-none">UMKM<span className="text-blue-600">Boost</span></span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-3 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
             <ShieldCheck size={12} className="text-green-500" />
             Join the ecosystem
          </div>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-slate-900 italic leading-tight">Create your <span className="not-italic font-bold">digital legacy</span></h1>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-premium border border-slate-200/60 relative overflow-hidden group">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 rounded-[1.25rem] flex items-start gap-4 text-sm font-semibold"
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 underline underline-offset-4 decoration-purple-100 decoration-2">Full Identity</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Andi Wijaya"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 underline underline-offset-4 decoration-purple-100 decoration-2">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 underline underline-offset-4 decoration-purple-100 decoration-2">Protective Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Provisioning Account..." : "Create Free Account"} 
              <ArrowRight size={20} className="group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center space-y-6">
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase leading-relaxed">
              By joining, you agree to our <br />
              <Link to="#" className="text-slate-900 underline">Terms</Link> & <Link to="#" className="text-slate-900 underline">Privacy Directives</Link>
            </p>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Already verified? <br className="sm:hidden" />
              <Link to="/login" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 ml-1">Sign In instead</Link>
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center opacity-30 select-none pointer-events-none">
           <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400">© 2026 UMKMBoost • Powered by Advanced AI</p>
        </div>
      </motion.div>
    </div>
  );
}
