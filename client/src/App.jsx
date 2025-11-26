import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { 
  Mail, LogOut, Zap, Globe, Sparkles, Building2, 
  Briefcase, MessageSquare, Upload, FileSpreadsheet, CheckCircle,
  LayoutTemplate, Send, Loader2, ArrowRight, BarChart3, Users, Globe2, Lock, UserPlus, LogIn, Star, ChevronRight
} from 'lucide-react'

// 사용자님이 제공해주신 실제 Lemon Squeezy 상품 링크
const PAYMENT_LINK = "https://zxdcf170.lemonsqueezy.com/buy/531b1cb0-f4ee-41c3-9d23-d92ec81dc923"

// [서버 주소] 배포된 Render 주소
const API_URL = "https://coldmail-ai-saas.onrender.com"; 

// --- [Component 1] Landing Page (Redesigned) ---
function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10"></div>
      
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-violet-500/20">
            <Mail className="w-5 h-5 text-white"/>
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">ColdMail.AI</span>
        </div>
        <button onClick={onStart} className="group px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
          Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-5xl mx-auto px-6 py-24 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-8 animate-fade-in-up hover:bg-violet-500/20 transition cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          v2.0 Now Available Globally
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100">
          Turn 3 Hours of Research <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">Into Just 3 Seconds.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Stop manually googling prospects. Our AI analyzes <span className="text-white font-semibold">News & Hiring Signals</span> to craft hyper-personalized cold emails that actually get replies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <button onClick={onStart} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full font-bold text-lg shadow-xl shadow-violet-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-1">
            Get Started for Free <Sparkles className="w-5 h-5"/>
          </button>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium px-4">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700"></div>)}
            </div>
            Used by 1,000+ Sales Pros
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10", title: "Deep Intelligence", desc: "We analyze Growth Signals and Hiring Trends to find the perfect hook." },
            { icon: FileSpreadsheet, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", title: "Bulk Automation", desc: "Upload your lead list (CSV). Our AI writes personalized emails for 100+ leads in minutes." },
            { icon: Globe2, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Multi-Language", desc: "Generate native-level emails in English, Korean, Japanese, and Spanish instantly." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-white/10 hover:bg-white/5 transition duration-300 group">
              <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6"/>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// --- [Component 2] App Entry (Auth Logic) ---
function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [session, setSession] = useState(null)
  
  // Auth States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false) 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) setShowLanding(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Google 로그인 처리
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) alert("Google Login Failed: " + error.message)
  }

  // 이메일 로그인/회원가입 처리
  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ 
        email, password, options: { emailRedirectTo: window.location.origin }
      })
      if (error) alert("Sign Up Failed: " + error.message)
      else {
        alert("🎉 Verification email sent! Please check your inbox.")
        setIsSignUp(false)
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert("Login Failed: " + error.message)
    }
    setLoading(false)
  }
  
  const handleLogout = async () => { 
    await supabase.auth.signOut(); setSession(null); setShowLanding(true);
  }

  if (showLanding && !session) return <LandingPage onStart={() => setShowLanding(false)} />

  // --- Auth Screen (Redesigned) ---
  if (!session) {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
            
             <button onClick={()=>setShowLanding(true)} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 font-bold z-20 transition">
                <ArrowRight className="w-4 h-4 rotate-180"/> Back
             </button>

            <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-violet-500/20 mb-6">
                        <Mail className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {isSignUp ? 'Join us to scale your sales outreach.' : 'Your AI Sales Agent is ready.'}
                    </p>
                </div>
                
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl transition hover:bg-slate-100 flex items-center justify-center gap-3 mb-6"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-slate-700 flex-1"></div>
                  <span className="text-slate-500 text-xs font-bold uppercase">Or with Email</span>
                  <div className="h-px bg-slate-700 flex-1"></div>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="relative group">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition"/>
                      <input type="email" required placeholder="name@company.com" value={email} onChange={e=>setEmail(e.target.value)} 
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"/>
                  </div>
                  <div className="relative group">
                      <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition"/>
                      <input type="password" required placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} 
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"/>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transform active:scale-95">
                      {loading ? <Loader2 className="animate-spin w-5 h-5"/> : (isSignUp ? <UserPlus className="w-5 h-5"/> : <LogIn className="w-5 h-5"/>)}
                      {isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-sm">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="ml-2 text-violet-400 hover:text-violet-300 font-bold hover:underline">
                      {isSignUp ? "Log In" : "Sign Up"}
                    </button>
                  </p>
                </div>
            </div>
        </div>
    )
  }

  return <MainApp session={session} onLogout={handleLogout} />
}

// --- [Component 3] Main Dashboard (Redesigned) ---
function MainApp({ session, onLogout }) {
  const [credits, setCredits] = useState(0)
  const [mode, setMode] = useState('single') 
  const [myService, setMyService] = useState('AI Sales Solution')
  const [desc, setDesc] = useState('An AI tool that automates personalized cold emails by analyzing company news.')
  const [language, setLanguage] = useState('English') 
  const [tone, setTone] = useState('Professional')
  const [hiring, setHiring] = useState(false)

  const [company, setCompany] = useState('')
  const [result, setResult] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) fetchCredits(session.user.id)
  }, [session])

  const fetchCredits = async (userId) => {
    const { data } = await supabase.from('profiles').select('credits').eq('id', userId).single()
    if (data) setCredits(data.credits)
  }

  const handlePayment = () => {
    window.location.href = `${PAYMENT_LINK}?checkout[custom][user_id]=${session.user.id}`;
  };

  const handleGenerate = async () => {
    if (!company) return alert("Please enter a company name.");
    if (credits <= 0) { if(confirm("Insufficient credits! Recharge now?")) handlePayment(); return; }

    setLoading(true); setResult(null);
    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: session.user.id, company_name: company, my_service: myService, service_description: desc, language, tone, include_hiring: hiring })
      });
      const data = await res.json();
      if (res.ok) { setResult(data); fetchCredits(session.user.id); }
      else alert("Failed: " + data.detail);
    } catch (e) { alert("Server Error: " + e); } finally { setLoading(false); }
  };

  const handleBulkGenerate = async () => {
    if (!file) return alert("Please upload a file.");
    if (credits <= 0) { if(confirm("Insufficient credits! Recharge now?")) handlePayment(); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file); formData.append('user_id', session.user.id);
      formData.append('my_service', myService); formData.append('service_description', desc);
      formData.append('language', language); formData.append('tone', tone);
      formData.append('include_hiring', String(hiring));

      const res = await fetch(`${API_URL}/generate_bulk`, { method: 'POST', body: formData });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = "result.csv";
        document.body.appendChild(a); a.click();
        alert("Download Complete!");
      } else { const err = await res.json(); alert("Failed: " + err.detail); }
    } catch (e) { alert("Server Error: " + e); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <nav className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-1.5 rounded-lg"><Mail className="w-5 h-5 text-white"/></div>
            <span className="font-bold text-xl text-white tracking-tight">ColdMail<span className="text-violet-500">.AI</span></span>
          </div>
          <div className="flex gap-4 items-center">
             <button onClick={handlePayment} className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-violet-500/50 rounded-full text-sm font-bold flex gap-2 items-center text-slate-300 transition group">
                <Zap className={`w-4 h-4 ${credits > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'}`}/> {credits}
                <span className="bg-violet-600 text-white text-[10px] px-1.5 py-0.5 rounded ml-1 group-hover:inline-block hidden transition-all">+ ADD</span>
             </button>
             <button onClick={onLogout} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition">
               <LogOut className="w-5 h-5"/>
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex justify-center mb-10">
            <div className="bg-slate-900/80 p-1.5 rounded-xl flex gap-1 border border-white/10 shadow-lg backdrop-blur-sm">
                <button onClick={() => setMode('single')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === 'single' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  <Sparkles className="w-4 h-4"/> Single Analysis
                </button>
                <button onClick={() => setMode('bulk')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === 'bulk' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  <FileSpreadsheet className="w-4 h-4"/> Bulk (Excel)
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel: Settings */}
            <div className="lg:col-span-4 space-y-5">
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <h3 className="font-bold text-white mb-6 flex gap-2 items-center border-b border-white/5 pb-4">
                      <Globe className="w-5 h-5 text-violet-500"/> Global Configuration
                    </h3>
                    
                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-xs text-slate-400 font-bold uppercase mb-2 block group-hover:text-violet-400 transition">Output Language</label>
                            <div className="relative">
                              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition appearance-none" value={language} onChange={e=>setLanguage(e.target.value)}>
                                  <option value="English">🇺🇸 English</option>
                                  <option value="Korean">🇰🇷 Korean</option>
                                  <option value="Japanese">🇯🇵 Japanese</option>
                                  <option value="Spanish">🇪🇸 Spanish</option>
                              </select>
                              <Globe2 className="absolute right-4 top-3.5 w-4 h-4 text-slate-500 pointer-events-none"/>
                            </div>
                        </div>
                        
                        <div className="group">
                            <label className="text-xs text-slate-400 font-bold uppercase mb-2 block group-hover:text-violet-400 transition">Tone & Manner</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-500"/>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition appearance-none" value={tone} onChange={e=>setTone(e.target.value)}>
                                    <option value="Professional">👔 Professional</option>
                                    <option value="Friendly">😊 Friendly</option>
                                    <option value="Direct">⚡ Direct</option>
                                </select>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 bg-slate-950 p-3.5 rounded-xl border cursor-pointer transition-all ${hiring ? 'border-green-500/50 bg-green-500/10' : 'border-slate-800 hover:border-slate-700'}`} onClick={()=>setHiring(!hiring)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${hiring ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
                                {hiring && <CheckCircle className="w-3.5 h-3.5 text-white"/>}
                            </div>
                            <span className={`text-sm font-medium ${hiring ? 'text-green-400' : 'text-slate-300'}`}>Include Hiring Signals</span>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-xs text-slate-400 font-bold uppercase">My Service</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" value={myService} onChange={e=>setMyService(e.target.value)}/>
                            <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white resize-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" rows="3" value={desc} onChange={e=>setDesc(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Workspace */}
            <div className="lg:col-span-8">
                {mode === 'single' ? (
                    <div className="flex flex-col gap-6 h-full">
                        {/* Input Area */}
                        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-all focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20">
                            <label className="text-xs text-slate-400 font-bold uppercase mb-3 block">Target Company Name</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1 group">
                                    <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition"/>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-white text-lg focus:border-violet-500 outline-none placeholder-slate-600 transition" 
                                        placeholder="Ex: Toss, Naver, Netflix" value={company} onChange={e=>setCompany(e.target.value)}/>
                                </div>
                                <button onClick={handleGenerate} disabled={loading} 
                                    className={`px-8 rounded-xl font-bold text-lg shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:translate-y-0 ${loading ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25'}`}>
                                    {loading ? <Loader2 className="animate-spin"/> : <Sparkles className="w-5 h-5"/>} Generate
                                </button>
                            </div>
                        </div>
                        
                        {/* Results Area */}
                        {result ? (
                            <div className="space-y-4 animate-fade-in-up">
                                {/* News Widget */}
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-blue-600" />
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Latest News</span>
                                    </div>
                                    <div className="p-5 bg-white">
                                        {result.news && result.news.length > 0 ? (
                                            <ul className="space-y-3">
                                                {result.news.map((item, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex gap-3 items-start leading-relaxed">
                                                        <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : <p className="text-sm text-slate-400 italic">No recent news found.</p>}
                                    </div>
                                </div>

                                {/* Hiring Widget */}
                                {(result.hiring && result.hiring.length > 0) && (
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-green-500">
                                        <div className="bg-green-50/50 px-5 py-3 border-b border-green-100 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-green-600" />
                                            <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Hiring Signals Detected</span>
                                        </div>
                                        <div className="p-5 bg-white">
                                            <ul className="space-y-3">
                                                {result.hiring.map((item, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex gap-3 items-start leading-relaxed">
                                                        <span className="text-green-600 font-bold text-[10px] mt-0.5 px-2 py-0.5 bg-green-100 rounded-full uppercase tracking-wide">HIRING</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Email Draft Widget */}
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                                    <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-violet-100 rounded-lg text-violet-600"><Send className="w-4 h-4"/></div>
                                            <span className="text-sm font-bold text-slate-700">Generated Email Draft</span>
                                        </div>
                                        <button onClick={() => {navigator.clipboard.writeText(result.email); alert("Copied to clipboard!")}}
                                            className="text-xs font-bold text-violet-600 hover:text-white hover:bg-violet-600 border border-violet-200 hover:border-violet-600 px-3 py-1.5 rounded-lg transition flex items-center gap-2">
                                            <LayoutTemplate className="w-3 h-3"/> Copy Text
                                        </button>
                                    </div>
                                    <div className="p-8 bg-white">
                                        <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-[15px] bg-transparent p-0 border-none">
                                            {result.email}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[400px] bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-slate-800/50">
                                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                  <Sparkles className="w-8 h-8 text-slate-600"/>
                                </div>
                                <p className="text-sm font-medium text-slate-400">Ready to analyze. Enter a company to start.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Bulk Mode UI
                    <div className="h-full bg-slate-900/60 border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-sm">
                        <div className="w-24 h-24 bg-fuchsia-500/10 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-fuchsia-500/10">
                            <FileSpreadsheet className="w-10 h-10 text-fuchsia-400"/>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Bulk Generation</h3>
                        <p className="text-slate-400 mb-10 max-w-md leading-relaxed">
                          Upload a CSV/Excel file with a <code className="bg-slate-800 px-1.5 py-0.5 rounded text-fuchsia-300 text-xs">Company</code> column.<br/> 
                          We will analyze up to 100 companies at once.
                        </p>
                        
                        <label className="cursor-pointer group relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-fuchsia-500/50 border-dashed rounded-2xl p-10 transition-all duration-300 flex flex-col items-center gap-4">
                              <input type="file" className="hidden" accept=".csv, .xlsx" onChange={(e)=>setFile(e.target.files[0])}/>
                              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-white"/>
                              </div>
                              <span className="text-slate-400 group-hover:text-white font-medium transition-colors">
                                  {file ? <span className="text-fuchsia-400 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> {file.name}</span> : "Click to Upload File"}
                              </span>
                            </div>
                        </label>
                        
                        <button onClick={handleBulkGenerate} disabled={loading || !file} 
                            className={`mt-8 w-full max-w-md py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${loading || !file ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-fuchsia-500/25'}`}>
                            {loading ? <><Loader2 className="animate-spin"/> Processing...</> : <><RocketIcon className="w-5 h-5"/> Start Bulk Processing</>}
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}

// Helper Icon
const RocketIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"/></svg>
)

export default App