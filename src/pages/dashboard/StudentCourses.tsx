import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlayCircle, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockCourses = [
  {
    id: '1',
    title: 'Advanced Full-Stack Web Development',
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    nextLesson: 'Building REST APIs with Express',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&h=200&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms in TypeScript',
    progress: 30,
    totalModules: 10,
    completedModules: 3,
    nextLesson: 'Binary Search Trees',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=300&h=200&auto=format&fit=crop'
  }
];

export function StudentCourses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">My Courses</h1>
          <p className="text-zinc-500">Resume learning and track your progress.</p>
        </div>
        <Button asChild><Link to="/courses">Browse Catalog</Link></Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map(course => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="h-40 w-full overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform hover:scale-105" />
            </div>
            <CardContent className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-zinc-900 line-clamp-2">{course.title}</h3>
              
              <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
                <span className="flex items-center"><Award className="mr-1 h-4 w-4" /> {course.completedModules}/{course.totalModules} Modules</span>
                <span className="font-medium text-indigo-600">{course.progress}%</span>
              </div>
              
              <div className="mt-2 h-2 w-full rounded-full bg-zinc-100">
                <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${course.progress}%` }}></div>
              </div>

              <div className="mt-4 rounded-md bg-zinc-50 p-3 border border-zinc-100">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Next up</p>
                <div className="mt-1 flex items-center text-sm font-medium text-zinc-900">
                  <PlayCircle className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="truncate">{course.nextLesson}</span>
                </div>
              </div>

              <div className="mt-6 mt-auto">
                <Button className="w-full">Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
