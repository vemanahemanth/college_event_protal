import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import campusBg from "@/assets/campus.jpg";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "student") {
      setLocation("/student");
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <>
      <div className="bg-campus" style={{ backgroundImage: `url(${campusBg})` }} />
      <div className="min-h-screen w-full flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-stretch">

          {/* Left panel — branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex flex-col justify-center glass-panel p-10 flex-1"
            style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.18), rgba(255,255,255,0.82))" }}
          >
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-600/30">
                <span className="text-white text-2xl font-extrabold">EI</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
                Event Intelligence Portal
              </h2>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                Chanakya University's centralized platform for event management, participant tracking, and academic analytics.
              </p>
            </div>
            {/* Role selector cards */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sign in as</p>
              {[
                { id: "student", label: "Student", desc: "Browse events, track registrations, view your rank" },
                { id: "coordinator", label: "Coordinator", desc: "Manage your department's events and participants" },
                { id: "admin", label: "Administrator", desc: "Full access to all admin and analytics tools" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`w-full text-left rounded-xl p-4 transition-all border ${role === r.id ? "border-indigo-500 bg-indigo-50/80 shadow-sm" : "border-slate-200/60 bg-white/40 hover:bg-white/60"}`}
                  data-testid={`role-card-${r.id}`}
                >
                  <p className={`font-semibold text-sm ${role === r.id ? "text-indigo-700" : "text-slate-700"}`}>{r.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right panel — form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            className="glass-panel w-full md:max-w-sm p-8 md:p-10 anti-gravity"
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl">&#9993;</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {isLogin ? "Sign in to access your portal" : "Register for the Event Intelligence Portal"}
              </p>
            </div>

            {/* Mobile-only role toggle */}
            <div className="flex md:hidden rounded-full bg-slate-100/80 p-1 mb-5">
              {["student", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-all capitalize ${role === r ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                  data-testid={`mobile-role-${r}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 text-sm"
                    placeholder="Rahul Sharma"
                    data-testid="input-name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">University Email</label>
                <input
                  type="email"
                  className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="you@chanakyauniversity.edu.in"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  {isLogin && <button type="button" className="text-xs text-indigo-600 hover:text-indigo-700" data-testid="btn-forgot-password">Forgot password?</button>}
                </div>
                <input
                  type="password"
                  className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="••••••••"
                  required
                  data-testid="input-password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">I am a</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 text-sm"
                    data-testid="select-role"
                  >
                    <option value="student">Student</option>
                    <option value="coordinator">Event Coordinator</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-3 font-bold text-sm transition-all mt-2 shadow-lg shadow-slate-800/20"
                data-testid="button-submit-auth"
              >
                {isLogin ? "Sign In →" : "Continue →"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 border-t border-slate-200/50 pt-5">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                data-testid="button-toggle-auth"
              >
                {isLogin ? "Sign up" : "Sign In"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
