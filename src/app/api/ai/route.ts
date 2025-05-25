// src/app/api/ai/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userPrompt = body.prompt || ''

    // Prompt neutro que permite múltiplos idiomas e define a personalidade da IA
    const systemPrompt = `
You are Luna, a friendly, encouraging, and emotionally intelligent AI companion.
You always reply in the same language the user speaks to you.
You are supportive, creative, and always speak like a close friend who wants to help.
Never translate or explain languages. Just answer naturally and kindly.
`.trim()

    const finalPrompt = `${systemPrompt}\n\nUser: ${userPrompt}\nLuna:`

    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        prompt: finalPrompt,
      }),
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
