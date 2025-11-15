import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import useAuth from '../store/useAuth'
import { api, authHeaders } from '../lib/api'

export default function Dashboard(){
  const { token, user } = useAuth()
  const [data, setData] = useState<any>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return;
    (async ()=>{
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api') + '/dashboard', { headers: { ...authHeaders(token) } })
        if (!res.ok) throw await res.json()
        setData(await res.json())
      } catch (e: any) { setErr(e.message || 'Failed to load') }
    })()
  }, [token])

  const copyLink = async () => {
    if (!data?.referralCode) return;
    const link = `${location.origin}/register?ref=${data.referralCode}`
    await navigator.clipboard.writeText(link)
    alert('Referral link copied')
  }

  return (
    <div>
      <Nav />
      <main className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        {!token && <div className="mt-4 text-sm text-gray-600">Please login to view your dashboard.</div>}
        {token && data && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-white rounded shadow flex justify-between">
              <div>
                <div className="text-sm text-gray-500">Referred Users</div>
                <div className="text-2xl font-bold">{data.totalReferred}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Converted</div>
                <div className="text-2xl font-bold">{data.converted}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Credits</div>
                <div className="text-2xl font-bold">{data.credits}</div>
              </div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Your referral code</div>
                  <div className="font-mono mt-1">{data.referralCode}</div>
                </div>
                <div>
                  <button onClick={copyLink} className="px-3 py-1 bg-blue-600 text-white rounded">Copy link</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {err && <div className="text-red-600 mt-4">{err}</div>}
      </main>
    </div>
  )
}
