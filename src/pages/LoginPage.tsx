import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rocket, ArrowRight, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import { User } from "../types";
import { motion } from "motion/react";

interface LoginPageProps {
  onLogin: (user: User, token: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.user, data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] aspect-square bg-purple-500/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group transition-transform hover:-rotate-1">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 rotate-3 group-hover:rotate-6 transition-transform">
              <Rocket size={26} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-display font-bold tracking-tight text-slate-900 leading-none">UMKM<span className="text-blue-600">Boost</span></span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-3 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
             <Sparkles size={12} />
             Secure Authentication
          </div>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-slate-900 italic leading-tight">Welcome back <span className="not-italic font-bold">to Elite!</span></h1>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-premium border border-slate-200/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
             <Rocket size={120} className="rotate-12" />
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 underline underline-offset-4 decoration-blue-100 decoration-2">Identity Hub</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Username"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest underline underline-offset-4 decoration-blue-100 decoration-2">Protective Key</label>
                <Link to="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-widest">Recovery?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 focus:bg-white transition-all text-sm font-semibold text-slate-900"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Validating Session..." : "Access Platform"} 
              <ArrowRight size={20} className="group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              New to the ecosystem? <br className="sm:hidden" />
              <Link to="/register" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 ml-1">Build Your Profile</Link>
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center opacity-30 select-none pointer-events-none">
           <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400">© 2026 UMKMBoost • Encrypted End-to-End</p>
        </div>
      </motion.div>
    </div>
  );
}
