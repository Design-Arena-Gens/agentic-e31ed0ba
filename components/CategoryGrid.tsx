import Link from 'next/link'
import { categories } from '@/lib/data'

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {categories.map((c) => (
        <Link key={c} href={`/?cat=${encodeURIComponent(c)}`} className="card p-5 hover:shadow-md transition">
          <div className="text-primary-700 font-semibold">{c}</div>
          <div className="text-sm text-gray-500">???? ???? ???????</div>
        </Link>
      ))}
    </div>
  )
}
