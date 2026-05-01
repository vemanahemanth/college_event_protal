import { motion } from "framer-motion";
import { Trophy, Activity, Globe, Medal, ChevronUp, ChevronDown } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useGetTopColleges, useGetStudentEngagement, useGetKPIs } from "@workspace/api-client-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Leaderboards() {
  const { data: colleges, isLoading: isCollegesLoading } = useGetTopColleges();
  const { data: students, isLoading: isStudentsLoading } = useGetStudentEngagement();
  const { data: kpisData, isLoading: isKPIsLoading } = useGetKPIs();

  if (isCollegesLoading || isStudentsLoading || isKPIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const kpis = [
    { label: "Engagement Score", value: "8.4", icon: Activity },
    { label: "Top College", value: colleges?.[0]?.name || "N/A", icon: Trophy },
    { label: "Total Registrations", value: kpisData?.totalRegistrations?.toLocaleString() || "0", icon: Globe },
  ];

  const topColleges = colleges?.map(c => ({
    name: c.name,
    participants: c.participants
  })) || [];

  const maxRegistrations = students?.[0]?.registrations || 100;
  
  const radarData = students?.slice(0, 5).map(s => ({
    subject: s.fullName.split(' ')[0],
    A: Math.round((s.registrations / maxRegistrations) * 100),
    fullMark: 100
  })) || [];

  const topBodies = students?.slice(0, 5).map((s, i) => ({
    rank: i + 1,
    name: s.fullName,
    score: (s.registrations).toFixed(1),
    revenue: `₹${s.registrations * 100}`,
    trend: "up"
  })) || [];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Leaderboards</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-panel p-6 anti-gravity flex items-center">
            <div className="p-4 rounded-full bg-indigo-50 mr-4">
              <kpi.icon className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{kpi.label}</div>
              <div className="text-3xl font-bold text-slate-800">{kpi.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performers</h3>
          <div className="space-y-4 flex-1">
            {topBodies.map((body, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    body.rank === 1 ? 'bg-orange-100 text-orange-600' :
                    body.rank === 2 ? 'bg-slate-200 text-slate-600' :
                    body.rank === 3 ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {body.rank}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{body.name}</div>
                    <div className="text-xs text-slate-500">Registrations: {body.score}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <ChevronUp className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Engagement Radar</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Engagement" dataKey="A" stroke="#4f46e5" fill="#818cf8" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">College Participation</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topColleges} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} width={100} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="participants" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
