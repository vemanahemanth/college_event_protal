import { motion } from "framer-motion";
import { Calendar, Users, Ticket, Trophy, Star, IndianRupee } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useGetKPIs, useGetTimeline, useGetCategoriesStats } from "@workspace/api-client-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { data: kpisData, isLoading: isKPIsLoading } = useGetKPIs();
  const { data: timelineData, isLoading: isTimelineLoading } = useGetTimeline();
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoriesStats();

  const kpis = [
    { label: "Total Events", value: kpisData?.totalEvents?.toString() || "0", icon: Calendar },
    { label: "Participants", value: kpisData?.totalParticipants?.toLocaleString() || "0", icon: Users },
    { label: "Registrations", value: kpisData?.totalRegistrations?.toLocaleString() || "0", icon: Ticket },
    { label: "Competitions", value: kpisData?.totalCompetitions?.toString() || "0", icon: Trophy },
    { label: "Flagship Events", value: kpisData?.flagshipEvents?.toString() || "5", icon: Star, highlight: true },
    { label: "Prize Pool", value: kpisData?.prizePool || "₹0", icon: IndianRupee },
  ];

  if (isKPIsLoading || isTimelineLoading || isCategoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Admin Intelligence Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className={`glass-panel p-4 anti-gravity flex flex-col relative overflow-hidden ${kpi.highlight ? 'ring-2 ring-orange-500/50' : ''}`}>
            {kpi.highlight && <div className="absolute inset-0 bg-orange-500/5" />}
            <div className="flex justify-between items-start mb-2 relative z-10">
              <kpi.icon className={`w-5 h-5 ${kpi.highlight ? 'text-orange-500' : 'text-indigo-500'}`} />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1 relative z-10">{kpi.value}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider relative z-10">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-2 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Participation Timeline (2006-2026)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10}} 
                  dy={10} 
                  interval={1}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="participants" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6, fill: '#f97316', stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Event Categories</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
