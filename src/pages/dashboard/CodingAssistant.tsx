import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Code, Loader2 } from 'lucide-react';
import { api } from '@/src/api/client';

export function CodingAssistant() {
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleReview = async () => {
    if (!code || !question) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/ai/coding-assistant', { code, question });
      setResult(response.data.result);
    } catch (error) {
      setResult('Error reaching the coding assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">AI Coding Assistant</h1>
        <p className="text-zinc-500">Get code reviews, debugging help, and refactoring suggestions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Code</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-64 rounded-md border border-zinc-300 p-4 font-mono text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-zinc-900 text-zinc-100"
                placeholder="// Paste your code here..."
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What do you need help with?</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Why is this throwing a null pointer exception?"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && handleReview()}
              />
              <div className="mt-4">
                <Button className="w-full" onClick={handleReview} disabled={!code || !question || loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reviewing...</> : 'Ask Assistant'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-500">
                  <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-600" />
                  <p>Analyzing your code...</p>
                </div>
              ) : result ? (
                <div className="prose prose-sm prose-indigo max-w-none">
                  <div className="whitespace-pre-wrap rounded-md bg-zinc-50 p-6 text-zinc-800 ring-1 ring-zinc-200">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-400">
                  <Code className="mb-4 h-12 w-12 opacity-20" />
                  <p>Provide your code and a question to get feedback.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
