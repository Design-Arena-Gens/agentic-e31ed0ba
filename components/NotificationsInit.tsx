"use client"
import { useEffect } from 'react'
import { getToken, onMessage } from 'firebase/messaging'
import { getWebMessaging } from '@/lib/firebase'
import { toast } from 'sonner'

export default function NotificationsInit() {
  useEffect(() => {
    // Register SW for FCM
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').catch(() => {})
    }

    const init = async () => {
      try {
        const messaging = await getWebMessaging()
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        if (!messaging || !vapidKey) return
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return
        await getToken(messaging, { vapidKey })
        onMessage(messaging, () => {
          toast.info('??? ????? ???? ?????')
        })
      } catch {
        // ignore
      }
    }
    void init()
  }, [])
  return null
}
