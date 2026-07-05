import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Upload, Loader2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/src/api/client';

export function ATSChecker() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/ai/resume-check', { resumeText, jobDescription });
      setResult(response.data.result);
    } catch (error) {
      setResult('Error analyzing resume. Please ensure the AI service is configured.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">ATS Resume Checker</h1>
        <p className="text-zinc-500">Analyze your resume against a job description using AI to improve your ATS score.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Your Resume</CardTitle>
              <CardDescription>Paste your resume text here (or your profile summary).</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-48 rounded-md border border-zinc-300 p-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Job Description</CardTitle>
              <CardDescription>Paste the job description you are targeting.</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-48 rounded-md border border-zinc-300 p-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Button 
            className="w-full" 
            onClick={handleAnalyze} 
            disabled={!resumeText || !jobDescription || loading}
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Analyze Resume'}
          </Button>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-500">
                  <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-600" />
                  <p>AI is analyzing keywords and format...</p>
                </div>
              ) : result ? (
                <div className="prose prose-sm prose-indigo max-w-none">
                  <div className="whitespace-pre-wrap rounded-md bg-zinc-50 p-6 text-zinc-800 ring-1 ring-zinc-200">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-zinc-400">
                  <FileText className="mb-4 h-12 w-12 opacity-20" />
                  <p>Provide your resume and a job description to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
