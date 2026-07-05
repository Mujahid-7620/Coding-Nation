import React, { useEffect, useState } from 'react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">User Management</h1>
          <p className="text-zinc-500">Manage students, trainers, HRs, and admins.</p>
        </div>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-600">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Name</th>
                    <th scope="col" className="px-6 py-3 font-medium">Email</th>
                    <th scope="col" className="px-6 py-3 font-medium">Role</th>
                    <th scope="col" className="px-6 py-3 font-medium">Status</th>
                    <th scope="col" className="px-6 py-3 font-medium">Joined</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-900">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{u.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-1">
                          {u.roles.map((r: string) => (
                            <span key={r} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          u.status === 'active' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Ban</button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">No users found.</td>
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
