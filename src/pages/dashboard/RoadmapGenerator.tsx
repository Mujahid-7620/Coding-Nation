import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Map, Loader2, MapPin } from 'lucide-react';
import { api } from '@/src/api/client';

export function RoadmapGenerator() {
  const [goal, setGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!goal || !currentSkills) return;
    setLoading(true);
    setRoadmap(null);

    try {
      const response = await api.post('/ai/roadmap', { goal, currentSkills });
      setRoadmap(response.data.result);
    } catch (error) {
      setRoadmap('Error generating roadmap. Please check API connections.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Roadmap Generator</h1>
        <p className="text-zinc-500">Create a custom learning path tailored to your goals and current skills.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Tell us where you are and where you want to go.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Target Role or Goal</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Current Skills</label>
                <textarea
                  className="w-full h-32 rounded-md border border-zinc-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Basic HTML, CSS, JavaScript"
                  value={currentSkills}
                  onChange={e => setCurrentSkills(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate} 
                disabled={!goal || !currentSkills || loading}
              >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Generate Roadmap'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-500">
                  <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-600" />
                  <p>Charting the best path for you...</p>
                </div>
              ) : roadmap ? (
                <div className="prose prose-sm prose-indigo max-w-none">
                  <div className="whitespace-pre-wrap rounded-md bg-zinc-50 p-6 text-zinc-800 ring-1 ring-zinc-200">
                    {roadmap}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-400">
                  <Map className="mb-4 h-12 w-12 opacity-20" />
                  <p>Fill out the configuration to generate your roadmap.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
