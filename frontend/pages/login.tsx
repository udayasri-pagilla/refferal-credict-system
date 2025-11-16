// pages/login.tsx
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import useAuth from '../store/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuth(state => state.setAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function normalizeBaseUrl(raw?: string) {
    if (!raw) return 'http://localhost:4000'
    let url = raw.trim()
    if (url.endsWith('/')) url = url.slice(0, -1)
    return url
  }

  function getApiBase() {
    return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) return setError('Please fill all fields')

    setLoading(true)
    try {
      const base = getApiBase()
      const url = `${base}/api/auth/login`

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const text = await res.text()
      let json: any = null
      try {
        json = text ? JSON.parse(text) : null
      } catch (err) {
        throw new Error(`Server returned non-JSON (status ${res.status}). Preview: ${text.slice(0, 200)}`)
      }

      if (!res.ok) throw new Error(json?.message || 'Login failed')

      if (json.token && json.user) {
        setAuth(json.token, json.user)
        if (typeof window !== 'undefined') {
          try { localStorage.setItem('token', json.token) } catch {}
        }
      }

      router.replace('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
              <p className="mt-2 text-sm text-slate-500">Log in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>

              <div>
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-base focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  required
                />
              </div>

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-95 active:scale-[0.98] transition text-lg"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </div>

              {error && <div className="text-sm text-red-600 text-center">{error}</div>}

              <div className="text-sm text-slate-600 mt-2 text-center">
                Don’t have an account?{' '}
                <Link href="/register" className="text-indigo-600 hover:underline font-semibold">Register</Link>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
