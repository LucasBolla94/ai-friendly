import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const HISTORY_DIR = path.join(process.cwd(), 'data', 'history')

// GET /api/history?uid=abc123
export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid')
  if (!uid) return NextResponse.json({ error: 'UID ausente' }, { status: 400 })

  const filePath = path.join(HISTORY_DIR, `${uid}.json`)
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const messages = JSON.parse(content)
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({ messages: [] }) // Se não existe, retorna vazio
  }
}

// POST /api/history
// body: { uid: string, messages: Message[] }
export async function POST(req: NextRequest) {
  const { uid, messages } = await req.json()
  if (!uid || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  const filePath = path.join(HISTORY_DIR, `${uid}.json`)
  try {
    await fs.mkdir(HISTORY_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erro ao salvar histórico:', err)
    return NextResponse.json({ error: 'Falha ao salvar arquivo' }, { status: 500 })
  }
}
