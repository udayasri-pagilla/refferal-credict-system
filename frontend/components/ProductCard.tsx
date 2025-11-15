import Link from 'next/link'

type Props = { title: string; price: string; href?: string; img?: string }

export default function ProductCard({ title, price, href = '/product', img = '/images/product1.svg' }: Props){
  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 animate-fade-in-up">
      <div className="h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-gray-400">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-sm text-gray-500">{price}</div>
        </div>
        <Link href={href} className="ml-4 px-3 py-1 bg-indigo-600 text-white rounded text-sm">Buy</Link>
      </div>
    </div>
  )
}
