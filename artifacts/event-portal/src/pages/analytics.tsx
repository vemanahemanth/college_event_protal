import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useGetKPIs, useGetTimeline, useGetRevenueMomentum, useGetDeptMatrix, useListEvents } from "@workspace/api-client-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Analytics() {
  const { data: kpisData, isLoading: isKPIsLoading } = useGetKPIs();
  const { data: timelineData, isLoading: isTimelineLoading } = useGetTimeline();
  const { data: momentumData, isLoading: isMomentumLoading } = useGetRevenueMomentum();
  const { data: matrixData, isLoading: isMatrixLoading } = useGetDeptMatrix();
  const { data: eventsList, isLoading: isEventsLoading } = useListEvents({ limit: 4 });

  const kpis = [
    { label: "Total Events", value: kpisData?.totalEvents?.toString() || "0", icon: Activity },
    { label: "Total Registrations", value: kpisData?.totalRegistrations?.toLocaleString() || "0", icon: Users },
    { label: "Total Participants", value: kpisData?.totalParticipants?.toLocaleString() || "0", icon: TrendingUp },
    { label: "Revenue", value: kpisData?.prizePool || "₹0", icon: DollarSign },
  ];

  if (isKPIsLoading || isTimelineLoading || isMomentumLoading || isMatrixLoading || isEventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Platform Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-panel p-6 anti-gravity flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <kpi.icon className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Registration Trends (2006-2026)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={10} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="participants" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 lg:col-span-1 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performing Events</h3>
          <div className="space-y-6">
            {eventsList?.slice(0, 5).map((event, i) => {
              const registered = event.registeredCount || 0;
              const capacity = event.maxCapacity || 100;
              const percentage = Math.min(Math.round((registered / capacity) * 100), 100);
              
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">{event.eventName}</span>
                    <span className="text-slate-500">{registered} / {capacity}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Long-Term Revenue Momentum (5-Year Intervals)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={momentumData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Colleges Participation Matrix</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matrixData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="technical" stackId="a" fill="#9333ea" />
                <Bar dataKey="cultural" stackId="a" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
