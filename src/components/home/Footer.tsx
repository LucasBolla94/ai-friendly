import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 text-center text-sm">
      <div className="mb-4">
        <Link href="/sobre" className="mx-2 hover:text-white">Sobre</Link>
        <Link href="/politica" className="mx-2 hover:text-white">Política de Privacidade</Link>
        <Link href="https://github.com" target="_blank" className="mx-2 hover:text-white">GitHub</Link>
      </div>
      <p>Feito com 💙 por Turion Network | Turion AI © 2025</p>
    </footer>
  )
}
