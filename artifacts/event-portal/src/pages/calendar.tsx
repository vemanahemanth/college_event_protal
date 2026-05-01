import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

import { useState, useMemo } from "react";
import { useListEvents } from "@workspace/api-client-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Use current date
  const { data: eventsList } = useListEvents();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonthCount = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));

  const eventsByDay = useMemo(() => {
    const map: Record<number, any[]> = {};
    eventsList?.forEach(event => {
      if (!event.eventDate) return;
      const d = new Date(event.eventDate);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(event);
      }
    });
    return map;
  }, [eventsList, currentMonth, currentYear]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Calendar</h1>
        </div>
        
        <div className="flex items-center gap-4 glass-panel px-4 py-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-600" data-testid="btn-prev-month">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-slate-800 w-32 text-center">{monthName} {currentYear}</span>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-600" data-testid="btn-next-month">
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
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`pad-${i}`} className="min-h-[100px] p-2 rounded-xl bg-slate-50/30 border border-slate-100/50"></div>
          ))}
          
          {daysArray.map((day) => {
            const dayEvents = eventsByDay[day] || [];
            const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            
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
                      key={event.eventId}
                      className="px-2 py-1 text-[10px] font-bold rounded bg-indigo-600 text-white truncate cursor-pointer hover:bg-indigo-700 transition-colors"
                      title={event.eventName}
                    >
                      {event.eventName}
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
