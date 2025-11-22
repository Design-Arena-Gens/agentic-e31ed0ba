import './globals.css'
import { Cairo } from 'next/font/google'
import { Toaster } from 'sonner'
import NotificationsInit from '@/components/NotificationsInit'

const cairo = Cairo({ subsets: ['arabic'], weight: ['300','400','600','700'] })

export const metadata = {
  title: '????? - Islamic Fatwas',
  description: '????? ????? ???? ???? ?????',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Toaster position="top-center" richColors dir="rtl" />
        <NotificationsInit />
      </body>
    </html>
  )
}
