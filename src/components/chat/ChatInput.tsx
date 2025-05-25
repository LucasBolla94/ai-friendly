'use client'
import { useState } from 'react'

type ChatInputProps = {
  onSend: (text: string) => void
  credits: number
}

export default function ChatInput({ onSend, credits }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    if (credits <= 0) return alert('⚠️ Créditos insuficientes.')

    onSend(text)
    setText('')
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center gap-2 shadow-inner sticky bottom-0">
      <textarea
        className="w-full resize-none border rounded-md p-2 text-sm focus:outline-blue-500"
        rows={1}
        value={text}
        placeholder={credits <= 0 ? 'Créditos esgotados' : 'Digite sua mensagem...'}
        disabled={credits <= 0}
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
        disabled={credits <= 0}
      >
        Enviar
      </button>
    </div>
  )
}
