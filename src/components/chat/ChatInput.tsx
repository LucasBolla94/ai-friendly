'use client'
import { useState } from 'react'

type ChatInputProps = {
  onResponse: (text: string) => void
  credits: number
}

export default function ChatInput({ onResponse, credits }: ChatInputProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!text.trim() || loading) return
    if (credits <= 0) return alert('⚠️ Créditos insuficientes.')

    const userMessage = text
    setText('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: userMessage,
          stream: false,
        }),
      })

      const data = await res.json()

      if (data?.response) {
        onResponse(data.response)
      } else {
        onResponse('❌ Erro: Resposta vazia da IA.')
        console.error('Resposta inválida:', data)
      }
    } catch (err) {
      console.error('Erro ao gerar resposta da IA:', err)
      onResponse('❌ Erro ao conectar com a IA.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center gap-2 shadow-inner sticky bottom-0">
      <textarea
        className="w-full resize-none border rounded-md p-2 text-sm focus:outline-blue-500"
        rows={1}
        value={text}
        placeholder={credits <= 0 ? 'Créditos esgotados' : 'Digite sua mensagem...'}
        disabled={loading || credits <= 0}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        disabled={loading || credits <= 0}
      >
        {loading ? '...' : 'Enviar'}
      </button>
    </div>
  )
}
