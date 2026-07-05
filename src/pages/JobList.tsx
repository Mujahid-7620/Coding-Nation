import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Briefcase } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';

export function JobList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    api.get('/jobs')
      .then(res => setJobs(res.data.jobs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading jobs...</div>;

  const isHR = user?.roles.includes('HR') || user?.roles.includes('ADMIN');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Job Board</h1>
          <p className="mt-2 text-zinc-600">Find your next big opportunity with our top partners.</p>
        </div>
        {isHR && (
          <Button className="bg-indigo-600 hover:bg-indigo-500">Post a Job</Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="flex h-full flex-col hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {job.status.toUpperCase()}
                  </span>
                </div>
                <CardTitle className="mt-4">{job.title}</CardTitle>
                <CardDescription className="line-clamp-2">{job.description || 'No description provided.'}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-2">
                  <p className="text-sm font-medium text-zinc-900">Salary Range</p>
                  <p className="text-sm text-zinc-500">{job.salaryRange || 'Not disclosed'}</p>
                </div>
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.requirements.map((req: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                        {req}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {jobs.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500">
            No job openings at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
