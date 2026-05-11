import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Rocket, 
  MessageCircle, 
  Calendar, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  ChevronDown,
  Menu,
  X,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Target,
  AlertCircle,
  Sparkles,
  Layers,
  Search,
  MousePointerClick
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fitur', href: '#features' },
    { name: 'Dashboard', href: '#preview' },
    { name: 'Harga', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 glass border-b border-slate-200/40 shadow-premium' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 rotate-3">
            <Rocket size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-slate-900 group"> UMKM<span className="text-blue-600">Boost</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all duration-300 relative group overflow-hidden">
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 transform -translate-x-[105%] group-hover:translate-x-0" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Masuk</Link>
          <Link to="/register" className="px-7 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
            Daftar Gratis
          </Link>
        </div>

        <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-dark border-b border-white/10 mt-2 mx-4 rounded-3xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-xl font-bold text-white/90" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>
              ))}
              <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                <Link to="/login" className="w-full py-4 text-center font-bold text-white border border-white/20 rounded-2xl">Masuk</Link>
                <Link to="/register" className="w-full py-4 text-center font-bold text-slate-900 bg-white rounded-2xl shadow-xl shadow-white/10">Mulai Sekarang</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[10%] w-px h-[400px] bg-linear-to-b from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-[20%] right-[10%] w-px h-[400px] bg-linear-to-b from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 bg-white border border-slate-200/60 rounded-full shadow-premium backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.1em] text-slate-500 uppercase">Automated Marketing Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-[5.5rem] font-display font-extrabold leading-[0.95] mb-10 text-slate-900">
                Level Up Your <br />
                <span className="text-gradient">Business</span> with <br />
                <span className="italic font-serif font-light text-slate-400">Intelligent</span> AI.
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-500 mb-12 max-w-[540px] leading-relaxed mx-auto lg:mx-0">
                Satu platform untuk semua kebutuhan digital marketing UMKM—dari konten visual, automasi WhatsApp, hingga analisis kompetitor berbasis AI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Link to="/register" className="group w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[1.25rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95">
                  Mulai Gratis 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white border-soft text-slate-900 rounded-[1.25rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                   <PlayCircle size={20} className="text-blue-500" />
                   Lihat Demo
                </Link>
              </div>

              <div className="mt-14 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <Instagram size={24} />
                <Facebook size={24} />
                <Globe size={24} />
                <span className="h-px w-12 bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Official Partners</span>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, x: 20 }} 
               animate={{ opacity: 1, scale: 1, x: 0 }} 
               transition={{ duration: 1, delay: 0.2 }}
               className="relative z-10"
            >
              {/* Main App Mockup */}
              <div className="relative group p-1.5 bg-gradient-to-br from-white/80 to-white/20 rounded-[3rem] border border-white/40 shadow-premium backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="bg-white rounded-[2.8rem] overflow-hidden border border-slate-100/60 aspect-[4/3] lg:aspect-[1.2/1] relative shadow-inner">
                  <div className="p-8 h-full flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      </div>
                      <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Dashboard AI v2.4
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-6 h-full">
                      <div className="col-span-2 space-y-6">
                        <div className="p-6 bg-slate-50/80 rounded-3xl space-y-4">
                           <div className="w-10 h-10 bg-white rounded-xl shadow-xs" />
                           <div className="space-y-2">
                              <div className="h-2 w-full bg-slate-200 rounded-full" />
                              <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                           </div>
                        </div>
                        <div className="p-6 bg-blue-600 rounded-3xl text-white space-y-4 shadow-xl shadow-blue-500/20">
                           <TrendingUp size={24} />
                           <div className="text-2xl font-bold">+184%</div>
                           <div className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Traffic Surge</div>
                        </div>
                      </div>
                      <div className="col-span-3 space-y-6">
                         <div className="flex-1 p-6 bg-slate-900 rounded-[2.5rem] text-white flex flex-col justify-between h-48 relative overflow-hidden group/card">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-1000" />
                            <div className="text-xs font-bold text-white/50 uppercase tracking-widest">AI Strategy</div>
                            <div className="text-xl font-bold flex flex-col gap-1">
                               <span>Schedule tomorrow</span>
                               <span className="text-blue-400 underline decoration-2 underline-offset-4">19:00 WIB</span>
                            </div>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-colors border border-white/10">
                               Confirm Post
                            </button>
                         </div>
                         <div className="p-6 bg-slate-50 border-soft rounded-[2.5rem] flex items-center justify-between">
                            <div className="flex -space-x-3">
                               {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />)}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest underline decoration-blue-500 underline-offset-4">View All Members</div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Accents */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-48 p-6 glass rounded-3xl shadow-2xl z-20 border border-white/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <div className="text-xs font-bold text-slate-900 underline underline-offset-2">WhatsApp Ads</div>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Broadcast ready for 1.2k users.</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-10 w-56 p-6 glass rounded-3xl shadow-2xl z-20 border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Conversion</div>
                    <div className="text-[10px] font-bold text-green-500">+12% from avg.</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { 
      title: 'Generative AI Content', 
      desc: 'Lupakan buntu ide. AI kami membuat caption, ide konten, dan visual copy yang spesifik untuk niche UMKM Anda.', 
      icon: <BrainCircuit className="text-blue-600" />,
      tag: "Creativity"
    },
    { 
      title: 'Social Multi-Scheduler', 
      desc: 'Publish sekaligus ke Instagram, TikTok, dan Facebook di jam paling ramai otomatis berdasarkan analisis AI.', 
      icon: <Calendar className="text-purple-600" />,
      tag: "Automation"
    },
    { 
      title: 'WhatsApp Automation', 
      desc: 'Broadcast cerdas dan CS Bot yang membantu membalas pertanyaan pelanggan 24/7 tanpa perlu admin manual.', 
      icon: <MessageCircle className="text-green-600" />,
      tag: "Sales"
    },
    { 
      title: 'Competitive Analytics', 
      desc: 'Lihat apa yang dilakukan kompetitor Anda dan dapatkan saran strategi balasan untuk memenangkan pasar.', 
      icon: <BarChart3 className="text-orange-600" />,
      tag: "Strategy"
    },
    { 
      title: 'Ads Smart Targeting', 
      desc: 'Optimize budget iklan terkecil sekalipun dengan target audiens paling akurat lewat teknologi machine learning.', 
      icon: <Target className="text-red-600" />,
      tag: "Growth"
    },
    { 
      title: 'CRM Terintegrasi', 
      desc: 'Catat semua histori pelanggan di satu tempat untuk mempermudah program loyalitas dan promo kembali.', 
      icon: <Globe className="text-indigo-600" />,
      tag: "Retention"
    }
  ];

  return (
    <section id="features" className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
           <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.3em] mb-5">Features</h2>
              <h3 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 leading-tight">
                Pusat Digitalisasi <br />
                <span className="text-gradient">UMKM Modern.</span>
              </h3>
           </div>
           <p className="max-w-xs text-slate-500 font-medium leading-relaxed">
             Teknologi Enterprise kini hadir untuk UMKM dengan harga terjangkau dan penggunaan yang sangat mudah.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div 
               key={idx} 
               whileHover={{ y: -10 }}
               className="p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:border-blue-500/20 hover:bg-white hover:shadow-premium transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{f.tag}</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-premium transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {f.icon}
              </div>
              <h4 className="text-2xl font-display font-bold mb-5 text-slate-900 group-hover:text-blue-600 transition-colors">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{f.desc}</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm cursor-pointer group/link">
                Coba Sekarang 
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Trusted by 2,000+ local businesses</p>
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24 opacity-30 grayscale saturate-0">
           {/* Placeholders for logos */}
           <div className="text-xl font-bold font-serif italic text-slate-900 tracking-tighter">BatikAsli</div>
           <div className="text-xl font-bold text-slate-900 flex items-center gap-1"><Layers size={24} /> KopiLab</div>
           <div className="text-xl font-black text-slate-900 tracking-widest">FOODGO</div>
           <div className="text-xl font-bold font-display italic text-slate-900">MODERNLAB</div>
           <div className="text-xl font-bold text-slate-900">UMKMHUB</div>
        </div>
      </div>
    </section>
  );
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Apakah platform ini sulit digunakan?", a: "Sama sekali tidak. UMKMBoost dirancang khusus untuk pemilik bisnis yang tidak memiliki background IT. Semua fitur berbasis AI ini hanya membutuhkan input teks sederhana." },
    { q: "Apakah saya membutuhkan API Key sendiri untuk AI?", a: "Tidak. Kami sudah mengintegrasikan model AI terbaik (Gemini/Llama) ke dalam sistem. Anda tinggal pakai tanpa biaya tambahan tersembunyi." },
    { q: "Apa bedanya dengan posting manual di Instagram?", a: "Platform kami memberi saran 'kapan' harus posting dan 'apa' isinya berdasarkan data bisnis Anda, menghemat 80% waktu riset konten Anda." }
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em] mb-4">Questions</h3>
          <h4 className="text-4xl font-display font-bold text-slate-900">Masih ada yang <span className="italic font-serif font-light text-slate-400">mengganjal?</span></h4>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-soft rounded-3xl overflow-hidden">
               <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
               >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <div className={`p-2 rounded-full border border-slate-200 transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-slate-900 text-white border-slate-900' : 'text-slate-400'}`}>
                    <ChevronDown size={18} />
                  </div>
               </button>
               <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50/50"
                  >
                    <div className="p-8 pt-0 text-slate-500 leading-relaxed text-sm">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
               </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center font-bold rotate-3 shadow-xl">
                <Rocket size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight"> UMKM<span className="text-blue-400">Boost</span></span>
            </Link>
            <p className="text-white/60 text-lg max-w-sm mb-10 leading-relaxed font-medium">Platform digital marketing paling cerdas untuk UMKM Indonesia.</p>
            <div className="flex items-center gap-5">
              {[Instagram, Facebook, Globe, Target].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-blue-400 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-xs">Resources</h5>
            <div className="flex flex-col gap-5 text-sm font-semibold text-white/70">
              <Link to="#" className="hover:text-blue-400">Blog Digital</Link>
              <Link to="#" className="hover:text-blue-400">UMKM Handbook</Link>
              <Link to="#" className="hover:text-blue-400">AI Trends 2026</Link>
              <Link to="#" className="hover:text-blue-400">Customer Story</Link>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-xs">Support</h5>
            <div className="flex flex-col gap-5 text-sm font-semibold text-white/70">
              <Link to="#" className="hover:text-blue-400">Pusat Bantuan</Link>
              <Link to="#" className="hover:text-blue-400">API Documentation</Link>
              <Link to="#" className="hover:text-blue-400">Security Privacy</Link>
              <Link to="#" className="hover:text-blue-400">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm font-bold tracking-widest uppercase">© 2026 UMKMBoost. AI POWERED MARKETING.</p>
          <div className="flex items-center gap-8 text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">
             <span>Made with Love in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Perfect for new local businesses getting started.",
      features: [
        "10 AI Generations / month",
        "1 Social Account connect",
        "Basic Analytics",
        "Standard Support",
        "Manual Content Scheduling"
      ],
      cta: "Mulai Gratis",
      popular: false,
      color: "blue"
    },
    {
      name: "Pro",
      price: "199k",
      desc: "Best for growing UMKM needing automation.",
      features: [
        "Unlimited AI Generations",
        "5 Social Accounts connect",
        "WhatsApp Broadcast (1k/mo)",
        "Priority AI Processing",
        "Competitor Tracking (3)",
        "Auto-scheduling Engine"
      ],
      cta: "Pilih Pro",
      popular: true,
      color: "indigo"
    },
    {
      name: "Enterprise",
      price: "499k",
      desc: "Maximum power for established brands.",
      features: [
        "Unlimited Everything",
        "Unlimited Social Accounts",
        "Custom AI Brand Voice",
        "24/7 Priority Support",
        "Full CRM Integration",
        "Advanced Ads Optimization"
      ],
      cta: "Hubungi Kami",
      popular: false,
      color: "slate"
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.3em] mb-5">Subscription</h2>
          <h3 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Investasikan <span className="text-gradient">Pertumbuhan</span> Anda.</h3>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">Pilih paket yang sesuai dengan skala bisnis anda. Tanpa biaya tersembunyi, batalkan kapan saja.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 flex flex-col h-full bg-white ${
                plan.popular 
                ? 'border-blue-500 shadow-2xl shadow-blue-500/10 scale-[1.02] z-10' 
                : 'border-slate-200/60 hover:shadow-premium'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30">
                  Most Popular Choice
                </div>
              )}

              <div className="mb-10">
                <h4 className="text-xl font-display font-bold text-slate-900 mb-2">{plan.name}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-sm font-bold text-slate-400">Rp</span>
                <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">{plan.price}</span>
                <span className="text-sm font-bold text-slate-400">/bulan</span>
              </div>

              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <Link 
                to="/register" 
                className={`w-full py-5 rounded-2xl font-bold text-sm text-center transition-all ${
                  plan.popular 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm font-medium text-slate-400">
            Butuh solusi khusus untuk jaringan waralaba besar? <Link to="#" className="text-blue-600 font-bold hover:underline">Hubungi Tim Sales Kami</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-[#FAFAFA] font-sans">
      <Navbar />
      <Hero />
      <TrustSection />
      <Features />
      <Pricing />
      {/* Visual Break */}
      <section className="py-20 px-6">
         <div className="container mx-auto">
            <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
         </div>
      </section>
      <FAQ />
      <Footer />
    </div>
  );
}
