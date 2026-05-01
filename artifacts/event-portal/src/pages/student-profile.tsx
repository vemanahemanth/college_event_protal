import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, GraduationCap, ShieldCheck, Award, Calendar } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const achievements = [
  { label: "2nd Place – National Debate", date: "Apr 2026", icon: Award, color: "text-silver-400", bg: "bg-slate-100" },
  { label: "Finalist – Inter-College Hackathon", date: "Mar 2026", icon: Award, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Participated – Cultural Fest Samyuthi", date: "Feb 2026", icon: Calendar, color: "text-pink-500", bg: "bg-pink-50" },
  { label: "3rd Place – Coding Sprint", date: "Jan 2026", icon: Award, color: "text-orange-500", bg: "bg-orange-50" },
];

export default function StudentProfile() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-6">

      {/* Header */}
      <motion.div variants={itemVariants} className="glass-panel p-6">
        <h1 className="text-3xl font-extrabold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account information and security settings</p>
      </motion.div>

      {/* Avatar + Personal Info + Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Avatar Card */}
        <motion.div variants={itemVariants} className="glass-panel p-8 flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.1), rgba(255,255,255,0.85))" }}>
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold mb-4 shadow-lg shadow-indigo-600/25">
            VH
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">Vemana Hemanth Babu</h2>
          <p className="text-indigo-600 font-semibold text-sm mt-1">Student</p>
          <div className="mt-4 w-full space-y-2 text-sm text-slate-600 text-left">
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>Computer Science & Engineering</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>3rd Year · Batch 2023–27</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">vemanahemanthbabu@gmail.com</span>
            </div>
          </div>
        </motion.div>

        {/* Personal Info */}
        <motion.div variants={itemVariants} className="glass-panel p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" /> Personal Information
          </h2>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: "Vemana Hemanth Babu", icon: User },
              { label: "University Email", value: "vemanahemanthbabu@gmail.com", icon: Mail },
              { label: "Role", value: "Student", icon: ShieldCheck },
              { label: "Student ID", value: "CU2023CSE0047", icon: GraduationCap },
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.label}>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{field.label}</label>
                  <div className="mt-1 flex items-center gap-2 bg-white/60 border border-slate-200/60 rounded-lg px-4 py-3" data-testid={`profile-field-${field.label.toLowerCase().replace(/ /g, "-")}`}>
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-800 text-sm font-medium">{field.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">
            <ShieldCheck className="w-5 h-5 text-indigo-500" /> Security
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Current Password", value: currentPw, setter: setCurrentPw, id: "input-current-pw" },
              { label: "New Password", value: newPw, setter: setNewPw, id: "input-new-pw" },
              { label: "Confirm New Password", value: confirmPw, setter: setConfirmPw, id: "input-confirm-pw" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{f.label}</label>
                <input
                  type="password"
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-slate-800"
                  data-testid={f.id}
                />
              </div>
            ))}
            <button
              type="submit"
              className={`w-full rounded-lg py-3 font-bold text-sm transition-all shadow-md mt-2 ${saved ? "bg-emerald-600 text-white shadow-emerald-600/20" : "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20"}`}
              data-testid="btn-update-password"
            >
              {saved ? "Password Updated!" : "Update Password"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div variants={itemVariants} className="glass-panel p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" /> My Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {achievements.map((ach, i) => {
            const Icon = ach.icon;
            return (
              <div key={i} className="flex items-center gap-3 bg-white/60 border border-slate-100 rounded-xl p-4 anti-gravity" data-testid={`achievement-${i}`}>
                <div className={`w-10 h-10 rounded-xl ${ach.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${ach.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{ach.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{ach.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
