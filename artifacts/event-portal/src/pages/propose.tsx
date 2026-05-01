import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Calendar, MapPin, Tag, Users, Trophy } from "lucide-react";
import { useProposeEvent, useListColleges, useGetCategoriesStats } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function ProposeEvent() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { mutate: propose, isPending } = useProposeEvent();
  const { data: colleges } = useListColleges();
  
  const [formData, setFormData] = useState({
    eventName: "",
    festName: "Chanakya Fest 2026",
    categoryId: "1",
    venueId: "1", // Default venue
    eventDate: "",
    registrationFee: "0",
    isCompetition: false,
    facultyCoordinatorName: "Vemana Hemanth", // Default proposer
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    propose({
      data: {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        venueId: parseInt(formData.venueId),
      }
    }, {
      onSuccess: () => {
        toast({ title: "Proposal Submitted!", description: "Your event proposal is now pending approval." });
        setLocation("/approve");
      },
      onError: (err: any) => {
        toast({ title: "Proposal Failed", description: err.response?.data?.error || "Something went wrong", variant: "destructive" });
      }
    });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Propose New Event</h1>
      </div>

      <div className="glass-panel p-8 anti-gravity">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" /> Event Name
              </label>
              <input 
                required
                type="text"
                placeholder="e.g. RoboWars Nexus 2026"
                value={formData.eventName}
                onChange={e => setFormData({...formData, eventName: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Event Date
              </label>
              <input 
                required
                type="date"
                value={formData.eventDate}
                onChange={e => setFormData({...formData, eventDate: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" /> Category
              </label>
              <select 
                required
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="">Select Category</option>
                <option value="1">Technical</option>
                <option value="2">Cultural</option>
                <option value="3">Business</option>
                <option value="4">Workshop</option>
                <option value="5">Sports</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" /> Venue
              </label>
              <select 
                required
                value={formData.venueId}
                onChange={e => setFormData({...formData, venueId: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="1">Open Air Theatre</option>
                <option value="2">Main Seminar Hall</option>
                <option value="3">University Grounds</option>
                <option value="4">Innovation Hub</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Registration Fee (₹)</label>
              <input 
                type="number"
                value={formData.registrationFee}
                onChange={e => setFormData({...formData, registrationFee: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input 
                type="checkbox"
                id="isCompetition"
                checked={formData.isCompetition}
                onChange={e => setFormData({...formData, isCompetition: e.target.checked})}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isCompetition" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-500" /> Is this a competition?
              </label>
            </div>
          </div>

          <div className="pt-6">
            <button 
              disabled={isPending}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isPending ? "Submitting Proposal..." : "Submit Event Proposal"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
