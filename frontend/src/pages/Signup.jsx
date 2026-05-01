import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/client";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-300 flex items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] animate-in fade-in zoom-in duration-500">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TaskFlow</span>
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight">Create your account</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">Build, track, and scale with your team.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSignup} className="space-y-5">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl font-bold text-center animate-shake">
                {error}
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-blue-500 transition-colors">
                Full Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-white/[0.05]"
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-blue-500 transition-colors">
                Email Address
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="john@company.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-white/[0.05]"
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-blue-500 transition-colors">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-white/[0.05]"
                onChange={handleChange}
              />
              {/* Password Hint */}
              <div className="flex gap-1 mt-2 px-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${form.password.length > i * 2 ? 'bg-blue-500' : 'bg-white/5'}`} />
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already using TaskFlow?{" "}
              <Link to="/login" className="text-white hover:text-blue-400 font-bold underline decoration-white/10 underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 flex items-center justify-center gap-3">
             No Credit Card Required • Enterprise Ready
          </p>
        </div>
      </div>
    </div>
  );
}