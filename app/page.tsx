"use client"
import { useMemo, useState, useEffect } from 'react'
import Header from '@/components/Header'
import CategoryGrid from '@/components/CategoryGrid'
import SearchBar from '@/components/SearchBar'
import FatwaCard from '@/components/FatwaCard'
import { sampleFatwas, type Fatwa } from '@/lib/data'
import Link from 'next/link'
import { toast } from 'sonner'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const c = params.get('cat'); if (c) setCat(c)
  },[])

  // Simulate realtime new fatwa notification (would be Firestore listener if configured)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      toast.info('??? ????? ???? ?????')
    }, 8000)
    return ()=>clearTimeout(timer)
  },[])

  const filtered = useMemo(()=>{
    let list: Fatwa[] = sampleFatwas
    if (cat) list = list.filter(f=>f.category===cat)
    if (query) list = list.filter(f=> (f.title+f.content).includes(query))
    return list
  },[query, cat])

  const mostRead = useMemo(()=>[...sampleFatwas].sort((a,b)=>b.views-a.views).slice(0,3),[])
  const newest = useMemo(()=>[...sampleFatwas].sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt)).slice(0,3),[])

  return (
    <>
      <Header />
      <main className="container py-6 flex flex-col gap-6">
        <section className="card p-5">
          <h1 className="text-xl font-bold text-primary-800 mb-3">???? ?? ????</h1>
          <SearchBar onSearch={setQuery} />
        </section>

        <section className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-primary-800">???????</h2>
            {cat && <button className="btn-outline" onClick={()=>setCat(null)}>????? ???????</button>}
          </div>
          <CategoryGrid />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-semibold text-primary-800 mb-3">?????? ?????</h3>
            <div className="flex flex-col gap-3">
              {mostRead.map(f=> <FatwaCard key={f.id} fatwa={f} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-primary-800 mb-3">???????</h3>
            <div className="flex flex-col gap-3">
              {newest.map(f=> <FatwaCard key={f.id} fatwa={f} />)}
            </div>
          </div>
        </section>

        <section className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-primary-800">?? ???????</h2>
            <Link className="btn-primary" href="/ask">???? ?????? ??????</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(f=> <FatwaCard key={f.id} fatwa={f} />)}
          </div>
        </section>
      </main>
    </>
  )
}
