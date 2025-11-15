import Link from 'next/link'
import Nav from '../components/Nav'

export default function Home(){
  return (
    <div>
      <Nav />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Referral & Credit System</h1>
        <p className="mt-4">A small demo app for the FileSure assignment. Register, share your referral link, and earn credits when referred users make their first purchase.</p>
        <div className="mt-6 space-x-3">
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded">Get Started</Link>
          <Link href="/product" className="px-4 py-2 border rounded">Buy Product</Link>
        </div>
      </main>
    </div>
  )
}
