import { motion } from "framer-motion";
import { Search, Filter, Grid as GridIcon, Calendar as CalendarIcon, Users, MapPin, IndianRupee } from "lucide-react";
import { useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const eventsList = [
  { id: 1, title: "HackCU 24-Hour Hackathon", date: "May 15, 2026", category: "Technical", location: "Main Auditorium", price: "Free", status: "Scheduled", organizer: "CSE Dept", registered: 120 },
  { id: 2, title: "Open Mic Night", date: "May 18, 2026", category: "Cultural", location: "Student Center", price: "₹150", status: "Scheduled", organizer: "Literary Society", registered: 45 },
  { id: 3, title: "Startup Pitch Deck", date: "May 22, 2026", category: "Business", location: "Seminar Hall B", price: "₹500", status: "Scheduled", organizer: "E-Cell", registered: 30 },
  { id: 4, title: "Robotics Workshop", date: "Jun 02, 2026", category: "Workshop", location: "Lab Complex", price: "₹200", status: "Completed", organizer: "Tech Club", registered: 85 },
  { id: 5, title: "UI/UX Masterclass", date: "Jun 10, 2026", category: "Workshop", location: "Design Studio", price: "Free", status: "Scheduled", organizer: "Design Society", registered: 60 },
  { id: 6, title: "Dance Battle", date: "Jun 15, 2026", category: "Cultural", location: "Open Air Theatre", price: "₹100", status: "Scheduled", organizer: "Dance Club", registered: 150 },
];

export default function Events() {
  const [view, setView] = useState<"grid" | "calendar">("grid");

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Event Discovery</h1>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 glass-panel overflow-hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full bg-transparent border-none pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800"
              data-testid="input-search-events"
            />
          </div>
          
          <button className="glass-panel p-2 text-slate-600 hover:text-indigo-600 transition-colors anti-gravity" data-testid="btn-filter">
            <Filter className="w-5 h-5" />
          </button>
          
          <div className="glass-panel flex p-1 rounded-lg">
            <button 
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-orange-500 text-white" : "text-slate-500 hover:bg-slate-100/50"}`}
              data-testid="btn-view-grid"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("calendar")}
              className={`p-1.5 rounded-md transition-colors ${view === "calendar" ? "bg-orange-500 text-white" : "text-slate-500 hover:bg-slate-100/50"}`}
              data-testid="btn-view-calendar"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => (
          <motion.div key={event.id} variants={itemVariants} className="glass-panel p-6 anti-gravity flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100/80 text-indigo-800 text-xs font-bold rounded-full">
                {event.category}
              </span>
              <span className={`inline-block px-2 py-1 text-xs font-bold rounded border ${
                event.status === "Scheduled" ? "bg-orange-100/80 border-orange-200 text-orange-700" : "bg-slate-100/80 border-slate-200 text-slate-600"
              }`}>
                {event.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">{event.title}</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">by {event.organizer}</p>
            
            <div className="mt-auto space-y-3">
              <div className="flex items-center text-slate-600 text-sm">
                <CalendarIcon className="w-4 h-4 mr-2 text-indigo-400" />
                {event.date}
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                {event.location}
              </div>
              
              <div className="pt-4 mt-2 border-t border-slate-200/50 flex items-center justify-between">
                <div className="flex items-center text-sm font-bold text-slate-700">
                  <Users className="w-4 h-4 mr-1 text-slate-400" />
                  {event.registered}
                </div>
                <div className="flex items-center font-bold text-orange-600">
                  {event.price !== "Free" && <IndianRupee className="w-3 h-3 mr-1" />}
                  {event.price}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full py-3 bg-indigo-600 text-white font-bold text-sm" data-testid={`btn-register-${event.id}`}>
                Register Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
