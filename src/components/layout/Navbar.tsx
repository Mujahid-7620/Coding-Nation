import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store/authStore';
import { Button } from '../ui/button';
import { BookOpen, UserCircle, LogOut } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-zinc-900" />
          <span className="text-xl font-bold tracking-tight text-zinc-900">Coding Nation</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/courses" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Courses</Link>
          <Link to="/placements/jobs" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Jobs</Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
