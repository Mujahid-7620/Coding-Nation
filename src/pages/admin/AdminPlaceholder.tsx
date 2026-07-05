import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function AdminPlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h1>
          <p className="text-zinc-500">{description}</p>
        </div>
        <Button>Manage</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Configure and manage {title.toLowerCase()} settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50">
            <div className="text-center">
              <h3 className="mt-2 text-sm font-semibold text-zinc-900">{title} Module Active</h3>
              <p className="mt-1 text-sm text-zinc-500">Connected to backend APIs successfully.</p>
              <div className="mt-6">
                <Button variant="outline">Run Sync</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
