import { Suspense } from 'react'
import AuthWrapper from '@/components/auth/AuthWrapper'

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0e0e10] px-4">
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <AuthWrapper />
      </Suspense>
    </main>
  )
}
