import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, BookOpen, Briefcase, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/analytics')
      .then(res => setStats(res.data.analytics))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard Overview</h1>
        <p className="text-zinc-500">Monitor your platform's high-level metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} title="Total Users" value={stats?.totalUsers || 0} trend="+12%" />
        <StatCard icon={<BookOpen className="h-5 w-5" />} title="Total Courses" value={stats?.totalCourses || 0} trend="+3%" />
        <StatCard icon={<Briefcase className="h-5 w-5" />} title="Total Jobs" value={stats?.totalJobs || 0} trend="+18%" />
        <StatCard icon={<DollarSign className="h-5 w-5" />} title="Total Revenue" value={`$${(stats?.revenue || 0).toLocaleString()}`} trend="+8%" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">New user registered</p>
                    <p className="text-xs text-zinc-500">{i * 2} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div>
                 <div className="mb-1 flex justify-between text-sm">
                   <span className="font-medium text-zinc-700">CPU Usage</span>
                   <span className="text-zinc-500">42%</span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-zinc-100">
                   <div className="h-2 rounded-full bg-green-500" style={{ width: '42%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="mb-1 flex justify-between text-sm">
                   <span className="font-medium text-zinc-700">Memory Usage</span>
                   <span className="text-zinc-500">68%</span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-zinc-100">
                   <div className="h-2 rounded-full bg-yellow-500" style={{ width: '68%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="mb-1 flex justify-between text-sm">
                   <span className="font-medium text-zinc-700">Database Load</span>
                   <span className="text-zinc-500">24%</span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-zinc-100">
                   <div className="h-2 rounded-full bg-indigo-500" style={{ width: '24%' }}></div>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string | number, trend: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">{title}</p>
              <h3 className="text-2xl font-bold text-zinc-900">{value}</h3>
            </div>
          </div>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {trend}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
