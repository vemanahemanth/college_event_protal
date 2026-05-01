import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import campusBg from "@/assets/campus.jpg";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <>
      <div className="bg-campus" style={{ backgroundImage: `url(${campusBg})` }} />
      <div className="min-h-screen w-full flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          className="glass-panel w-full max-w-md p-8 md:p-12 anti-gravity"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500">
              {isLogin ? "Sign in to access your portal" : "Register for the event intelligence portal"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                  placeholder="Rahul Sharma"
                  data-testid="input-name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                placeholder="student@chanakya.edu.in"
                required
                data-testid="input-email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                placeholder="••••••••"
                required
                data-testid="input-password"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800" data-testid="select-role">
                  <option value="student">Student</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-3 font-bold transition-all mt-4 shadow-lg shadow-slate-800/20"
              data-testid="button-submit-auth"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-200/50 pt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              data-testid="button-toggle-auth"
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
