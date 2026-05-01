import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";
import { useGetPendingEvents, useUpdateEventStatus } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function Approve() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: pendingEvents, isLoading } = useGetPendingEvents();
  const { mutate: updateStatus } = useUpdateEventStatus();

  const handleAction = (eventId: number, status: "Approved" | "Rejected") => {
    updateStatus({
      eventId,
      data: { status }
    }, {
      onSuccess: () => {
        toast({ 
          title: status === "Approved" ? "Event Approved!" : "Event Rejected", 
          description: `The event status has been updated to ${status}.` 
        });
        queryClient.invalidateQueries({ queryKey: ["/events/pending"] });
        queryClient.invalidateQueries({ queryKey: ["/events"] });
        queryClient.invalidateQueries({ queryKey: ["/stats/kpis"] });
        queryClient.invalidateQueries({ queryKey: ["/stats/timeline"] });
        queryClient.invalidateQueries({ queryKey: ["/stats/categories"] });
      }
    });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">Approve Events</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : !pendingEvents || pendingEvents.length === 0 ? (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center anti-gravity">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">All Caught Up!</h2>
          <p className="text-slate-500">There are no pending events requiring your approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingEvents?.map((event) => (
            <motion.div 
              key={event.eventId}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="glass-panel p-6 anti-gravity flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-orange-500"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                    <Clock className="w-3 h-3 mr-1" /> Pending
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{event.festName}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{event.eventName}</h3>
                <p className="text-sm text-slate-500 mb-3">Proposed by <span className="font-bold text-slate-700">{event.organizer || 'Admin'}</span> • Scheduled for {event.eventDate || 'TBA'}</p>
              </div>
              
              <div className="flex flex-row md:flex-col gap-3 shrink-0">
                <button 
                  onClick={() => handleAction(event.eventId, "Approved")}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-sm"
                  data-testid={`btn-approve-${event.eventId}`}
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </button>
                <button 
                  onClick={() => handleAction(event.eventId, "Rejected")}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold rounded-lg transition-colors"
                  data-testid={`btn-reject-${event.eventId}`}
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
