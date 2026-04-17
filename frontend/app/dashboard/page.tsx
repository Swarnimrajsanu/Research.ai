'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface ResearchHistory {
  id: string;
  topic: string;
  report: string;
  created_at: string;
}

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<ResearchHistory[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const getAuthToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  const fetchHistory = async () => {
    const token = await getAuthToken();
    if (!token) return;

    try {
      const res = await fetch('http://localhost:8000/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const token = await getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topic })
      });
      
      const data = await res.json();
      setResult(data.report);
      fetchHistory(); // Refresh history
    } catch (error) {
      console.error('Research failed:', error);
      setResult('Error generating report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto flex gap-8 flex-col lg:flex-row">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center bg-gray-800 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-blue-400">Research.ai Dashboard</h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition font-semibold"
            >
              Sign Out
            </button>
          </div>

          <form onSubmit={handleResearch} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4 font-semibold">New Research Topic</h2>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Quantum Computing Advancements"
                className="flex-1 p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Researching...' : 'Generate Report'}
              </button>
            </div>
          </form>

          {result && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4 font-semibold text-green-400">Latest Result</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-300">{result}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: History */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg h-fit max-h-[80vh] overflow-y-auto hidden-scrollbar">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Your History</h2>
          {history.length === 0 ? (
            <p className="text-gray-400">No previous research found.</p>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="p-4 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition" onClick={() => setResult(item.report)}>
                  <p className="font-semibold text-blue-300">{item.topic}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
