type MessageBubbleProps = {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

export default function MessageBubble({ sender, text, timestamp }: MessageBubbleProps) {
  const isUser = sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 px-4`}>
      <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow-md relative
        ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        <p>{text}</p>
        <span className="absolute text-[10px] text-gray-400 bottom-1 right-2">{timestamp}</span>
      </div>
    </div>
  )
}
