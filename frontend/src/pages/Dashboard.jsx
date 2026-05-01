import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, CheckSquare, LogOut, Plus, X, Filter } from "lucide-react";
import API from "../api/client";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // 1. NORMALIZE USER DATA
  const [user] = useState({
    id: String(localStorage.getItem("userId") || "").trim(),
    role: String(localStorage.getItem("userRole") || "").toUpperCase()
  });

  // Set default view: Admins see Overview, Members see their Tasks
  const [activeTab, setActiveTab] = useState(user.role === "ADMIN" ? "Dashboard" : "Tasks");
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);

  // 2. LOAD DATA LOGIC
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch base data
      const [projectsRes, usersRes] = await Promise.all([
        API.get("/projects"),
        user.role === "ADMIN" ? API.get("/auth/users") : Promise.resolve({ data: [] })
      ]);
      
      setProjects(projectsRes.data);
      setAvailableUsers(usersRes.data);

      if (user.role === "ADMIN") {
        // ADMIN: Loop projects to get ALL tasks for management
        if (projectsRes.data.length > 0) {
          const taskPromises = projectsRes.data.map(p => API.get(`/tasks/${p.id}`));
          const results = await Promise.all(taskPromises);
          setTasks(results.flatMap(res => res.data));
        }
      } else {
        // MEMBER (Vicky): Call the specific user-task endpoint 
        // This ensures tasks show up even if they aren't 'project members'
        const myTasksRes = await API.get("/tasks/user-tasks");
        setTasks(myTasksRes.data);
      }
    } catch (err) {
      console.error("Sync Error:", err);
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user.id, user.role]);

  // 3. FILTERING LOGIC
  const getVisibleTasks = () => {
    if (user.role === "ADMIN") {
      // If Admin clicks 'My Tasks', show only theirs. Otherwise show all.
      if (activeTab === "Tasks") {
        return tasks.filter(t => String(t.assignedToId) === user.id);
      }
      return tasks;
    }
    return tasks; // Members only have their own tasks in state anyway
  };

  const stats = {
    total: getVisibleTasks().length,
    completed: getVisibleTasks().filter(t => t.status === "DONE").length,
    pending: getVisibleTasks().filter(t => t.status !== "DONE").length
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="h-screen bg-[#030303] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-[0.3em]">Syncing Records...</div>;

  return (
    <div className="flex bg-[#030303] text-slate-300 min-h-screen font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#080809] border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20">TF</div>
          <span className="text-xl font-black text-white tracking-tighter uppercase italic">TaskFlow</span>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          
          {user.role === "ADMIN" && (
            <SidebarItem icon={<Briefcase size={20}/>} label="Projects" active={activeTab === "Projects"} onClick={() => setActiveTab("Projects")} />
          )}

          {/* Members get "My Tasks", Admins use the Overview dashboard */}
          {user.role !== "ADMIN" && (
            <SidebarItem icon={<CheckSquare size={20}/>} label="My Tasks" active={activeTab === "Tasks"} onClick={() => setActiveTab("Tasks")} />
          )}
        </nav>

        <div className="p-6 border-t border-white/5">
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-black text-red-500 hover:bg-red-500/10 transition-colors uppercase">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-6xl font-black text-white tracking-tighter mb-2 italic uppercase">{activeTab}</h1>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
              Access Level: <span className="text-blue-500">{user.role}</span>
            </p>
          </div>

          {user.role === "ADMIN" && (
            <div className="flex gap-3">
              <button onClick={() => setShowProjectModal(true)} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-[10px] hover:bg-white/10 transition-all uppercase tracking-widest">
                + Project
              </button>
              <button onClick={() => setShowTaskModal(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all uppercase tracking-widest">
                + Assign Task
              </button>
            </div>
          )}
        </header>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <MetricCard label="Scoped Tasks" value={stats.total} color="text-blue-500" />
          <MetricCard label="Verified Done" value={stats.completed} color="text-emerald-400" />
          <MetricCard label="Pending" value={stats.pending} color="text-orange-500" />
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="font-black text-white text-lg uppercase flex items-center gap-3">
              <Filter size={18} className="text-blue-500"/> Activity Feed
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/[0.03]">
                {getVisibleTasks().map((task) => (
                  <tr key={task.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-10 py-8">
                      <p className="text-white font-black text-xl tracking-tight">{task.title}</p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">
                        Project: {task.project?.name || "General"} • Assignee: {task.assignedTo?.name || "Unassigned"}
                      </p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-widest ${
                        task.status === "DONE" ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5" : "border-white/10 text-slate-400 bg-white/5"
                      }`}>
                        {task.status || "PENDING"}
                      </span>
                    </td>
                  </tr>
                ))}
                {getVisibleTasks().length === 0 && (
                   <tr>
                     <td className="p-32 text-center text-slate-600 font-black uppercase tracking-widest opacity-30">
                       No Active Assignments
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL: PROJECT */}
      {showProjectModal && (
        <ModalLayout title="New Project" close={() => setShowProjectModal(false)}>
          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault();
            try {
              await API.post("/projects", { name: e.target.projectName.value });
              setShowProjectModal(false);
              loadData();
            } catch (err) { alert("Initialization Failed"); }
          }}>
            <input name="projectName" required className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white outline-none focus:border-blue-500" placeholder="Project Name" />
            <button className="w-full bg-blue-600 py-5 rounded-xl font-black text-white uppercase shadow-lg shadow-blue-600/20">Create Workspace</button>
          </form>
        </ModalLayout>
      )}

      {/* MODAL: TASK */}
      {showTaskModal && (
        <ModalLayout title="Task Assignment" close={() => setShowTaskModal(false)}>
          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault();
            try {
              await API.post("/tasks", {
                title: e.target.title.value,
                projectId: e.target.project.value,
                assignedToId: e.target.assignee.value
              });
              setShowTaskModal(false);
              loadData();
            } catch (err) { alert("Assignment Error"); }
          }}>
            <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white outline-none mb-2" placeholder="Task Title" />
            <select name="project" required className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl p-5 text-white outline-none mb-2">
              <option value="">Target Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select name="assignee" required className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl p-5 text-white outline-none mb-4">
              <option value="">Target Resource</option>
              {availableUsers.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
            </select>
            <button className="w-full bg-white text-black py-5 rounded-xl font-black uppercase shadow-xl hover:bg-slate-200 transition-colors">Deploy Assignment</button>
          </form>
        </ModalLayout>
      )}
    </div>
  );
}

// SHARED UI COMPONENTS
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${
      active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-white hover:bg-white/5"
    }`}>
      {icon} <span className="uppercase tracking-tight">{label}</span>
    </button>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group">
      <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">{label}</p>
      <h2 className={`text-6xl font-black ${color} tracking-tighter group-hover:scale-105 transition-transform duration-500`}>{value}</h2>
    </div>
  );
}

function ModalLayout({ title, children, close }) {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6">
      <div className="bg-[#0A0A0C] border border-white/10 w-full max-w-lg rounded-[3rem] p-12 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{title}</h2>
          <button onClick={close} className="p-3 hover:bg-white/5 rounded-full transition-all text-slate-500 hover:text-white"><X size={24}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}