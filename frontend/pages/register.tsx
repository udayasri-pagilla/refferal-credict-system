import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import useAuth from '../store/useAuth'

export default function RegisterPage(){
  const router = useRouter()
  const { setAuth } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referral, setReferral] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) return setError('Please fill all required fields')
    setLoading(true)
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'
      const res = await fetch(`${base}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, referralCode: referral || undefined })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Registration failed')
      // set auth in store
      if (json.token && json.user) {
        setAuth(json.token, json.user)
      }
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Register error', err)
      setError(err.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Nav uses same centered container so header aligns with card */}
      <Nav />

      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        {/* subtle accent blobs for premium depth (desktop only emphasis) */}
        <div className="relative">
          <div className="pointer-events-none hidden md:block absolute -top-16 -left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 opacity-6 blur-3xl"></div>
          <div className="pointer-events-none hidden md:block absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-6 blur-3xl"></div>

          {/* Centered card */}
          <div className="mx-auto max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              {/* Top brand header */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-2xl shadow-md">
                    RS
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Create your account</h2>
                <p className="text-sm text-slate-500 mt-2">Join Referral Store — earn credits when friends make their first purchase.</p>
              </div>

              <form className="mt-10" onSubmit={submit} aria-label="Register form">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Full name</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      aria-label="Full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      aria-label="Email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Choose a secure password"
                      className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      aria-label="Password"
                      required
                    />
                    <div className="mt-2 text-xs text-slate-400">Use at least 8 characters for a strong password.</div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Referral code (optional)</label>
                    <input
                      value={referral}
                      onChange={e => setReferral(e.target.value)}
                      placeholder="ABCD1234"
                      className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      aria-label="Referral code"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-95 active:scale-[0.98] transition text-lg"
                      aria-disabled={loading}
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </div>

                  {/* Social login */}
                  <div>
                    <button
                      type="button"
                      className="w-full border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-slate-50 text-slate-700 transition"
                      onClick={() => setError('Google sign-in not setup in demo')}
                    >
                      {/* keep same inline svg icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.48c-.23 1.26-.93 2.33-1.98 3.05v2.53h3.2c1.87-1.72 2.95-4.27 2.95-7.32z" fill="#4285F4"/><path d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.2-2.53c-.88.6-2.02.96-3.43.96-2.64 0-4.88-1.78-5.68-4.18H3.02v2.62C4.7 19.8 8.06 22 12 22z" fill="#34A853"/><path d="M6.32 13.82A6.98 6.98 0 016 12c0-.66.12-1.3.32-1.82V7.56H3.02A9.98 9.98 0 002 12c0 1.52.35 2.95.97 4.24l3.33-2.42z" fill="#FBBC05"/><path d="M12 6.5c1.47 0 2.8.5 3.85 1.49l2.82-2.82C16.97 2.98 14.7 2 12 2 8.06 2 4.7 4.2 3.02 7.56l3.33 2.62C7.12 8.28 9.36 6.5 12 6.5z" fill="#EA4335"/></svg>
                      Continue with Google
                    </button>
                  </div>

                  {/* divider */}
                  <div className="relative my-2">
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200"></div>
                    <div className="relative text-center text-sm text-slate-500 bg-white px-3 inline-block z-10">or continue with</div>
                  </div>

                  {error && <div className="text-sm text-red-600 text-center">{error}</div>}

                  <div className="text-sm text-slate-600 mt-2 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-indigo-600 hover:underline font-semibold">Log in</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
