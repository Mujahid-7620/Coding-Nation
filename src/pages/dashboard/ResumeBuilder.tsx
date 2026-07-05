import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, Edit3, FileText, CheckCircle2 } from 'lucide-react';

export function ResumeBuilder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Resume Builder</h1>
          <p className="text-zinc-500">Your profile automatically generates a professional resume.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile Details</Button>
          <Button><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="border-b bg-zinc-50/50">
              <CardTitle className="text-lg">Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Dummy A4 page look */}
              <div className="mx-auto max-w-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 min-h-[600px]">
                <div className="border-b pb-6">
                  <h1 className="text-3xl font-bold text-zinc-900">John Doe</h1>
                  <p className="mt-2 text-sm text-zinc-600">john.doe@example.com • +1 234 567 8900 • linkedin.com/in/johndoe</p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-zinc-900 uppercase tracking-wider mb-4 text-indigo-700">Education</h2>
                  <div className="mb-4">
                    <div className="flex justify-between font-medium text-zinc-900">
                      <span>B.Tech in Computer Science</span>
                      <span>2020 - 2024</span>
                    </div>
                    <div className="text-sm text-zinc-600">University of Technology • CGPA: 8.5/10</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-zinc-900 uppercase tracking-wider mb-4 text-indigo-700">Skills</h2>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    <strong>Languages:</strong> JavaScript, TypeScript, Python, Java<br/>
                    <strong>Web Technologies:</strong> React, Node.js, Express, HTML/CSS, Tailwind<br/>
                    <strong>Databases:</strong> PostgreSQL, MongoDB, Firebase<br/>
                    <strong>Tools:</strong> Git, Docker, AWS, Vercel
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-zinc-900 uppercase tracking-wider mb-4 text-indigo-700">Projects</h2>
                  <div className="mb-4">
                    <div className="flex justify-between font-medium text-zinc-900">
                      <span>EdTech Learning Platform</span>
                      <span className="text-sm text-zinc-500">React, Node.js</span>
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 space-y-1">
                      <li>Developed a full-stack platform for online learning.</li>
                      <li>Implemented JWT authentication and role-based access control.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-indigo-100">
                  <div className="absolute inset-0 rounded-full border-8 border-indigo-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                  <span className="text-2xl font-bold text-zinc-900">85%</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-zinc-500">Your resume is looking great. Add more projects to reach 100%.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-zinc-700">Added contact information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-zinc-700">Added education details</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-zinc-700">Listed technical skills</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 rounded-full border-2 border-zinc-300 shrink-0"></div>
                  <span className="text-sm text-zinc-500">Add at least 3 projects</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 rounded-full border-2 border-zinc-300 shrink-0"></div>
                  <span className="text-sm text-zinc-500">Include a professional summary</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
