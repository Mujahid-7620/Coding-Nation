import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { api } from '@/src/api/client';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Briefcase, FileText, Activity } from 'lucide-react';

export function DashboardOverview() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get('/users/me').then(res => setProfile(res.data.profile)).catch(console.error);
  }, []);

  if (!profile) return <div className="p-8 text-center">Loading dashboard...</div>;

  const role = profile.roles[0] || 'STUDENT';

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {profile.firstName}!</h1>
        <p className="mt-1 text-sm text-zinc-500">You are logged in as a {role}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {role === 'STUDENT' && (
          <>
            <StatCard icon={<BookOpen className="h-5 w-5" />} title="Enrolled Courses" value="3" />
            <StatCard icon={<Activity className="h-5 w-5" />} title="Assessments Pending" value="1" />
            <StatCard icon={<FileText className="h-5 w-5" />} title="Job Applications" value="4" />
            <StatCard icon={<Briefcase className="h-5 w-5" />} title="Projects Completed" value="2" />
          </>
        )}
        {(role === 'TRAINER') && (
          <>
            <StatCard icon={<BookOpen className="h-5 w-5" />} title="Active Courses" value="12" />
            <StatCard icon={<Activity className="h-5 w-5" />} title="Total Students" value="450" />
            <StatCard icon={<FileText className="h-5 w-5" />} title="Pending Submissions" value="23" />
            <StatCard icon={<Briefcase className="h-5 w-5" />} title="Live Classes" value="4" />
          </>
        )}
        {(role === 'HR') && (
          <>
            <StatCard icon={<Briefcase className="h-5 w-5" />} title="Open Positions" value="5" />
            <StatCard icon={<FileText className="h-5 w-5" />} title="Total Applications" value="128" />
            <StatCard icon={<Activity className="h-5 w-5" />} title="Interviews Scheduled" value="12" />
            <StatCard icon={<BookOpen className="h-5 w-5" />} title="Hired Candidates" value="3" />
          </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">System updated</p>
                  <p className="text-xs text-zinc-500">Just now</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">New message from admin</p>
                  <p className="text-xs text-zinc-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-zinc-500">Navigate to specific sections via the sidebar to perform actions related to your role.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-zinc-500">{title}</p>
            <h3 className="text-2xl font-bold text-zinc-900">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

