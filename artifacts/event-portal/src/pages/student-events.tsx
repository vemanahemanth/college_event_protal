import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, MapPin, Users, CheckCircle } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const allEvents = [
  { id: 1, title: "HackCU 24-Hour Hackathon", date: "May 15, 2026", category: "Technical", location: "Main Auditorium", price: "Free", organizer: "CSE Dept", capacity: 400, registered: 120, status: "Scheduled" },
  { id: 2, title: "Open Mic Night", date: "May 18, 2026", category: "Cultural", location: "Student Center", price: "₹150", organizer: "Literary Society", capacity: 800, registered: 45, status: "Scheduled" },
  { id: 3, title: "Startup Pitch Deck Competition", date: "May 22, 2026", category: "Business", location: "Seminar Hall B", price: "₹500", organizer: "Entrepreneurship Cell", capacity: 50, registered: 30, status: "Scheduled" },
  { id: 4, title: "Robotics Workshop", date: "Jun 02, 2026", category: "Workshop", location: "Lab Complex", price: "₹200", organizer: "Tech Club", capacity: 100, registered: 85, status: "Completed" },
  { id: 5, title: "UI/UX Masterclass", date: "Jun 10, 2026", category: "Workshop", location: "Design Studio", price: "Free", organizer: "Design Society", capacity: 80, registered: 60, status: "Scheduled" },
  { id: 6, title: "Dance Battle", date: "Jun 15, 2026", category: "Cultural", location: "Open Air Theatre", price: "₹100", organizer: "Dance Club", capacity: 1000, registered: 150, status: "Scheduled" },
  { id: 7, title: "Robotics Championship", date: "Jul 05, 2026", category: "Technical", location: "Sports Complex", price: "Free", organizer: "Robotics Club", capacity: 300, registered: 88, status: "Scheduled" },
  { id: 8, title: "Finance & Investing Summit", date: "Jul 12, 2026", category: "Business", location: "Conference Hall", price: "₹350", organizer: "Finance Club", capacity: 150, registered: 40, status: "Scheduled" },
];

const categories = ["All", "Technical", "Cultural", "Business", "Workshop", "Sports"];

const categoryColors: Record<string, string> = {
  Technical: "bg-indigo-100 text-indigo-700",
  Cultural: "bg-pink-100 text-pink-700",
  Business: "bg-amber-100 text-amber-700",
  Workshop: "bg-emerald-100 text-emerald-700",
  Sports: "bg-sky-100 text-sky-700",
};

export default function StudentEvents() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [registered, setRegistered] = useState<number[]>([1, 3]);

  const filtered = allEvents.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRegister = (id: number) => {
    setRegistered((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full space-y-6">

      {/* Header */}
      <motion.div variants={itemVariants} className="glass-panel p-6">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-1">Browse Events</h1>
        <p className="text-slate-500">Discover and register for upcoming events at Chanakya University</p>
      </motion.div>

      {/* Search + Filter bar */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 glass-panel overflow-hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by name or organizer..."
            className="w-full bg-transparent border-none pl-10 pr-4 py-3 focus:outline-none text-sm text-slate-800"
            data-testid="input-student-search"
          />
        </div>
        <button className="glass-panel px-4 py-3 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium" data-testid="btn-student-filter">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </motion.div>

      {/* Category pills */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "glass-panel text-slate-600 hover:text-indigo-600"}`}
            data-testid={`filter-cat-${cat}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Events Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((ev) => {
          const isReg = registered.includes(ev.id);
          const fillPct = Math.round((ev.registered / ev.capacity) * 100);
          return (
            <motion.div
              key={ev.id}
              variants={itemVariants}
              className="glass-panel p-5 anti-gravity flex flex-col gap-3"
              data-testid={`student-event-card-${ev.id}`}
            >
              {/* Top badges */}
              <div className="flex justify-between items-start">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[ev.category] || "bg-gray-100 text-gray-700"}`}>
                  {ev.category}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ev.status === "Scheduled" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                  {ev.status}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-snug">{ev.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Organized by {ev.organizer}</p>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {ev.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {ev.registered}/{ev.capacity} registered</span>
              </div>

              {/* Capacity bar */}
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${fillPct}%` }} />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-1">
                <div>
                  <span className="text-xs text-slate-400">{ev.date}</span>
                  <p className="font-bold text-slate-800 text-sm">{ev.price}</p>
                </div>
                {ev.status === "Completed" ? (
                  <span className="text-xs text-slate-400 italic">Event over</span>
                ) : (
                  <button
                    onClick={() => handleRegister(ev.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${isReg ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"}`}
                    data-testid={`btn-register-${ev.id}`}
                  >
                    {isReg ? <><CheckCircle className="w-3.5 h-3.5" /> Registered</> : "Register Now"}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
