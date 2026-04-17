'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition">
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
