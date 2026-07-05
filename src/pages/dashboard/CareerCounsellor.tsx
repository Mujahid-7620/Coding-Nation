import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/src/api/client';

export function CareerCounsellor() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AI Career Counsellor. What are your career goals or what roles are you exploring?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => `${m.sender === 'ai' ? 'Counsellor' : 'User'}: ${m.text}`).join('\n');
      const prompt = `You are an expert career counsellor. Provide guidance, suggest roles, and answer career-related questions.\n\nConversation history:\n${history}\n\nUser: ${userText}\n\nCounsellor:`;

      const response = await api.post('/ai/gemini', { prompt });
      
      setMessages(prev => [...prev, { id: Date.now(), text: response.data.result, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Connection error. Please try again later.', sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Career Counsellor</h1>
        <p className="text-zinc-500">Get personalized career advice and explore suitable roles with AI.</p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'}`}>
                    {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
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
                    Analyzing career path...
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t p-4 bg-zinc-50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about roles, transitions, or salaries..."
                className="flex-1 rounded-md border border-zinc-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading} className="shrink-0 bg-purple-600 hover:bg-purple-700">
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
