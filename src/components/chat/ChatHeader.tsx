'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ChatHeader() {
  const aiName = 'Luna'
  const [credits, setCredits] = useState<number | null>(null)

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    if (!uid) return

    const fetchCredits = async () => {
      try {
        const docRef = doc(db, 'users', uid)
        const snapshot = await getDoc(docRef)

        if (snapshot.exists()) {
          const data = snapshot.data()
          setCredits(data.credit ?? 0)
        }
      } catch (err) {
        console.error('Erro ao buscar créditos:', err)
        setCredits(0)
      }
    }

    fetchCredits()
  }, [])

  return (
    <header className="sticky top-0 bg-[#1F2937] text-white py-4 px-6 flex justify-between items-center shadow z-10">
      <h1 className="text-lg font-semibold">
        Conversando com <span className="text-blue-400">{aiName}</span>
      </h1>
      <div className="text-sm bg-blue-600 px-3 py-1 rounded-md shadow-sm font-medium">
        💰 {credits !== null ? credits.toFixed(2) : '...'} $TUR
      </div>
    </header>
  )
}
