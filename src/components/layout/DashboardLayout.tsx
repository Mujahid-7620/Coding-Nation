import React from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store/authStore';
import { 
  LayoutDashboard, 
  UserCircle, 
  BookOpen, 
  Award, 
  Briefcase, 
  FileText, 
  Bot, 
  CreditCard, 
  Bell, 
  LifeBuoy, 
  Trophy, 
  LogOut,
  Users,
  Calendar
} from 'lucide-react';

export function DashboardLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.roles[0] || 'STUDENT';

  const getLinks = () => {
    if (role === 'STUDENT') {
      return [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: UserCircle },
        { name: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
        { name: 'Assignments', path: '/dashboard/assignments', icon: FileText },
        { name: 'Projects', path: '/dashboard/projects', icon: Briefcase },
        { name: 'Certificates', path: '/dashboard/certificates', icon: Award },
        { name: 'Resume', path: '/dashboard/resume', icon: FileText },
        { name: 'Leaderboard', path: '/dashboard/leaderboard', icon: Trophy },
        { name: 'AI Mentor', path: '/dashboard/ai-mentor', icon: Bot },
        { name: 'ATS Checker', path: '/dashboard/ats-checker', icon: FileText },
        { name: 'Career Coach', path: '/dashboard/career-counsellor', icon: UserCircle },
        { name: 'Roadmap AI', path: '/dashboard/roadmap-generator', icon: Bot },
        { name: 'Mock Interview', path: '/dashboard/mock-interview', icon: Bot },
        { name: 'AI Coder', path: '/dashboard/coding-assistant', icon: Bot },
        { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
        { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
        { name: 'Support', path: '/dashboard/support', icon: LifeBuoy },
      ];
    } else if (role === 'TRAINER') {
      return [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: UserCircle },
        { name: 'My Content', path: '/dashboard/trainer/courses', icon: BookOpen },
        { name: 'Grading', path: '/dashboard/trainer/grading', icon: FileText },
        { name: 'My Students', path: '/dashboard/trainer/students', icon: Users },
        { name: 'Earnings', path: '/dashboard/trainer/earnings', icon: CreditCard },
        { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
        { name: 'Support', path: '/dashboard/support', icon: LifeBuoy },
      ];
    } else if (role === 'HR') {
      return [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: UserCircle },
        { name: 'Job Postings', path: '/dashboard/hr/jobs', icon: Briefcase },
        { name: 'Applications', path: '/dashboard/hr/applications', icon: FileText },
        { name: 'Interviews', path: '/dashboard/hr/interviews', icon: Calendar },
        { name: 'Talent Pool', path: '/dashboard/hr/talent', icon: Users },
        { name: 'Billing', path: '/dashboard/hr/billing', icon: CreditCard },
        { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
        { name: 'Support', path: '/dashboard/support', icon: LifeBuoy },
      ];
    }
    // Fallback for Admin returning to normal dashboard
    return [
      { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Profile', path: '/dashboard/profile', icon: UserCircle },
    ];
  };

  const sidebarLinks = getLinks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r bg-white flex shrink-0">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                               (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
