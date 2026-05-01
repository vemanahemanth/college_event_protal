import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

const events = [
  { id: 1, date: 15, title: "HackCU Hackathon", type: "Technical" },
  { id: 2, date: 18, title: "Open Mic Night", type: "Cultural" },
  { id: 3, date: 22, title: "Startup Pitch", type: "Business" },
  { id: 4, date: 2, title: "Robotics Workshop", type: "Workshop" },
];

export default function CalendarView() {
  const activeDay = 1; // Simulation of current day

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Calendar</h1>
        </div>
        
        <div className="flex items-center gap-4 glass-panel px-4 py-2">
          <button className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-600" data-testid="btn-prev-month">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-slate-800 w-32 text-center">May 2026</span>
          <button className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-600" data-testid="btn-next-month">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 anti-gravity">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold text-slate-500 py-2 text-sm uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for padding */}
          <div className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          <div className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          <div className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          <div className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          <div className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          
          {daysInMonth.map((day) => {
            const dayEvents = events.filter(e => e.date === day);
            const isToday = day === activeDay;
            
            return (
              <div 
                key={day} 
                className={`min-h-[100px] p-2 rounded-xl border transition-colors ${
                  isToday ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white/50 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className={`text-right text-sm font-bold mb-2 ${
                  isToday ? 'text-indigo-600' : 'text-slate-600'
                }`}>
                  <span className={isToday ? 'flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-white ml-auto' : ''}>
                    {day}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="px-2 py-1 text-xs font-bold rounded bg-orange-500 text-white truncate cursor-pointer hover:bg-orange-600 transition-colors"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
