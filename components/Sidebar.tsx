"use client"
import Link from 'next/link'

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside className="drawer" style={{transform: `translateX(${open ? '0' : '100%'})`, transition:'transform .25s ease'}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-primary-800">???????</h2>
          <button onClick={onClose} className="btn-outline">?????</button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link className="px-3 py-2 rounded hover:bg-gray-50" href="/">????????</Link>
          <Link className="px-3 py-2 rounded hover:bg-gray-50" href="/favorites">???????</Link>
          <Link className="px-3 py-2 rounded hover:bg-gray-50" href="/about">??? ???????</Link>
          <Link className="px-3 py-2 rounded hover:bg-gray-50" href="/privacy">????? ????????</Link>
        </nav>
      </aside>
    </>
  )
}
