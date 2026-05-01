import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/client";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await API.post("/auth/login", form);
      
      // PERSIST AUTH DATA FOR DASHBOARD ACCESS
      // We extract token and user details (id, role) from the backend response
      const { token, user } = res.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role); // Unlocks Admin features in Dashboard
      localStorage.setItem("userId", user.id);     // Filters "My Tasks" correctly
      
      // Smooth SPA transition to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-300 flex items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
              T
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TaskFlow</span>
          </Link>
          <h2 className="text-xl font-semibold text-white tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">Enter your credentials to access your workspace</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="name@company.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400">Forgot?</button>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white hover:text-blue-400 font-bold underline decoration-white/10 underline-offset-4">
                Sign up free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            Secure • Encrypted • Engineering Excellence
          </p>
        </div>
      </div>
    </div>
  );
}