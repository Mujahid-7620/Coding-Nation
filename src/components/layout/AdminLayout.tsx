import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Briefcase, 
  Settings, 
  BarChart, 
  LogOut, 
  GraduationCap,
  DollarSign
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
  { name: 'Students', path: '/admin/students', icon: GraduationCap },
  { name: 'Admissions', path: '/admin/admissions', icon: BookOpen },
  { name: 'Payments', path: '/admin/payments', icon: DollarSign },
  { name: 'Placements', path: '/admin/placements', icon: Briefcase },
  { name: 'Jobs', path: '/admin/jobs', icon: Briefcase },
  { name: 'Blogs', path: '/admin/blogs', icon: BookOpen },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Role Management', path: '/admin/roles', icon: Users },
  { name: 'Courses', path: '/admin/courses', icon: BookOpen },
  { name: 'Reports', path: '/admin/reports', icon: BarChart },
  { name: 'CMS', path: '/admin/cms', icon: Settings },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r bg-white flex shrink-0">
        <div className="flex h-16 items-center border-b px-6">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-xl font-bold tracking-tight text-zinc-900">Coding Nation Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                               (link.path !== '/admin' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <link.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-zinc-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center px-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="ml-3 truncate text-sm font-medium text-zinc-900">
              {user?.email}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <LogOut className="mr-3 h-5 w-5 text-zinc-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center justify-end border-b bg-white px-8">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              Admin Portal
            </span>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
