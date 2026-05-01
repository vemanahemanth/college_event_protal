import { motion } from "framer-motion";
import { Search, Shield, ShieldAlert, ShieldCheck, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const initialUsers = [
  { id: 1, email: "admin@chanakya.edu.in", name: "System Admin", status: "Active", role: "Admin" },
  { id: 2, email: "coordinator.cse@chanakya.edu.in", name: "Vikram Kumar", status: "Active", role: "Coordinator" },
  { id: 3, email: "student.22@chanakya.edu.in", name: "Rahul Sharma", status: "Active", role: "Student" },
  { id: 4, email: "faculty.cult@chanakya.edu.in", name: "Anita Desai", status: "Active", role: "Coordinator" },
  { id: 5, email: "student.89@chanakya.edu.in", name: "Priya Patel", status: "Active", role: "Student" },
  { id: 6, email: "guest.1@chanakya.edu.in", name: "John Doe", status: "Inactive", role: "Student" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'Admin': return <ShieldAlert className="w-4 h-4 text-red-500 mr-2" />;
      case 'Coordinator': return <Shield className="w-4 h-4 text-blue-500 mr-2" />;
      case 'Student': return <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />;
      default: return <Shield className="w-4 h-4 text-slate-500 mr-2" />;
    }
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 glass-panel px-6 py-2 inline-block">User Management</h1>
        </div>
        
        <div className="relative w-full md:w-80 glass-panel overflow-hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800"
            data-testid="input-search-users"
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden anti-gravity">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50">
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative inline-block w-40">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium py-1.5 pl-3 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        data-testid={`select-role-${user.id}`}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Student">Student</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <ChevronDown className="w-3 h-3" />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        {/* Visual trick since select options can't easily have icons inside the input text cross-browser */}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" 
                      data-testid={`btn-delete-user-${user.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
