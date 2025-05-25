'use client'

export default function ChatHeader() {
  // Em breve você pode passar isso por props ou vindo do Firebase
  const aiName = 'Luna'
  const credits = 25

  return (
    <header className="sticky top-0 bg-[#1F2937] text-white py-4 px-6 flex justify-between items-center shadow z-10">
      <h1 className="text-lg font-semibold">
        Conversando com <span className="text-blue-400">{aiName}</span>
      </h1>
      <div className="text-sm bg-blue-600 px-3 py-1 rounded-md shadow-sm font-medium">
        💰 {credits} $TUR
      </div>
    </header>
  )
}
