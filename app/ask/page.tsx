"use client"
import Header from '@/components/Header'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'
import { db, storage } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface AskForm { name: string; question: string; file?: FileList }

export default function AskPage() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<AskForm>()
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const onSubmit = async (data: AskForm) => {
    try {
      let fileUrl: string | null = null
      if (data.file && data.file[0]) {
        const f = data.file[0]
        const storageRef = ref(storage, `questions/${Date.now()}_${f.name}`)
        await uploadBytes(storageRef, f)
        fileUrl = await getDownloadURL(storageRef)
        setUploadedUrl(fileUrl)
      }
      // Firestore write (if configured)
      try {
        await addDoc(collection(db, 'questions'), {
          name: data.name,
          question: data.question,
          fileUrl,
          createdAt: serverTimestamp()
        })
      } catch {
        // fallback: local echo only
      }
      toast.success('?? ????? ????? ?????')
      reset()
    } catch (e) {
      toast.error('??? ??? ????? ???????')
    }
  }

  return (
    <>
      <Header />
      <main className="container py-6">
        <div className="card p-6">
          <h1 className="text-xl font-bold text-primary-800 mb-4">????? ????</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <label className="block mb-1">??? ????????</label>
              <input required {...register('name')} className="w-full border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block mb-1">??????</label>
              <textarea required rows={5} {...register('question')} className="w-full border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block mb-1">???? ?? ??? (???????)</label>
              <input type="file" accept="image/*,.pdf,.doc,.docx" {...register('file')} />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={isSubmitting} className="btn-primary">{isSubmitting? '???? ???????...':'?????'}</button>
            </div>
            {uploadedUrl && (
              <a href={uploadedUrl} target="_blank" className="text-sm text-primary-700 underline">?? ????? - ??? ?????</a>
            )}
          </form>
        </div>
      </main>
    </>
  )
}
