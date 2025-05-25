// src/app/api/ai/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await ollamaRes.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro ao chamar o Ollama:', error)
    return new Response(JSON.stringify({ error: 'Erro ao gerar resposta da IA' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
