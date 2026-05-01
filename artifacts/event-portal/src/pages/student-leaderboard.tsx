import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";
import { Trophy, Medal, Star, TrendingUp, Search } from "lucide-react";
import { useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const radarData = [
  { subject: "Technical", student: 80, avg: 55 },
  { subject: "Cultural", student: 60, avg: 50 },
  { subject: "Workshop", student: 90, avg: 60 },
  { subject: "Sports", student: 40, avg: 45 },
  { subject: "Management", student: 70, avg: 50 },
];

const hallOfFame = [
  { rank: 1, name: "Priya Patel", dept: "CSE", score: 9.8, wins: 7, events: 18, badge: "gold" },
  { rank: 2, name: "Arjun Mehta", dept: "ECE", score: 9.5, wins: 6, events: 15, badge: "silver" },
  { rank: 3, name: "Shreya Iyer", dept: "MBA", score: 9.1, wins: 5, events: 14, badge: "bronze" },
  { rank: 4, name: "Vemana Hemanth", dept: "CSE", score: 8.4, wins: 3, events: 12, badge: "none" },
  { rank: 5, name: "Rahul Sharma", dept: "Mech", score: 8.1, wins: 3, events: 11, badge: "none" },
  { rank: 6, name: "Anjali Das", dept: "Design", score: 7.9, wins: 2, events: 10, badge: "none" },
  { rank: 7, name: "Kiran Reddy", dept: "CSE", score: 7.6, wins: 2, events: 9, badge: "none" },
  { rank: 8, name: "Nidhi Joshi", dept: "MBA", score: 7.2, wins: 1, events: 9, badge: "none" },
  { rank: 9, name: "Sai Kumar", dept: "ECE", score: 7.0, wins: 1, events: 8, badge: "none" },
  { rank: 10, name: "Jane Doe", dept: "CSE", score: 6.9, wins: 1, events: 8, badge: "none" },
];

const badgeStyle: Record<string, string> = {
  gold: "bg-amber-100 text-amber-700 border border-amber-300",
  silver: "bg-slate-100 text-slate-600 border border-slate-300",
  bronze: "bg-orange-100 text-orange-700 border border-orange-300",
  none: "bg-white/60 text-slate-500 border border-slate-200",
};

const trophyColor: Record<string, string> = {
  gold: "text-amber-500",
  silver: "text-slate-400",
  bronze: "text-orange-400",
  none: "text-slate-300",
};

const kpis = [
  { label: "Your Global Rank", value: "#4", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Engagement Score", value: "8.4", icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Total Wins", value: "3", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Points to #3", value: "+0.7", icon: Medal, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function StudentLeaderboard() {
  const [search, setSearch] = useState("");

  const filtered = hallOfFame.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-6">

      {/* Header */}
      <motion.div variants={itemVariants} className="glass-panel p-6">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-1">Student Leaderboard</h1>
        <p className="text-slate-500">See where you stand among 22,047 students at Chanakya University</p>
      </motion.div>

      {/* Your stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="glass-panel p-5 anti-gravity flex items-center gap-4" data-testid={`student-lb-kpi-${i}`}>
              <div className={`w-12 h-12 rounded-xl ${k.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${k.color}`} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Hall of Fame table */}
        <motion.div variants={itemVariants} className="lg:col-span-3 glass-panel overflow-hidden">
          <div className="p-5 border-b border-slate-100/60 flex justify-between items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Hall of Fame
            </h2>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full bg-white/50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800"
                data-testid="input-hof-search"
              />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/70">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Rank</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Student</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Score</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Wins</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {filtered.map((s) => {
                const isMe = s.name === "Vemana Hemanth";
                return (
                  <tr
                    key={s.rank}
                    className={`transition-colors ${isMe ? "bg-indigo-50/60 hover:bg-indigo-50/80" : "hover:bg-white/50"}`}
                    data-testid={`hof-row-${s.rank}`}
                  >
                    <td className="px-5 py-3.5">
                      <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${badgeStyle[s.badge]}`}>
                        {s.badge !== "none"
                          ? <Trophy className={`w-3.5 h-3.5 ${trophyColor[s.badge]}`} />
                          : s.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${isMe ? "text-indigo-700" : "text-slate-800"}`}>
                            {s.name} {isMe && <span className="text-xs text-indigo-500 font-medium">(You)</span>}
                          </p>
                          <p className="text-xs text-slate-400">{s.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="font-bold text-slate-800">{s.score}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-amber-600 font-semibold">{s.wins}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{s.events}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Radar + "Your rank card" */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">

          {/* Rank highlight card */}
          <div className="glass-panel p-6 flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(255,255,255,0.85))" }}>
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold mb-3">
              VH
            </div>
            <p className="font-extrabold text-slate-800 text-lg">Vemana Hemanth Babu</p>
            <p className="text-slate-500 text-sm">CSE · 3rd Year</p>
            <div className="mt-4 grid grid-cols-3 gap-3 w-full">
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xl font-extrabold text-indigo-600">#4</p>
                <p className="text-xs text-slate-500">Rank</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xl font-extrabold text-orange-500">8.4</p>
                <p className="text-xs text-slate-500">Score</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xl font-extrabold text-amber-600">3</p>
                <p className="text-xs text-slate-500">Wins</p>
              </div>
            </div>
          </div>

          {/* Radar */}
          <div className="glass-panel p-5 flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-1">Engagement Profile</h3>
            <p className="text-xs text-slate-400 mb-3">You vs. university average</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="You" dataKey="student" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} strokeWidth={2} />
                <Radar name="Avg" dataKey="avg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 4" />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />You</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />Avg</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
