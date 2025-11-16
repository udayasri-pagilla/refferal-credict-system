import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import CreditBanner from '../components/CreditBanner'
import Nav from '../components/Nav'
import useAuth from '../store/useAuth'
import { authHeaders } from '../lib/api'
import { useState } from 'react'
import { useRouter } from 'next/router'

const DEMO_PRODUCTS = [
  { id: 'p1', title: 'Demo Product A', price: '₹799', img: '/images/phone.jpeg', desc: 'A short description of demo product A.' },
  { id: 'p2', title: 'Demo Product B', price: '₹1299', img: '/images/laptop.jpg', desc: 'A short description of demo product B.' },
  { id: 'p3', title: 'Demo Product C', price: '₹1999', img: '/images/headset.jpeg', desc: 'A short description of demo product C.' },
]

/**
 * Build typed headers for fetch. This avoids TS complaining about spreading
 * unknown/any values into the headers object.
 */
function buildAuthHeaders(tok?: string | null): Record<string, string> {
  const base: Record<string, string> = { 'Content-Type': 'application/json' }
  if (!tok) return base

  try {
    const h = (authHeaders as any)(tok)
    if (!h || typeof h !== 'object') {
      // fallback to Authorization header if helper returns something unexpected
      base.Authorization = `Bearer ${tok}`
      return base
    }
    // copy entries, coercing values to strings
    Object.entries(h).forEach(([k, v]) => {
      base[k] = typeof v === 'string' ? v : String(v)
    })
    return base
  } catch {
    base.Authorization = `Bearer ${tok}`
    return base
  }
}

export default function Product(): JSX.Element {
  const router = useRouter()
  const { token } = useAuth()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const buy = async (productId: string, amount = 10) => {
    if (!token) return alert('Please login to buy')
    setErr(null)
    setLoadingId(productId)
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
      const headers = buildAuthHeaders(token)
      const res = await fetch(base + '/api/purchase/buy', {
        method: 'POST',
        headers,
        body: JSON.stringify({ amount })
      })

      // parse body once (avoid consuming stream twice)
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw body

      const json = body
      router.push({
        pathname: '/purchase-success',
        query: {
          amount,
          creditsRemaining: json.credits,
          referralBonus: json.purchase?.referralBonus ? 'true' : 'false'
        }
      })
    } catch (e: any) {
      console.error('Purchase error', e)
      setErr(e?.message || (typeof e === 'string' ? e : 'Purchase failed'))
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div>
      <Nav />
      <main className="max-w-6xl mx-auto p-6">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Store</h1>
            <p className="text-sm text-gray-600">Browse premium digital products</p>
          </div>
          <div className="w-full md:w-96">
            <CreditBanner />
          </div>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {DEMO_PRODUCTS.length} products</div>
          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-2 text-sm">
              <option>Sort: Featured</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
            </select>
          </div>
        </div>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_PRODUCTS.map(p => (
            <div key={p.id}>
              <ProductCard title={p.title} price={p.price} img={p.img} desc={p.desc} />
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => buy(p.id, 10)}
                  disabled={!!loadingId}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-base"
                >
                  {loadingId === p.id ? 'Processing...' : 'Buy'}
                </button>
                <Link href={`/product`} className="px-3 py-2 border rounded">Details</Link>
              </div>
            </div>
          ))}
        </section>

        {err && <div className="mt-6 text-red-600">{err}</div>}
      </main>
    </div>
  )
}
