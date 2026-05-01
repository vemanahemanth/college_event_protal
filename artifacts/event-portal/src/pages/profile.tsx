import { motion } from "framer-motion";
import { User, Mail, Shield, ShieldCheck } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Profile() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="glass-panel p-8 anti-gravity flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
            <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
              <User className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-center border-b border-slate-200/50 pb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-lg font-bold text-slate-800">System Admin</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-slate-200/50 pb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-lg font-bold text-slate-800">admin@chanakya.edu.in</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-slate-200/50 pb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Role</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-slate-800 mr-2">Admin</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8 anti-gravity flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Security</h2>
            <div className="p-2 bg-amber-100 rounded-full text-amber-600">
              <Shield className="w-6 h-6" />
            </div>
          </div>
          
          <form className="space-y-5 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Current Password</label>
              <input 
                type="password" 
                className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
                placeholder="••••••••"
                required
                data-testid="input-current-password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">New Password</label>
              <input 
                type="password" 
                className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
                placeholder="••••••••"
                required
                data-testid="input-new-password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
                placeholder="••••••••"
                required
                data-testid="input-confirm-password"
              />
            </div>
            
            <div className="mt-auto pt-6">
              <button 
                type="submit" 
                className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-3 font-bold transition-all shadow-lg shadow-slate-800/20"
                data-testid="btn-update-password"
              >
                Update Password
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
