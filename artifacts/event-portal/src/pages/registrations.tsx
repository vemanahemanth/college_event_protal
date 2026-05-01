import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const mockRegistrations = [
  { id: "REG-001", student: "Vemana Hemanth Babu", event: "HackCU 24-Hour Hackathon", date: "May 10, 2026", status: "Confirmed" },
  { id: "REG-002", student: "Jane Doe", event: "UI/UX Masterclass", date: "May 11, 2026", status: "Confirmed" },
  { id: "REG-003", student: "Rahul Sharma", event: "Startup Pitch Deck", date: "May 12, 2026", status: "Pending Payment" },
  { id: "REG-004", student: "Priya Patel", event: "Open Mic Night", date: "May 12, 2026", status: "Confirmed" },
  { id: "REG-005", student: "Amit Kumar", event: "Dance Battle", date: "May 13, 2026", status: "Pending Payment" },
  { id: "REG-006", student: "Sneha Reddy", event: "Robotics Workshop", date: "May 13, 2026", status: "Confirmed" },
  { id: "REG-007", student: "Karan Singh", event: "HackCU 24-Hour Hackathon", date: "May 14, 2026", status: "Confirmed" },
];

export default function Registrations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockRegistrations.filter(
    (reg) => 
      reg.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      reg.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Global Registrations</h1>
        </div>
        
        <div className="relative w-full md:w-80 glass-panel overflow-hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Name, Event..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800"
            data-testid="input-search-registrations"
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden anti-gravity">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50">
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Registration ID</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Event Name</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {filteredData.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-slate-800">{reg.id}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{reg.student}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{reg.event}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{reg.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      reg.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50" data-testid={`btn-actions-${reg.id}`}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No registrations found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="border-t border-slate-200/50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{filteredData.length}</span> of <span className="font-bold text-slate-800">{mockRegistrations.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled data-testid="btn-prev-page">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-800" data-testid="btn-next-page">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
