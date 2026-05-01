import { motion } from "framer-motion";
import { Trophy, Activity, Globe, Medal, ChevronUp, ChevronDown } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const kpis = [
  { label: "Engagement Score", value: "3.6", icon: Activity },
  { label: "Top Category", value: "Technical", icon: Trophy },
  { label: "Internal/External", value: "60/40", icon: Globe },
];

const topBodies = [
  { rank: 1, name: "CSE Dept", score: "98.5", revenue: "₹45,000", trend: "up" },
  { rank: 2, name: "Cultural Committee", score: "94.2", revenue: "₹32,000", trend: "up" },
  { rank: 3, name: "Design Society", score: "89.0", revenue: "₹12,500", trend: "down" },
  { rank: 4, name: "Entrepreneurship Cell", score: "88.5", revenue: "₹28,000", trend: "up" },
  { rank: 5, name: "Literary Society", score: "82.1", revenue: "₹5,000", trend: "down" },
];

const radarData = [
  { subject: 'Technical', A: 120, fullMark: 150 },
  { subject: 'Cultural', A: 98, fullMark: 150 },
  { subject: 'Business', A: 86, fullMark: 150 },
  { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'Sports', A: 85, fullMark: 150 },
  { subject: 'Literary', A: 65, fullMark: 150 },
];

const topColleges = [
  { name: 'NIT', participants: 450 },
  { name: 'IIT', participants: 320 },
  { name: 'BITS', participants: 280 },
  { name: 'VIT', participants: 250 },
  { name: 'SRM', participants: 190 },
];

export default function Leaderboards() {
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
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Organizing Bodies</h3>
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
                    <div className="text-xs text-slate-500">Rev: {body.revenue}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-indigo-600">{body.score}</div>
                  {body.trend === 'up' ? (
                    <ChevronUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Student Engagement Profile</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Engagement" dataKey="A" stroke="#4f46e5" fill="#818cf8" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Participating Colleges</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topColleges} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} width={50} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="participants" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Activity Heatmap</h3>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 180 }).map((_, i) => {
            const intensity = Math.floor(Math.random() * 5);
            return (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-sm ${
                  intensity === 0 ? 'bg-slate-100' :
                  intensity === 1 ? 'bg-indigo-100' :
                  intensity === 2 ? 'bg-indigo-300' :
                  intensity === 3 ? 'bg-indigo-500' :
                  'bg-indigo-700'
                }`}
                title={`Activity level: ${intensity}`}
              />
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
