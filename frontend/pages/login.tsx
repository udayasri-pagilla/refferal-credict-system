// pages/login.tsx
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Nav from '../components/Nav';
import useAuth from '../store/useAuth';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const setAuth = useAuth((s: any) => s.setAuth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || json?.message || 'Login failed');
      // preserve existing behavior
      setAuth(json.token, json.user);
      if (typeof window !== 'undefined' && json.token) localStorage.setItem('token', json.token);
      router.push('/dashboard');
    } catch (err: any) {
      setMsg(err?.message || 'Login failed — check credentials');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">RS</div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
              <p className="text-sm text-slate-500">Access your account and manage referrals</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">
            {msg && <div className="mb-4 text-sm text-rose-700 bg-rose-50 p-3 rounded-md border border-rose-100">{msg}</div>}

            <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="login-heading">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300/60 focus:border-indigo-500 transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
                  <Link href="/forgot" className="text-sm text-indigo-600 hover:underline">Forgot?</Link>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300/60 focus:border-indigo-500 transition"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:brightness-105 active:scale-[0.995] transition disabled:opacity-60"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <div className="my-6 flex items-center justify-center text-sm text-slate-400">
              <span className="px-3 bg-white">or continue with</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => setMsg('Google sign-in not configured in demo')}
                className="w-full border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-3 text-slate-700 hover:bg-slate-50 transition"
              >
                <img src="/icons/google.svg" alt="google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              Don’t have an account? <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Create account</Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            <span>By signing in you agree to our </span>
            <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
