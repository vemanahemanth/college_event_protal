import { motion } from "framer-motion";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-12 text-center anti-gravity max-w-md w-full"
      >
        <h1 className="text-6xl font-extrabold text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          The intelligence module you are looking for has been moved or does not exist.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 font-bold transition-all shadow-lg shadow-indigo-600/20"
          data-testid="btn-home"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Mission Control
        </Link>
      </motion.div>
    </div>
  );
}
