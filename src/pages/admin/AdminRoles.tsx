import React, { useEffect, useState } from 'react';
import { api } from '@/src/api/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function AdminRoles() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/roles')
      .then(res => setRoles(res.data.roles))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Role Management</h1>
          <p className="text-zinc-500">Define access control and platform permissions.</p>
        </div>
        <Button>Create Role</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>Available roles and their default permission levels.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center">Loading roles...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((r) => (
                <div key={r.id} className="flex flex-col justify-between rounded-lg border border-zinc-200 p-6">
                  <div>
                    <h3 className="font-semibold text-zinc-900">{r.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      Standard permissions for {r.name.toLowerCase()} access. Includes platform-specific modules.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">Edit Permissions</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
