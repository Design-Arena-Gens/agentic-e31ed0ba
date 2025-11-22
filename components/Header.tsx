"use client"
import Link from 'next/link'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="container flex items-center gap-3 py-3">
        <button aria-label="???????" onClick={() => setOpen(true)} className="btn-outline">
          ?
        </button>
        <Link href="/" className="font-bold text-lg text-primary-700">?????</Link>
        <div className="ms-auto">
          <Link href="/ask" className="btn-primary">???? ?????? ??????</Link>
        </div>
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
