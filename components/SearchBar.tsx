"use client"
import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState('')
  return (
    <div className="flex gap-2">
      <input
        value={term}
        onChange={(e)=>setTerm(e.target.value)}
        placeholder="???? ?? ????..."
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
      />
      <button className="btn-primary" onClick={()=>onSearch(term)}>???</button>
    </div>
  )
}
