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
  loading: boolean
}

export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const thinkingPhrases = [
    'Thinking deeply...',
    'Processing your feelings...',
    'Reflecting on your words...',
    'Trying to find the right words...',
    'Formulating a thoughtful reply...',
  ]

  return (
    <div className="flex flex-col gap-2 py-4 overflow-y-auto grow px-2">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          sender={msg.sender}
          text={msg.text}
          timestamp={msg.timestamp}
        />
      ))}
      {loading && (
        <div className="text-sm text-gray-500 italic px-4 py-2 animate-pulse">
          {thinkingPhrases[Math.floor(Date.now() / 2500) % thinkingPhrases.length]}
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  )
}
