import { motion } from "framer-motion";
import { Edit2, Trash2, Star, Calendar as CalendarIcon, MapPin, Search } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const mockEvents = [
  { id: 1, title: "HackCU 24-Hour Hackathon", date: "May 15, 2026, 10:00 AM", department: "CSE", status: "Scheduled", capacity: 400, registered: 300, isFlagship: true, category: "Technical" },
  { id: 2, title: "Dance Battle", date: "Jun 15, 2026, 5:00 PM", department: "Cultural", status: "Scheduled", capacity: 1000, registered: 850, isFlagship: true, category: "Cultural" },
  { id: 3, title: "Open Mic Night", date: "May 18, 2026, 6:00 PM", department: "Literary", status: "Scheduled", capacity: 100, registered: 45, isFlagship: false, category: "Cultural" },
  { id: 4, title: "Startup Pitch Deck", date: "May 22, 2026, 2:00 PM", department: "Business", status: "Scheduled", capacity: 50, registered: 20, isFlagship: false, category: "Business" },
  { id: 5, title: "Robotics Workshop", date: "Jun 02, 2026, 9:00 AM", department: "Mechanical", status: "Completed", capacity: 100, registered: 85, isFlagship: false, category: "Workshop" },
];

export default function Manage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Manage Events</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64 glass-panel overflow-hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full bg-transparent border-none pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800"
              data-testid="input-search-manage"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-colors whitespace-nowrap shadow-sm" data-testid="btn-create-event">
            + Create Event
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden anti-gravity">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50">
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Event Name</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Stats</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {mockEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{event.title}</span>
                        {event.isFlagship && (
                          <span className="bg-orange-100 text-orange-600 p-0.5 rounded flex items-center" title="Flagship Event">
                            <Star className="w-3 h-3 fill-orange-600" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {event.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                      {event.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-800 font-medium">{event.department}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      event.status === "Scheduled" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{event.registered} / {event.capacity}</span>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full" 
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-600 rounded text-sm font-medium transition-colors" data-testid={`btn-edit-${event.id}`}>
                        <Edit2 className="w-3 h-3 mr-1.5" /> Manage
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" data-testid={`btn-delete-${event.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
