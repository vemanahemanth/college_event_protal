import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Trophy, BookOpen, Star, ArrowRight } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";
import { useGetKPIs, useListEvents, useListRegistrations, useGetCategoriesStats } from "@workspace/api-client-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function StudentDashboard() {
  const { data: kpisData, isLoading: isKPIsLoading } = useGetKPIs();
  const { data: eventsList, isLoading: isEventsLoading } = useListEvents({ limit: 3 });
  const { data: myRegs, isLoading: isRegsLoading } = useListRegistrations();
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoriesStats();

  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  if (isKPIsLoading || isEventsLoading || isRegsLoading || isCategoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const myStats = [
    { label: "Events Attended", value: myRegs?.length.toString() || "0", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Wins / Podiums", value: "0", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Workshops Done", value: myRegs?.filter(r => r.categoryName === 'Workshop').length.toString() || "0", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Engagement Score", value: "7.2", icon: Star, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const categories = ["Technical", "Cultural", "Sports", "Management"];
  const totalParticipants = kpisData?.totalParticipants || 1;
  const radarData = categories.map(cat => {
    const studentCount = myRegs?.filter(r => r.categoryName === cat).length || 0;
    const catStat = categoryData?.find((c: any) => c.name === cat);
    const avgCount = catStat ? (catStat.value / totalParticipants) : 0;
    return {
      subject: cat,
      student: Math.min(studentCount * 30, 100),
      avg: Math.min(avgCount * 30, 100)
    };
  });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-8">

      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Welcome back, Student</h1>
          <p className="text-slate-500 mt-1">Chanakya University Portal · Student Access</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student/events" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-indigo-600/20">
            Browse Events
          </Link>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {myStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 anti-gravity flex items-center gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-slate-800">My Registrations</h2>
            <Link href="/student/registrations" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {myRegs?.slice(0, 3).map((reg: any) => (
              <div key={reg.registrationId} className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-slate-100 hover:bg-white/80 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-400">#{reg.registrationId}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{reg.eventName}</p>
                    <p className="text-xs text-slate-500">{new Date(reg.eventDate).toLocaleDateString()} · {reg.categoryName}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700`}>
                  Confirmed
                </span>
              </div>
            ))}
            {(!myRegs || myRegs.length === 0) && (
              <p className="text-center text-slate-500 py-4">No registrations yet. Go find some events!</p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-5">My Engagement Profile</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(0,0,0,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="You" dataKey="student" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} strokeWidth={2} />
              <Radar name="Avg" dataKey="avg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} strokeWidth={1.5} strokeDasharray="4 4" />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-slate-800">Events You May Like</h2>
          <Link href="/student/events" className="text-indigo-600 text-sm font-semibold hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {eventsList?.slice(0, 3).map((ev: any) => (
            <div key={ev.eventId} className="flex flex-col p-4 rounded-xl bg-white/60 border border-slate-100 hover:bg-white/80 transition-all group">
              <div className="mb-3">
                <p className="font-bold text-slate-800 text-sm truncate">{ev.eventName}</p>
                <p className="text-xs text-slate-500">{new Date(ev.eventDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-indigo-600">{ev.registrationFee === '0' ? 'Free' : `₹${ev.registrationFee}`}</span>
                <Link href="/student/events" className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
