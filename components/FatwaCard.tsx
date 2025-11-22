import Link from 'next/link'
import type { Fatwa } from '@/lib/data'
import FavoriteButton from './FavoriteButton'

export default function FatwaCard({ fatwa }: { fatwa: Fatwa }) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">{fatwa.category}</span>
        <span className="ms-auto text-xs text-gray-500">{new Date(fatwa.createdAt).toLocaleDateString('ar')}</span>
      </div>
      <Link href={`/fatwa/${fatwa.id}`} className="text-lg font-semibold text-primary-800 hover:underline">
        {fatwa.title}
      </Link>
      <p className="text-gray-600 line-clamp-2">{fatwa.content}</p>
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs text-gray-500">???????: {fatwa.views}</span>
        <div className="ms-auto">
          <FavoriteButton id={fatwa.id} title={fatwa.title} />
        </div>
      </div>
    </div>
  )
}
