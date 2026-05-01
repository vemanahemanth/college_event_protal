import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, MapPin, Users, CheckCircle, X } from "lucide-react";
import { useListEvents, useCreateRegistration, useListColleges } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    collegeId: "",
    course: "",
    yearOfStudy: "",
  });

  const { data: eventsList, isLoading } = useListEvents({ search, category: activeCategory });
  const { data: colleges } = useListColleges();
  const { mutate: register, isPending } = useCreateRegistration();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    register({
      data: {
        ...formData,
        collegeId: parseInt(formData.collegeId),
        yearOfStudy: parseInt(formData.yearOfStudy),
        eventId: selectedEvent.eventId,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Registration Successful!", description: `You are now registered for ${selectedEvent.eventName}` });
        setIsModalOpen(false);
        setFormData({ fullName: "", email: "", mobileNumber: "", collegeId: "", course: "", yearOfStudy: "" });
        queryClient.invalidateQueries({ queryKey: ["/stats/kpis"] });
        queryClient.invalidateQueries({ queryKey: ["/stats/timeline"] });
        queryClient.invalidateQueries({ queryKey: ["/events/list"] });
      },
      onError: (err: any) => {
        toast({ title: "Registration Failed", description: err.response?.data?.error || "Something went wrong", variant: "destructive" });
      }
    });
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
        {["All", "Technical", "Cultural", "Business", "Workshop", "Sports"].map((cat) => (
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
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          eventsList?.map((ev) => {
            const fillPct = Math.round((ev.registeredCount || 0) / 100 * 100);
            return (
              <motion.div
                key={ev.eventId}
                variants={itemVariants}
                className="glass-panel p-5 anti-gravity flex flex-col gap-3 group relative overflow-hidden"
                data-testid={`student-event-card-${ev.eventId}`}
              >
                {/* Top badges */}
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[ev.categoryName || ''] || "bg-gray-100 text-gray-700"}`}>
                    {ev.categoryName}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700`}>
                    Scheduled
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-snug">{ev.eventName}</h3>
                  <p className="text-xs text-slate-500 mt-1">Organized by {ev.organizer || 'Admin'}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {ev.venueName || 'Main Campus'}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {ev.registeredCount}/100 registered</span>
                </div>

                {/* Capacity bar */}
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(fillPct, 100)}%` }} />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-1">
                  <div>
                    <span className="text-xs text-slate-400">{ev.eventDate || 'TBA'}</span>
                    <p className="font-bold text-slate-800 text-sm">
                       {ev.registrationFee === "0.00" ? "Free" : `₹${ev.registrationFee}`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal(ev)}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
                    data-testid={`btn-register-${ev.eventId}`}
                  >
                    Register Now
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] glass-panel border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-slate-800">
              Register for {selectedEvent?.eventName}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-white/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" required value={formData.mobileNumber} onChange={e => setFormData({...formData, mobileNumber: e.target.value})} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Select value={formData.collegeId} onValueChange={v => setFormData({...formData, collegeId: v})}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select College" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges?.map(c => (
                      <SelectItem key={c.collegeId} value={c.collegeId.toString()}>{c.collegeName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" required value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Select value={formData.yearOfStudy} onValueChange={v => setFormData({...formData, yearOfStudy: v})}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(y => (
                      <SelectItem key={y} value={y.toString()}>{y} Year</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                {isPending ? "Registering..." : "Confirm Registration"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
