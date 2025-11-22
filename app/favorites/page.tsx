import Header from '@/components/Header'

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="container py-6">
        <div className="card p-6">
          <h1 className="text-xl font-bold text-primary-800 mb-4">???????</h1>
          <FavList />
        </div>
      </main>
    </>
  )
}

function FavList() {
  const favs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favFatwas')||'[]') as string[] : []
  if (!favs.length) return <p className="text-gray-600">?? ???? ????? ?? ??????? ???.</p>
  return (
    <ul className="list-disc pr-6">
      {favs.map((id: string)=> (
        <li key={id}><a className="text-primary-700 underline" href={`/fatwa/${id}`}>???? ??? {id}</a></li>
      ))}
    </ul>
  )
}
