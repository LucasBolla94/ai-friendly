'use client'
import { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== rePassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        email,
        fname,
        lname,
        credit: 10,
        vip: false,
      })

      router.push('/auth?success=1')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro desconhecido ao registrar.')
      }
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 text-white">
      <input
        type="text"
        placeholder="Primeiro nome"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400"
        required
      />
      <input
        type="text"
        placeholder="Sobrenome"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400"
        required
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400"
        required
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Cadastrar
      </button>
    </form>
  )
}
