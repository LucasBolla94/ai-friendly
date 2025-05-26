'use client'

type ChatHeaderProps = {
  aiName: string
  credits: number
}

export default function ChatHeader({ aiName, credits }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 bg-[#1F2937] text-white py-4 px-6 flex justify-between items-center shadow z-10">
      <h1 className="text-lg font-semibold">
        Conversando com <span className="text-blue-400">{aiName}</span>
      </h1>
      <div className="text-sm bg-blue-600 px-3 py-1 rounded-md shadow-sm font-medium">
        💰 {credits.toFixed(2)} $TUR
      </div>
    </header>
  )
}
