"use client"
import { useEffect, useState } from 'react'

function getFavs(): string[] {
  try { return JSON.parse(localStorage.getItem('favFatwas')||'[]') } catch { return [] }
}

export default function FavoriteButton({ id, title }: { id: string; title: string }) {
  const [fav, setFav] = useState(false)
  useEffect(()=>{ setFav(getFavs().includes(id)) },[id])
  const toggle = () => {
    const favs = new Set(getFavs())
    if (favs.has(id)) { favs.delete(id); setFav(false) } else { favs.add(id); setFav(true) }
    localStorage.setItem('favFatwas', JSON.stringify([...favs]))
  }
  return (
    <button onClick={toggle} aria-label="????? ???????" className={`px-3 py-1 rounded border ${fav? 'bg-primary-600 text-white border-primary-600':'border-primary-600 text-primary-700 hover:bg-primary-50'}`}>
      {fav ? '?? ???????' : '??? ???????'}
    </button>
  )
}
