'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

export default function AuthWrapper() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const login = searchParams.get('login')

  const [isRegister, setIsRegister] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (success === '1') {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 4000)
    }
    if (login === '1') {
      setIsRegister(false)
    }
  }, [success, login])

  return (
    <div className="bg-[#1F2937] p-8 rounded-md shadow-md w-full max-w-md text-white relative">
      {showAlert && (
        <div className="absolute top-0 left-0 w-full rounded-t-md bg-green-600 text-white px-4 py-2 text-center text-sm font-semibold shadow-md animate-fade-in">
          ✅ Your account has been created!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center mt-4">
        {isRegister ? 'Crie sua conta' : 'Entrar na sua conta'}
      </h1>

      {isRegister ? <RegisterForm /> : <LoginForm />}

      <p className="mt-4 text-sm text-center text-gray-300">
        {isRegister ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-400 underline hover:text-blue-500 transition"
        >
          {isRegister ? 'Entrar' : 'Cadastrar-se'}
        </button>
      </p>
    </div>
  )
}
