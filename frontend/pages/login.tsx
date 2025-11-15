import { useState } from 'react'
import Nav from '../components/Nav'
import { api } from '../lib/api'
import useAuth from '../store/useAuth'
import { useRouter } from 'next/router'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const setAuth = useAuth(state => state.setAuth)
  const router = useRouter()

  const handle = async (e: any) => {
    e.preventDefault(); setErr(null)
    try {
      const res = await api('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      setAuth(res.token, res.user)
      router.push('/dashboard')
    } catch (e: any) { setErr(e.message || 'Failed') }
  }

  return (
    <div>
      <Nav />
      <main className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold">Login</h2>
        <form onSubmit={handle} className="mt-4 space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          {err && <div className="text-red-600">{err}</div>}
        </form>
      </main>
    </div>
  )
}
