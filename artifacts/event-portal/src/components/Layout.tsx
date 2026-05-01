import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, LogOut, GraduationCap } from "lucide-react";
import campusBg from "@/assets/campus.jpg";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/events", label: "Events" },
    { href: "/approve", label: "Approve Event" },
    { href: "/propose", label: "Propose Event" },
    { href: "/registrations", label: "Registrations" },
    { href: "/analytics", label: "Analytics" },
    { href: "/leaderboards", label: "Leaderboards" },
    { href: "/users", label: "Users" },
    { href: "/calendar", label: "Calendar" },
  ];

  return (
    <>
      <div 
        className="bg-campus"
        style={{ backgroundImage: `url(${campusBg})` }}
      />
      <div className="min-h-screen flex flex-col pt-20">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-t-0 !border-l-0 !border-r-0 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-orange-500 w-8 h-8" />
            <Link href="/" className="font-bold text-slate-800 text-xl tracking-tight">Event Intelligence</Link>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-slate-600 hover:text-slate-900 transition-colors" data-testid="nav-profile">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-red-500 transition-colors" data-testid="nav-logout">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </nav>

        <main className="flex-1 max-w-7xl w-full mx-auto p-6 relative z-10">
          {children}
        </main>
      </div>
    </>
  );
}
