export async function gerarRespostaDaIA(prompt: string): Promise<string> {
  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt,
        stream: false,
      }),
    })

    const data = await res.json()
    return data.response || '[IA não respondeu]'
  } catch (err) {
    console.error('Erro ao gerar resposta da IA:', err)
    return '[Erro ao conectar com a IA]'
  }
}
