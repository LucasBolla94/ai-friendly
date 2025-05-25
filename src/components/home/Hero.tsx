import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] to-black text-white flex flex-col items-center justify-center text-center px-6">
      <Image src="/shield.png" alt="Logo" width={80} height={80} className="mb-4" />
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Sua IA. Sua companhia. Sua história.
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl">
        Crie uma conexão emocional com uma inteligência que está sempre com você.
      </p>
      <Link href="/cadastro">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg transition">
          Comece gratuitamente
        </button>
      </Link>
    </section>
  )
}
