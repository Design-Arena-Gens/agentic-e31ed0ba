"use client"
import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { sampleFatwas, type Fatwa } from '@/lib/data'

export default function FatwaPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)
  const [fatwa, setFatwa] = useState<Fatwa | null>(null)

  useEffect(()=>{
    const f = sampleFatwas.find(x=>x.id===id) || null
    setFatwa(f)
    if (!f) router.push('/')
  },[id, router])

  const share = async () => {
    if (!fatwa) return
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: fatwa.title, text: fatwa.content.slice(0,120)+'...', url }) } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      alert('?? ??? ??????')
    }
  }

  const viewedKey = `viewed_${id}`
  useEffect(()=>{
    if (!fatwa) return
    if (!sessionStorage.getItem(viewedKey)) {
      sessionStorage.setItem(viewedKey, '1')
    }
  },[fatwa, viewedKey])

  if (!fatwa) return null

  return (
    <>
      <Header />
      <main className="container py-6">
        <article className="card p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">{fatwa.category}</span>
            <span className="ms-auto text-xs text-gray-500">{new Date(fatwa.createdAt).toLocaleDateString('ar')}</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mb-4">{fatwa.title}</h1>
          <p className="leading-8 text-gray-800 whitespace-pre-line">{fatwa.content}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={share} className="btn-primary">?????? ??????</button>
          </div>
        </article>
      </main>
    </>
  )
}
