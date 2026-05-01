import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart } from "recharts";

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
  { label: "Total Events", value: "128", change: "+12%", icon: Activity },
  { label: "Total Registrations", value: "3,450", change: "+24%", icon: Users },
  { label: "Avg Attendance", value: "85%", change: "+5%", icon: TrendingUp },
  { label: "Revenue", value: "₹45,000", change: "+18%", icon: DollarSign },
];

const registrationTrends = [
  { name: 'Mon', registrations: 120 },
  { name: 'Tue', registrations: 250 },
  { name: 'Wed', registrations: 180 },
  { name: 'Thu', registrations: 300 },
  { name: 'Fri', registrations: 450 },
  { name: 'Sat', registrations: 600 },
  { name: 'Sun', registrations: 200 },
];

const revenueMomentum = [
  { year: '2006', revenue: 5000 },
  { year: '2010', revenue: 15000 },
  { year: '2015', revenue: 22000 },
  { year: '2020', revenue: 35000 },
  { year: '2026', revenue: 45000 },
];

const deptMatrix = [
  { name: 'CSE', Technical: 80, Cultural: 40 },
  { name: 'Mechanical', Technical: 45, Cultural: 60 },
  { name: 'Business', Technical: 20, Cultural: 90 },
  { name: 'Design', Technical: 30, Cultural: 85 },
];

const topEvents = [
  { name: 'HackCU', current: 300, max: 400 },
  { name: 'Dance Battle', current: 850, max: 1000 },
  { name: 'Startup Pitch', current: 20, max: 50 },
  { name: 'UI/UX Masterclass', current: 58, max: 100 },
];

export default function Analytics() {
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
              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                {kpi.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Registration Trends</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="registrations" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performing Events</h3>
          <div className="space-y-6">
            {topEvents.map((event, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">{event.name}</span>
                  <span className="text-slate-500">{event.current} / {event.max}</span>
                </div>
                <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden flex">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(event.current / event.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-panel p-6 anti-gravity">
          <h3 className="text-lg font-bold text-slate-800 mb-6">20-Year Revenue Momentum</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMomentum}>
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
          <h3 className="text-lg font-bold text-slate-800 mb-6">Departmental Participation Matrix</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptMatrix}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="Technical" stackId="a" fill="#9333ea" />
                <Bar dataKey="Cultural" stackId="a" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
