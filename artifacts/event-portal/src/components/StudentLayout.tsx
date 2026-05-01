import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { User, LogOut, GraduationCap, LayoutDashboard, CalendarDays, ClipboardList, Trophy, UserCircle } from "lucide-react";
import campusBg from "@/assets/campus.jpg";

const navLinks = [
  { href: "/student", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/student/events", label: "Browse Events", icon: CalendarDays },
  { href: "/student/registrations", label: "My Registrations", icon: ClipboardList },
  { href: "/student/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/student/profile", label: "My Profile", icon: UserCircle },
];

export function StudentLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <>
      <div className="bg-campus" style={{ backgroundImage: `url(${campusBg})` }} />
      <div className="min-h-screen flex flex-col pt-20">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="text-indigo-600 w-8 h-8" />
            <Link href="/student" className="font-bold text-slate-800 text-xl tracking-tight">
              Student Portal
            </Link>
            <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              Chanakya University
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                  data-testid={`student-nav-${link.label.toLowerCase().replace(/ /g, "-")}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass-panel px-3 py-1.5">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">VH</div>
              <span className="text-sm font-medium text-slate-700 hidden md:block">Vemana Hemanth</span>
            </div>
            <Link href="/login" className="text-slate-500 hover:text-red-500 transition-colors" data-testid="student-nav-logout">
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
