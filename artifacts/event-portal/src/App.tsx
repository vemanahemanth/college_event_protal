import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { StudentLayout } from "@/components/StudentLayout";

// Admin pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Events from "@/pages/events";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import Leaderboards from "@/pages/leaderboards";
import Registrations from "@/pages/registrations";
import Approve from "@/pages/approve";
import Manage from "@/pages/manage";
import Users from "@/pages/users";
import CalendarView from "@/pages/calendar";
import Profile from "@/pages/profile";

// Student pages
import StudentDashboard from "@/pages/student-dashboard";
import StudentEvents from "@/pages/student-events";
import StudentRegistrations from "@/pages/student-registrations";
import StudentLeaderboard from "@/pages/student-leaderboard";
import StudentProfile from "@/pages/student-profile";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        {/* Public */}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />

        {/* Admin pages */}
        <Route path="/events">
          <Layout><Events /></Layout>
        </Route>
        <Route path="/dashboard">
          <Layout><Dashboard /></Layout>
        </Route>
        <Route path="/analytics">
          <Layout><Analytics /></Layout>
        </Route>
        <Route path="/leaderboards">
          <Layout><Leaderboards /></Layout>
        </Route>
        <Route path="/registrations">
          <Layout><Registrations /></Layout>
        </Route>
        <Route path="/approve">
          <Layout><Approve /></Layout>
        </Route>
        <Route path="/manage">
          <Layout><Manage /></Layout>
        </Route>
        <Route path="/users">
          <Layout><Users /></Layout>
        </Route>
        <Route path="/calendar">
          <Layout><CalendarView /></Layout>
        </Route>
        <Route path="/profile">
          <Layout><Profile /></Layout>
        </Route>

        {/* Student portal */}
        <Route path="/student">
          <StudentLayout><StudentDashboard /></StudentLayout>
        </Route>
        <Route path="/student/events">
          <StudentLayout><StudentEvents /></StudentLayout>
        </Route>
        <Route path="/student/registrations">
          <StudentLayout><StudentRegistrations /></StudentLayout>
        </Route>
        <Route path="/student/leaderboard">
          <StudentLayout><StudentLeaderboard /></StudentLayout>
        </Route>
        <Route path="/student/profile">
          <StudentLayout><StudentProfile /></StudentLayout>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
