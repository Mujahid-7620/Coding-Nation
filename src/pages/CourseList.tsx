import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';

export function CourseList() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data.courses))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading courses...</div>;

  const isTrainer = user?.roles.includes('TRAINER') || user?.roles.includes('ADMIN');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Course Catalog</h1>
          <p className="mt-2 text-zinc-600">Explore our premium courses to upskill your career.</p>
        </div>
        {isTrainer && (
          <Button className="bg-indigo-600 hover:bg-indigo-500">Create Course</Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description || 'No description available.'}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-500">Price</span>
                  <span className="text-lg font-bold text-zinc-900">${course.price}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500">
            No courses found. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
