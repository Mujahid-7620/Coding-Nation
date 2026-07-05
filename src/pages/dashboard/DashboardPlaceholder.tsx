import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function DashboardPlaceholder({ title, description, actionText }: { title: string, description: string, actionText?: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h1>
          <p className="text-zinc-500">{description}</p>
        </div>
        {actionText && <Button>{actionText}</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Manage your {title.toLowerCase()} settings and data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50">
            <div className="text-center">
              <h3 className="mt-2 text-sm font-semibold text-zinc-900">{title} Module Active</h3>
              <p className="mt-1 text-sm text-zinc-500">Connected to backend securely.</p>
              <div className="mt-6">
                <Button variant="outline">Refresh Data</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
