import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Mic, User, Send, Loader2, PlayCircle } from 'lucide-react';
import { api } from '@/src/api/client';

export function MockInterview() {
  const [role, setRole] = useState('Frontend Developer');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setInterviewStarted(true);
    setLoading(true);
    try {
      const response = await api.post('/ai/mock-interview', { role });
      setMessages([{ id: Date.now(), text: response.data.result, sender: 'interviewer' }]);
    } catch (error) {
      setMessages([{ id: Date.now(), text: 'Error starting interview. Please check connection.', sender: 'interviewer' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/ai/mock-interview', { role, userResponse: userText });
      setMessages(prev => [...prev, { id: Date.now(), text: response.data.result, sender: 'interviewer' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Connection error.', sender: 'interviewer' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Mock Interview</h1>
          <p className="text-zinc-500">Practice behavioral and technical questions with an AI interviewer.</p>
        </div>
        {!interviewStarted && (
          <div className="flex space-x-2">
            <input
              type="text"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="Target Role"
            />
            <Button onClick={startInterview} disabled={loading}><PlayCircle className="mr-2 h-4 w-4" /> Start Interview</Button>
          </div>
        )}
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col p-0">
          {!interviewStarted ? (
            <div className="flex flex-1 flex-col items-center justify-center text-zinc-400 p-6">
              <Mic className="mb-4 h-16 w-16 opacity-20" />
              <h3 className="text-lg font-medium text-zinc-900">Ready to practice?</h3>
              <p className="mt-2 text-center text-sm max-w-md">Enter your target role in the top right and click Start Interview. The AI will ask you questions one by one.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[80%] items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'}`}>
                        {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </div>
                      <div className={`rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-center space-x-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                      <div className="rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-500 italic">
                        Evaluating and preparing next question...
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t p-4 bg-zinc-50">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    className="flex-1 rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                    disabled={loading}
                  />
                  <Button onClick={handleSend} disabled={loading} className="shrink-0 bg-red-600 hover:bg-red-700">
                    <Send className="mr-2 h-4 w-4" /> Reply
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
