import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  Calendar, Trophy, BookOpen, Star, CheckCircle, Clock, ArrowRight, Flame
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis
} from "recharts";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const myStats = [
  { label: "Events Attended", value: "12", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Wins / Podiums", value: "3", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Workshops Done", value: "5", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Engagement Score", value: "8.4", icon: Star, color: "text-purple-600", bg: "bg-purple-50" },
];

const myRegistrations = [
  { id: "REG-041", event: "HackCU 24-Hour Hackathon", date: "May 15, 2026", status: "Confirmed", category: "Technical" },
  { id: "REG-042", event: "UI/UX Masterclass", date: "Jun 10, 2026", status: "Confirmed", category: "Workshop" },
  { id: "REG-043", event: "Startup Pitch Deck", date: "May 22, 2026", status: "Pending Payment", category: "Business" },
];

const upcomingEvents = [
  { title: "Dance Battle", date: "Jun 15, 2026", category: "Cultural", daysLeft: 45, price: "₹100" },
  { title: "Robotics Championship", date: "Jul 5, 2026", category: "Technical", daysLeft: 65, price: "Free" },
  { title: "Open Mic Night", date: "May 18, 2026", category: "Cultural", daysLeft: 17, price: "₹150" },
];

const radarData = [
  { subject: "Technical", student: 80, avg: 55 },
  { subject: "Cultural", student: 60, avg: 50 },
  { subject: "Workshop", student: 90, avg: 60 },
  { subject: "Sports", student: 40, avg: 45 },
  { subject: "Management", student: 70, avg: 50 },
];

const activityFeed = [
  { text: "Registered for HackCU Hackathon", time: "2 days ago", type: "register" },
  { text: "Completed UI/UX Masterclass", time: "1 week ago", type: "complete" },
  { text: "Won 2nd place at Debate Championship", time: "3 weeks ago", type: "win" },
  { text: "Registered for Startup Pitch Deck", time: "1 month ago", type: "register" },
];

const statusStyle: Record<string, string> = {
  "Confirmed": "bg-emerald-100 text-emerald-700",
  "Pending Payment": "bg-amber-100 text-amber-700",
};

export default function StudentDashboard() {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const handleRegister = (idx: number) => {
    setRegisteredEvents((prev) => prev.includes(idx) ? prev : [...prev, idx]);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-8">

      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Welcome back, Vemana Hemanth</h1>
          <p className="text-slate-500 mt-1">CSE Department · 3rd Year · Student ID: CU2023CSE0047</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">12-day activity streak</span>
          </div>
          <Link href="/student/events" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-indigo-600/20" data-testid="btn-browse-events">
            Browse Events
          </Link>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {myStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 anti-gravity flex items-center gap-4" data-testid={`student-kpi-${i}`}>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* My Registrations */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-slate-800">My Registrations</h2>
            <Link href="/student/registrations" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {myRegistrations.map((reg) => (
              <div key={reg.id} className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-slate-100 hover:bg-white/80 transition-all" data-testid={`reg-row-${reg.id}`}>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-400">{reg.id}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{reg.event}</p>
                    <p className="text-xs text-slate-500">{reg.date} · {reg.category}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[reg.status]}`}>
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3" data-testid={`activity-${i}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.type === "win" ? "bg-orange-100" : item.type === "complete" ? "bg-emerald-100" : "bg-indigo-100"}`}>
                  {item.type === "win"
                    ? <Trophy className="w-3.5 h-3.5 text-orange-500" />
                    : item.type === "complete"
                    ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    : <Clock className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div>
                  <p className="text-sm text-slate-700 leading-snug">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row: Radar + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Engagement Radar */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-1">My Engagement Profile</h2>
          <p className="text-xs text-slate-500 mb-4">Your participation vs. university average</p>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(0,0,0,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Radar name="You" dataKey="student" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} strokeWidth={2} />
              <Radar name="Avg" dataKey="avg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} strokeWidth={1.5} strokeDasharray="4 4" />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-2 justify-center">
            <span className="flex items-center gap-2 text-xs text-slate-600"><span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> You</span>
            <span className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 rounded-full bg-slate-400 inline-block" /> University Avg</span>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="glass-panel p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-slate-800">Events You May Like</h2>
            <Link href="/student/events" className="text-indigo-600 text-sm font-semibold hover:underline">See all</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-slate-100 hover:bg-white/80 transition-all group" data-testid={`upcoming-event-${i}`}>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{ev.title}</p>
                  <p className="text-xs text-slate-500">{ev.date} · {ev.category}</p>
                  <span className="text-xs text-orange-600 font-medium">{ev.daysLeft} days left · {ev.price}</span>
                </div>
                <button
                  onClick={() => handleRegister(i)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${registeredEvents.includes(i) ? "bg-emerald-100 text-emerald-700 cursor-default" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"}`}
                  data-testid={`btn-register-upcoming-${i}`}
                >
                  {registeredEvents.includes(i) ? "Registered" : "Register"}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
