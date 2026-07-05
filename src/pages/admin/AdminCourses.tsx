import React, { useEffect, useState } from 'react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might have an /admin/courses endpoint that returns ALL courses regardless of status
    api.get('/courses')
      .then(res => setCourses(res.data.courses))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Course Moderation</h1>
          <p className="text-zinc-500">Approve, reject, and manage platform courses.</p>
        </div>
        <Button>New Category</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center">Loading courses...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-600">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Title</th>
                    <th scope="col" className="px-6 py-3 font-medium">Price</th>
                    <th scope="col" className="px-6 py-3 font-medium">Status</th>
                    <th scope="col" className="px-6 py-3 font-medium">Created</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 font-medium text-zinc-900 max-w-xs truncate">
                        {c.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">${c.price}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          c.status === 'published' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Review</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
