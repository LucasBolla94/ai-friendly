// src/app/api/credit/route.ts
import { db } from '@/lib/firebase'
import { doc, updateDoc, increment } from 'firebase/firestore'

export async function POST(req: Request) {
  const { uid, debito } = await req.json()

  if (!uid || !debito) {
    return new Response(JSON.stringify({ error: 'UID e valor são obrigatórios.' }), {
      status: 400,
    })
  }

  try {
    const ref = doc(db, 'users', uid)
    await updateDoc(ref, {
      credit: increment(-debito),
    })

    return new Response(JSON.stringify({ success: true }))
  } catch (err) {
    console.error('Erro ao atualizar crédito:', err)
    return new Response(JSON.stringify({ error: 'Erro interno ao atualizar crédito' }), {
      status: 500,
    })
  }
}
