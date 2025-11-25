import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import {
    Mail, LogOut, Zap, Globe, Sparkles, Building2,
    Briefcase, MessageSquare, Upload, FileSpreadsheet, CheckCircle,
    LayoutTemplate, Send, Loader2, ArrowRight, BarChart3, Users, Globe2
} from 'lucide-react'

// 사용자님이 제공해주신 실제 Lemon Squeezy 상품 링크
const PAYMENT_LINK = "https://zxdcf170.lemonsqueezy.com/buy/531b1cb0-f4ee-41c3-9d23-d92ec81dc923"

// --- [Component 1] Landing Page (English) ---
function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30 overflow-hidden font-sans">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="bg-blue-600 p-1.5 rounded-lg"><Mail className="w-5 h-5 text-white" /></div>
                    <span>ColdMail<span className="text-blue-500">.AI</span></span>
                </div>
                <button onClick={onStart} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-bold transition border border-slate-700">
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <header className="relative max-w-5xl mx-auto px-6 py-20 text-center">
                {/* Background Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 animate-fade-in-up">
                    <Sparkles className="w-4 h-4" />
                    <span>v1.0 Now Available Globally</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100">
                    Turn 3 Hours of Research <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Into Just 3 Seconds.</span>
                </h1>

                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                    Stop manually googling prospects. <br className="hidden md:block" />
                    Our AI analyzes <b>News & Hiring Signals</b> to craft hyper-personalized cold emails that actually get replies.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                    <button onClick={onStart} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/25 flex items-center gap-2 transition transform hover:-translate-y-1">
                        Get Started for Free <ArrowRight className="w-5 h-5" />
                    </button>
                    <span className="text-slate-500 text-sm font-medium px-4">💳 No credit card required</span>
                </div>
            </header>

            {/* Features Grid */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-slate-900/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/50 transition">
                        <div className="w-12 h-12 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Deep Intelligence</h3>
                        <p className="text-slate-400 leading-relaxed">
                            We go beyond basic news. We analyze <b>Growth Signals</b> and <b>Hiring Trends</b> to find the perfect "Why Now" hook.
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-slate-900/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/50 transition">
                        <div className="w-12 h-12 bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                            <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Bulk Automation</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Upload your lead list (CSV/Excel). Our AI will research and write personalized emails for <b>100+ leads</b> in minutes.
                        </p>
                    </div>
                    {/* Feature 3 */}
                    <div className="bg-slate-900/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/50 transition">
                        <div className="w-12 h-12 bg-green-900/50 rounded-2xl flex items-center justify-center mb-6 text-green-400">
                            <Globe2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Multi-Language</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Targeting global markets? Generate native-level emails in <b>English, Korean, Japanese, and Spanish</b> instantly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 text-center border-t border-slate-800 bg-slate-900/30">
                <h2 className="text-3xl font-bold mb-6">Ready to scale your outreach?</h2>
                <button onClick={onStart} className="px-10 py-4 bg-white text-slate-900 hover:bg-slate-200 rounded-full font-bold text-lg shadow-xl transition transform hover:-translate-y-1">
                    Start Writing Now
                </button>
            </section>

            <footer className="py-8 text-center text-slate-600 text-sm">
                © 2025 ColdMail.AI Inc. All rights reserved.
            </footer>
        </div>
    )
}

// --- [Component 2] App Entry & Login (English) ---
function App() {
    const [showLanding, setShowLanding] = useState(true)
    const [session, setSession] = useState(null)
    const [credits, setCredits] = useState(0)
    const [emailInput, setEmailInput] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                setShowLanding(false)
                fetchCredits(session.user.id)
            }
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) fetchCredits(session.user.id)
        })
        return () => subscription.unsubscribe()
    }, [])

    const fetchCredits = async (userId) => {
        const { data } = await supabase.from('profiles').select('credits').eq('id', userId).single()
        if (data) setCredits(data.credits)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoadingLogin(true)
        const { error } = await supabase.auth.signInWithOtp({ email: emailInput })
        if (error) alert(error.message)
        else alert('Check your inbox! We sent you a magic link. 🚀')
        setLoadingLogin(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setShowLanding(true);
    }

    if (showLanding && !session) return <LandingPage onStart={() => setShowLanding(false)} />

    // Login Screen
    if (!session) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <button onClick={() => setShowLanding(true)} className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 font-bold z-20">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back
                </button>

                <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl shadow-2xl relative z-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-slate-400 mb-8">Your AI Sales Agent is ready.</p>
                    <div className="relative mb-6">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                        <input type="email" placeholder="name@company.com" value={emailInput} onChange={e => setEmailInput(e.target.value)}
                            className="w-full bg-slate-800 border-slate-600 rounded-xl py-3 pl-12 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <button onClick={handleLogin} disabled={loadingLogin} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-500/25">
                        {loadingLogin ? 'Sending...' : 'Send Magic Link'}
                    </button>
                    <p className="mt-4 text-xs text-slate-500">Password-free secure login via Supabase</p>
                </div>
            </div>
        )
    }

    return <MainApp session={session} credits={credits} refreshCredits={() => fetchCredits(session.user.id)} onLogout={handleLogout} />
}

// --- [Component 3] Main Dashboard (English) ---
function MainApp({ session, credits, refreshCredits, onLogout }) {
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

    // 💰 Payment Logic: Redirect to Lemon Squeezy
    const handlePayment = () => {
        // Append user_id to verify payment later via Webhook
        const checkoutUrl = `${PAYMENT_LINK}?checkout[custom][user_id]=${session.user.id}`;
        window.location.href = checkoutUrl;
    };

    const handleGenerate = async () => {
        if (!company) return alert("Please enter a company name.");

        // 💳 Credit Check & Trigger Payment
        if (credits <= 0) {
            if (confirm("Insufficient credits! Would you like to recharge 50 credits for $9?")) {
                handlePayment();
            }
            return;
        }

        setLoading(true); setResult(null);
        try {
            const res = await fetch('https://coldmail-ai-saas.onrender.com/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: session.user.id, company_name: company,
                    my_service: myService, service_description: desc,
                    language, tone, include_hiring: hiring
                })
            });
            const data = await res.json();
            if (res.ok) { setResult(data); refreshCredits(); }
            else { alert("Failed: " + data.detail); }
        } catch (e) { alert("Server Error"); } finally { setLoading(false); }
    };

    const handleBulkGenerate = async () => {
        if (!file) return alert("Please upload a file.");
        // 💳 Credit Check for Bulk? (You might want strict logic here too)
        if (credits <= 0) {
            if (confirm("Insufficient credits! Recharge now?")) handlePayment();
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', session.user.id);
            formData.append('my_service', myService);
            formData.append('service_description', desc);
            formData.append('language', language);
            formData.append('tone', tone);
            formData.append('include_hiring', String(hiring));

            const res = await fetch('https://coldmail-ai-saas.onrender.com/generate_bulk', { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = "result.csv";
                document.body.appendChild(a); a.click();
                alert("Download Complete!");
            }
        } catch (e) { alert("Server Error"); } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
            <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg"><Mail className="w-5 h-5 text-white" /></div>
                        <span className="font-bold text-xl text-white tracking-tight">ColdMail<span className="text-blue-500">.AI</span> Pro</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        {/* 💰 Recharge Button */}
                        <button
                            onClick={handlePayment}
                            className="px-3 py-1 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 rounded-full text-sm font-bold flex gap-2 items-center text-slate-300 transition group"
                            title="Click to Recharge"
                        >
                            <Zap className={`w-4 h-4 ${credits > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'}`} />
                            {credits} Credits
                            <span className="bg-yellow-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded ml-1 group-hover:inline-block hidden">
                                + Add
                            </span>
                        </button>

                        <button onClick={onLogout} title="Log out" className="text-slate-400 hover:text-white"><LogOut className="w-5 h-5" /></button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <div className="bg-slate-800 p-1 rounded-xl flex gap-1">
                        <button onClick={() => setMode('single')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${mode === 'single' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Single Analysis</button>
                        <button onClick={() => setMode('bulk')} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${mode === 'bulk' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Bulk (Excel)</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-5">
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
                            <h3 className="font-bold text-white mb-5 flex gap-2 items-center"><Globe className="w-5 h-5 text-blue-500" /> Campaign Settings</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Language</label>
                                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition" value={language} onChange={e => setLanguage(e.target.value)}>
                                        <option value="English">🇺🇸 English</option>
                                        <option value="Korean">🇰🇷 Korean</option>
                                        <option value="Japanese">🇯🇵 Japanese</option>
                                        <option value="Spanish">🇪🇸 Spanish</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Tone & Manner</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                                        <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 pl-10 text-white outline-none appearance-none focus:border-blue-500 transition" value={tone} onChange={e => setTone(e.target.value)}>
                                            <option value="Professional">👔 Professional</option>
                                            <option value="Friendly">😊 Friendly</option>
                                            <option value="Direct">⚡ Direct</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 bg-slate-800 p-3 rounded-lg border cursor-pointer transition ${hiring ? 'border-green-500/50 bg-green-900/10' : 'border-slate-700'}`} onClick={() => setHiring(!hiring)}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${hiring ? 'bg-green-500 border-green-500' : 'border-slate-500'}`}>
                                        {hiring && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${hiring ? 'text-green-400' : 'text-slate-300'}`}>Include Hiring Signals</span>
                                </div>

                                <hr className="border-slate-800 my-4" />

                                <div>
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">My Service</label>
                                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" value={myService} onChange={e => setMyService(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Description</label>
                                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white resize-none focus:border-blue-500 outline-none" rows="3" value={desc} onChange={e => setDesc(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        {mode === 'single' ? (
                            <div className="h-full flex flex-col gap-6">
                                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
                                    <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Target Company Name</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                            <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 pl-10 text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600"
                                                placeholder="Ex: Toss, Naver, Netflix" value={company} onChange={e => setCompany(e.target.value)} />
                                        </div>
                                        <button onClick={handleGenerate} disabled={loading}
                                            className={`px-8 rounded-xl font-bold text-lg shadow-lg flex items-center gap-2 transition ${loading ? 'bg-slate-700 text-slate-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'}`}>
                                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />} Generate
                                        </button>
                                    </div>
                                </div>

                                {result ? (
                                    <div className="space-y-4">
                                        {/* News Card */}
                                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up">
                                            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs font-bold text-slate-600 uppercase">Latest News</span>
                                            </div>
                                            <div className="p-5">
                                                {result.news && result.news.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {result.news.map((item, i) => (
                                                            <li key={i} className="text-sm text-slate-700 flex gap-2 items-start leading-relaxed">
                                                                <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p className="text-sm text-slate-400">No recent news found.</p>}
                                            </div>
                                        </div>

                                        {/* Hiring Card */}
                                        {(result.hiring && result.hiring.length > 0) && (
                                            <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden animate-fade-in-up delay-100">
                                                <div className="bg-green-50 px-5 py-3 border-b border-green-100 flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-green-600" />
                                                    <span className="text-xs font-bold text-green-700 uppercase">Hiring & Growth Signals</span>
                                                </div>
                                                <div className="p-5">
                                                    <ul className="space-y-2">
                                                        {result.hiring.map((item, i) => (
                                                            <li key={i} className="text-sm text-slate-700 flex gap-2 items-start leading-relaxed">
                                                                <span className="text-green-500 font-bold text-xs mt-0.5 px-1.5 py-0.5 bg-green-100 rounded">HIRING</span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {/* Email Card */}
                                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in-up delay-200">
                                            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Send className="w-4 h-4 text-purple-600" />
                                                    <span className="text-xs font-bold text-slate-600 uppercase">Generated Email Draft</span>
                                                </div>
                                                <button onClick={() => { navigator.clipboard.writeText(result.email); alert("Copied to clipboard!") }}
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition">
                                                    <LayoutTemplate className="w-3 h-3" /> Copy
                                                </button>
                                            </div>
                                            <div className="p-6 bg-white">
                                                <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-base bg-transparent p-0 border-none">
                                                    {result.email}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full bg-slate-900/50 border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-slate-800 min-h-[400px]">
                                        <Sparkles className="w-10 h-10 text-slate-700 mb-4 opacity-50" />
                                        <p className="text-sm">Enter a company name to start analysis</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Bulk Mode UI (English)
                            <div className="h-full bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                                    <FileSpreadsheet className="w-10 h-10 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Bulk Generation</h3>
                                <p className="text-slate-400 mb-8 max-w-sm">Upload a CSV/Excel file with a 'Company' column. We will analyze all of them at once.</p>

                                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-600 hover:border-slate-500 rounded-xl w-full max-w-md p-10 transition group mb-6">
                                    <input type="file" className="hidden" accept=".csv, .xlsx" onChange={(e) => setFile(e.target.files[0])} />
                                    <Upload className="w-8 h-8 text-slate-500 group-hover:text-white mx-auto mb-3" />
                                    <span className="text-slate-400 group-hover:text-white font-medium block">
                                        {file ? file.name : "Click to Upload File"}
                                    </span>
                                </label>

                                <button onClick={handleBulkGenerate} disabled={loading || !file}
                                    className={`w-full max-w-md py-4 rounded-xl font-bold text-lg shadow-lg ${loading || !file ? 'bg-slate-700 text-slate-500' : 'bg-purple-600 text-white hover:bg-purple-500'}`}>
                                    {loading ? 'Processing...' : '🚀 Start Bulk Processing'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App