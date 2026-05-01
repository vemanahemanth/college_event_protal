import { motion } from "framer-motion";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const initialEvents = [
  { id: 1, title: "Robotics Workshop", organizer: "Tech Club", date: "Jun 02, 2026", type: "Workshop", description: "A 2-day intensive workshop on basic robotics and Arduino programming.", status: "Pending" },
  { id: 2, title: "Literary Debate", organizer: "Literary Society", date: "Jun 05, 2026", type: "Cultural", description: "Annual inter-department debate competition.", status: "Pending" },
  { id: 3, title: "E-Sports Tournament", organizer: "Sports Committee", date: "Jun 12, 2026", type: "Sports", description: "Campus-wide FIFA and Valorant tournament.", status: "Pending" },
];

export default function Approve() {
  const [events, setEvents] = useState(initialEvents);

  const handleAction = (id: number, action: "approve" | "reject") => {
    setEvents(events.filter(e => e.id !== id));
    // In a real app, this would show a toast and call an API
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Approve Events</h1>
      </div>

      {events.length === 0 ? (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center anti-gravity">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">All Caught Up!</h2>
          <p className="text-slate-500">There are no pending events requiring your approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div 
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="glass-panel p-6 anti-gravity flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-orange-500"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                    <Clock className="w-3 h-3 mr-1" /> {event.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{event.type}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{event.title}</h3>
                <p className="text-sm text-slate-500 mb-3">Proposed by <span className="font-bold text-slate-700">{event.organizer}</span> • Scheduled for {event.date}</p>
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-slate-400" />
                  {event.description}
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col gap-3 shrink-0">
                <button 
                  onClick={() => handleAction(event.id, "approve")}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-sm"
                  data-testid={`btn-approve-${event.id}`}
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </button>
                <button 
                  onClick={() => handleAction(event.id, "reject")}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold rounded-lg transition-colors"
                  data-testid={`btn-reject-${event.id}`}
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
