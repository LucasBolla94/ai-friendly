import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Pronto para criar sua IA companheira?
      </h2>
      <p className="text-lg mb-6">
        Comece agora mesmo. É grátis e você recebe créditos para testar.
      </p>
      <Link href="/cadastro">
        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-md text-lg hover:bg-gray-100 transition">
          Cadastrar com Google
        </button>
      </Link>
    </section>
  )
}
