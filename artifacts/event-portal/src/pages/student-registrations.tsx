import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Download, Calendar, Tag } from "lucide-react";
import { useListRegistrations } from "@workspace/api-client-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const statusStyle: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  "Pending Payment": "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-600",
};

const resultStyle: Record<string, string> = {
  "2nd Place": "text-orange-600 font-bold",
  "Finalist": "text-indigo-600 font-semibold",
  "Participated": "text-slate-500",
  "Awaited": "text-slate-400 italic",
  "-": "text-slate-300",
};

export default function StudentRegistrations() {
  const [search, setSearch] = useState("");
  const { data: registrationsList, isLoading } = useListRegistrations();

  const filtered = registrationsList?.filter((r) =>
    r.eventName?.toLowerCase().includes(search.toLowerCase()) ||
    r.registrationCode?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-6">

      {/* Header */}
      <motion.div variants={itemVariants} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">My Registrations</h1>
          <p className="text-slate-500 mt-1">Track all your event registrations and results</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-3 glass-panel px-4 py-2">
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-800">{filtered.length}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-emerald-600">
                {filtered.filter(r => r.paymentStatus === 'Confirmed').length}
              </p>
              <p className="text-xs text-slate-500">Confirmed</p>
            </div>
          </div>
          <button className="glass-panel px-4 py-2 text-slate-600 hover:text-indigo-600 flex items-center gap-2 text-sm font-medium transition-colors" data-testid="btn-export-regs">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="relative glass-panel overflow-hidden">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by event name or registration ID..."
          className="w-full bg-transparent border-none pl-10 pr-4 py-3 focus:outline-none text-sm text-slate-800"
          data-testid="input-reg-search"
        />
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="glass-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60">
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">ID</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Event</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden lg:table-cell">Fee Paid</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                </td>
              </tr>
            ) : (
              filtered.map((reg) => (
                <tr key={reg.registrationId} className="hover:bg-white/50 transition-colors" data-testid={`student-reg-row-${reg.registrationCode}`}>
                  <td className="px-5 py-4 font-mono text-xs text-slate-400">{reg.registrationCode}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{reg.eventName}</td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(reg.createdAt || '').toLocaleDateString()}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-slate-500"><Tag className="w-3.5 h-3.5" />Event</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium hidden lg:table-cell">₹{reg.amountPaid}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[reg.paymentStatus || ''] || 'bg-slate-100'}`}>{reg.paymentStatus}</span>
                  </td>
                  <td className={`px-5 py-4 text-sm ${resultStyle['Awaited']}`}>Awaited</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
