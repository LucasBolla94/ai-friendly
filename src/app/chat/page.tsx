// src/pages/chat.tsx
'use client'
import { useState, useEffect } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'

type Message = {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [credits, setCredits] = useState(25)

  useEffect(() => {
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
  }, [])

  const handleSend = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { sender: 'user', text, timestamp: time }

    const aiResponse: Message = {
      sender: 'ai',
      text: gerarRespostaAleatoria(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg, aiResponse])
    setCredits((prev) => prev - 1)
  }

  const gerarRespostaAleatoria = () => {
    const frases = [
      'Eu entendo como você se sente...',
      'Quer me contar mais sobre isso?',
      'Isso parece importante pra você.',
      'Estou aqui para ouvir você 💙',
    ]
    return frases[Math.floor(Math.random() * frases.length)]
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} credits={credits} />
    </div>
  )
}
