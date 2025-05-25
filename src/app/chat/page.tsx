'use client'
import { useEffect, useState } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'

type Message = {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

export default function ChatPage() {
  const [uid, setUid] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [credits, setCredits] = useState(25)

  useEffect(() => {
    const localUid = localStorage.getItem('uid')
    if (!localUid) return

    setUid(localUid)

    fetch(`/api/history?uid=${localUid}`)
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          const startMsgs = [
            'Oi! Que bom te ver por aqui novamente 😊',
            'Senti sua falta! Quer conversar um pouco?',
            'Estou aqui se quiser desabafar 💙',
          ]
          const chosen = startMsgs[Math.floor(Math.random() * startMsgs.length)]
          const initial: Message[] = [
            {
              sender: 'ai',
              text: chosen,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]
          setMessages(initial)
          salvarHistorico(localUid, initial)
        }
      })
  }, [])

  const handleSend = async (text: string) => {
    if (!uid || credits <= 0) return

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { sender: 'user', text, timestamp }

    setMessages((prev) => [...prev, userMsg])
    setCredits((prev) => parseFloat((prev - 0.05).toFixed(2)))
    await atualizarCredito(uid, 0.05)

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: text,
        stream: false,
      }),
    })

    const data = await res.json()
    const aiText = data?.response || '❌ Erro: resposta vazia da IA.'

    const aiMsg: Message = {
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => {
      const atualizadas = [...prev, aiMsg]
      salvarHistorico(uid, atualizadas)
      return atualizadas
    })
  }

  const salvarHistorico = async (uid: string, messages: Message[]) => {
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, messages }),
      })
    } catch (err) {
      console.error('Erro ao salvar histórico:', err)
    }
  }

  const atualizarCredito = async (uid: string, valor: number) => {
    try {
      await fetch('/api/credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, debito: valor }),
      })
    } catch (err) {
      console.error('Erro ao atualizar crédito:', err)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} credits={credits} />
    </div>
  )
}
