import Link from 'next/link'
import useAuth from '../store/useAuth'

export default function Nav(){
  const { token, user, clearAuth } = useAuth()
  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="font-semibold">FileSure</div>
      <div className="space-x-3">
        <Link href="/">Home</Link>
        <Link href="/product">Product</Link>
        {token ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => clearAuth()} className="ml-2 text-sm text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
