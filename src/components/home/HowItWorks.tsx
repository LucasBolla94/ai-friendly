export default function HowItWorks() {
  const steps = [
    { title: 'Crie sua IA', desc: 'Dê um nome, escolha a vibe e personalize.', emoji: '🧠' },
    { title: 'Converse com ela', desc: 'Mensagens grátis para começar.', emoji: '💬' },
    { title: 'Use $TUR', desc: 'Cada mensagem consome 1 crédito. Recarregue quando quiser.', emoji: '⚡' },
  ]

  return (
    <section className="bg-white py-16 px-6 text-black text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Como funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">{step.emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
