import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-[#030303] text-slate-400 min-h-screen selection:bg-blue-500/30 font-sans antialiased overflow-x-hidden">
      
      {/* 1. DYNAMIC NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center py-4">
          <div className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">T</div>
            <span className="text-xl font-bold tracking-tight text-white">TaskFlow</span>
          </div>
          <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
            <a href="#roles" className="hover:text-white transition-colors">Access</a>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-44 pb-32 px-6 z-10 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Engineering Workspace v2.0
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-10">
            Manage Projects <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 italic">Effortlessly.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Assign tasks, track progress, and collaborate in real-time. The modern layer for high-performance engineering teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all hover:-translate-y-1">
              Get Started Free
            </Link>
            <Link to="/login" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              Login to Workspace
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENTO FEATURES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          <div className="md:col-span-2 bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Real-time Task Sync</h3>
              <p className="max-w-xs text-slate-500">Every status change and priority shift updated instantly across your entire team.</p>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600/20 blur-[80px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700" />
          </div>

          <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">🛡️</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Role Security</h3>
              <p className="text-sm">Granular Admin & Member permissions built-in.</p>
            </div>
          </div>

          <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">🏗️</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Project Scoping</h3>
              <p className="text-sm">Organize infinite projects within a single unified workspace.</p>
            </div>
          </div>

          {/* UPDATED PROJECT CARD */}
          <div className="md:col-span-2 bg-gradient-to-r from-[#0A0A0C] to-[#121216] border border-white/10 rounded-[2.5rem] p-10 flex items-center gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">Distributed Task Engine</h3>
              <p className="text-slate-500">
                Optimized for high-concurrency environments, supporting **multi-region project scaling**, automated **dependency tracking**, and **event-driven updates** for zero-latency collaboration.
              </p>
            </div>
            <div className="hidden md:flex flex-wrap gap-3 w-1/3 text-white/20 font-black text-3xl opacity-10 uppercase">
              SCALABLE SYNC DEPLOY MONITOR
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW */}
      <section id="workflow" className="py-32 px-6 bg-[#060608] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { s: "01", t: "Initialize", d: "Create your project and define the architecture." },
              { s: "02", t: "Assemble", d: "Invite your team and assign workspace roles." },
              { s: "03", t: "Execute", d: "Assign tasks and set priority milestones." },
              { s: "04", t: "Deploy", d: "Track progress and ship with confidence." }
            ].map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-black text-white/5">{step.s}</div>
                <h4 className="text-xl font-bold text-white">{step.t}</h4>
                <p className="text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROLE-BASED ACCESS */}
      <section id="roles" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Unified Workspace. Split Roles.</h2>
            <p className="text-slate-500 mt-4">Granular control for leaders. Total focus for contributors.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-[#080809] p-12 md:p-16 hover:bg-[#0c0c0e] transition-colors group">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Administrative Suite</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-8">Admin Controls</h3>
              <div className="space-y-6">
                {[
                  { t: "Project Orchestration", d: "High-level oversight of all active workstreams." },
                  { t: "Team Role Management", d: "Assign permissions and manage seat access." },
                  { t: "Global Task Oversight", d: "Monitor velocity and identify team bottlenecks." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="text-blue-500 font-bold mt-1">✅</div>
                    <div>
                      <h4 className="text-white font-bold text-lg group-hover/item:text-blue-400 transition-colors">{item.t}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#080809] p-12 md:p-16 hover:bg-[#0c0c0e] transition-colors">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contributor View</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-8">Member Focus</h3>
              <div className="space-y-6">
                {[
                  { t: "Personal Roadmap View", d: "A curated list of your specific deliverables." },
                  { t: "Real-time Task Updates", d: "Sub-100ms sync for status and priority changes." },
                  { t: "Seamless Collaboration", d: "Integrated feedback loops within every task card." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="text-slate-500 font-bold mt-1">✓</div>
                    <div>
                      <h4 className="text-white font-bold text-lg group-hover/item:text-slate-300 transition-colors">{item.t}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center bg-blue-600 rounded-[4rem] p-20 shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tight leading-none">
              Start managing smarter today.
            </h2>
            <Link to="/signup" className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-2xl hover:scale-105 transition-transform inline-block">
              Sign Up Free
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-20 border-t border-white/5 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">T</div>
             <span className="font-bold text-white tracking-tight">TaskFlow</span>
          </div>
          <div className="text-[11px] text-slate-600 font-black uppercase tracking-[0.3em]">
             Built for Engineering Excellence
          </div>
          <div className="text-xs text-slate-700 font-bold italic">
            © 2026 TASKFLOW ENT.
          </div>
        </div>
      </footer>
    </div>
  );
}