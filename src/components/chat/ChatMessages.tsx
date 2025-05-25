// src/components/chat/ChatMessages.tsx
'use client'
import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

type Message = {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

type ChatMessagesProps = {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col gap-2 py-4 overflow-y-auto max-h-[calc(100vh-180px)] px-2">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          sender={msg.sender}
          text={msg.text}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  )
}
