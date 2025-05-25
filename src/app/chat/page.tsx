'use client'
import { useEffect, useState } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'
import { gerarRespostaDaIA } from '@/lib/ollamaClient'

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
    if (!uid) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { sender: 'user', text, timestamp: time }

    setMessages((prev) => [...prev, userMsg])
    setCredits((prev) => prev - 1)

    // Chamar IA real
    const aiText = await gerarRespostaDaIA(text)

    const aiMsg: Message = {
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const newMessages = [...messages, userMsg, aiMsg]
    setMessages(newMessages)
    await salvarHistorico(uid, newMessages)
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} credits={credits} />
    </div>
  )
}
