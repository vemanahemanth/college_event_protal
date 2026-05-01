import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

import { useListRegistrations } from "@workspace/api-client-react";

export default function Registrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: registrationsData, isLoading } = useListRegistrations();

  const registrationsList = registrationsData || [];

  const filteredData = registrationsList.filter(
    (reg) => 
      reg.participantName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      reg.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.registrationCode?.toLowerCase().includes(searchTerm.toLowerCase())
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  </td>
                </tr>
              ) : (
                filteredData.map((reg) => (
                  <tr key={reg.registrationId} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-800">{reg.registrationCode}</td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-800">{reg.participantName}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{reg.eventName}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">{reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        reg.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {reg.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50" data-testid={`btn-actions-${reg.registrationId}`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
            Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{filteredData.length}</span> of <span className="font-bold text-slate-800">{registrationsList.length}</span> results
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
