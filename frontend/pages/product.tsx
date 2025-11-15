import Nav from '../components/Nav'
import useAuth from '../store/useAuth'
import { authHeaders } from '../lib/api'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Product(){
  const router = useRouter()
  const { token } = useAuth()
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const buy = async () => {
    try {
      if (!token) return alert('Login first')
      setLoading(true)
      setMsg('Processing...')
      const res = await fetch((process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api') + '/purchase/buy', {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders(token) }, body: JSON.stringify({ amount: 10 })
      })
      if (!res.ok) throw await res.json()
      const json = await res.json()
      
      // Redirect to success page with purchase details
      router.push({
        pathname: '/purchase-success',
        query: {
          amount: 10,
          creditsRemaining: json.credits,
          referralBonus: json.purchase.referralBonus ? 'true' : 'false'
        }
      })
    } catch (e: any) { 
      setLoading(false)
      console.error('Purchase error:', e)
      setMsg(e.message || e || 'Purchase failed') 
    }
  }

  return (
    <div>
      <Nav />
      <main className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold">Product</h2>
        <div className="mt-4 p-4 bg-white rounded shadow">
          <div className="font-semibold">Demo Product</div>
          <div className="mt-2">Price: $10 (simulated)</div>
          <div className="mt-4">
            <button onClick={buy} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
              {loading ? 'Processing...' : 'Buy Product'}
            </button>
          </div>
          {msg && <div className="mt-3 text-sm text-gray-700">{msg}</div>}
        </div>
      </main>
    </div>
  )
}
