import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Users, Trophy, Building2, MapPin, IndianRupee } from "lucide-react";
import campusBg from "@/assets/campus.jpg";

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
  { label: "Total Events", value: "8", icon: Calendar },
  { label: "Participants", value: "22,047", icon: Users },
  { label: "Competitions", value: "5", icon: Trophy },
  { label: "Departments", value: "6", icon: Building2 },
];

const upcomingEvents = [
  { title: "HackCU 24-Hour Hackathon", date: "May 15, 2026", category: "Technical", location: "Main Auditorium", price: "Free" },
  { title: "Open Mic Night", date: "May 18, 2026", category: "Cultural", location: "Student Center", price: "₹150" },
  { title: "Startup Pitch Deck", date: "May 22, 2026", category: "Business", location: "Seminar Hall B", price: "₹500" },
  { title: "Robotics Workshop", date: "Jun 02, 2026", category: "Workshop", location: "Lab Complex", price: "₹200" },
];

export default function Home() {
  return (
    <>
      <div className="bg-campus" style={{ backgroundImage: `url(${campusBg})` }} />
      <div className="min-h-screen w-full flex flex-col p-6 relative z-10 pt-24">
        <motion.div 
          className="max-w-6xl mx-auto w-full"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 mt-12">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-md">
              Intelligence for <br className="hidden md:block"/> Academic <span className="text-orange-500">Excellence</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium glass-panel p-4 inline-block">
              The precision command center for Chanakya University's events.
            </p>
            <div className="mt-8">
              <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1 inline-block" data-testid="btn-login-hero">
                Access Portal
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {kpis.map((kpi, i) => (
              <div key={i} className="glass-panel p-6 anti-gravity flex flex-col items-center justify-center text-center">
                <kpi.icon className="w-8 h-8 text-orange-500 mb-4" />
                <div className="text-4xl font-bold text-slate-800 mb-1">{kpi.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800 glass-panel px-6 py-2 inline-block">Upcoming Events</h2>
              <Link href="/events" className="text-indigo-600 font-bold glass-panel px-4 py-2 hover:bg-white/90 transition-colors" data-testid="link-all-events">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="glass-panel p-6 anti-gravity flex flex-col h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full mb-4 w-fit">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{event.title}</h3>
                  
                  <div className="mt-auto pt-6 space-y-2">
                    <div className="flex items-center text-slate-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center font-bold text-orange-600 text-sm mt-2">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {event.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
