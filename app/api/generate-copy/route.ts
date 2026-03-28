import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const planLabels: Record<string, string> = {
  A1: 'START', A2: 'SCALE', A3: 'PERFORMANCE', A4: 'ENGINE',
}

function recommendPlan(followers: number, avgLikes: number): 'A1' | 'A2' | 'A3' | 'A4' {
  const engagementRate = followers > 0 ? avgLikes / followers : 0

  if (followers >= 100_000 || (followers >= 50_000 && engagementRate > 0.03)) return 'A4'
  if (followers >= 30_000 || (followers >= 10_000 && engagementRate > 0.04)) return 'A3'
  if (followers >= 5_000 || (followers >= 1_000 && engagementRate > 0.05)) return 'A2'
  return 'A1'
}

export async function POST(req: NextRequest) {
  let recommendedPlan: 'A1' | 'A2' | 'A3' | 'A4' = 'A1'

  try {
    const { firstName, username, followers_count, biography, category, posts } = await req.json()

    const avgLikes =
      posts?.length > 0
        ? posts.reduce((a: number, p: { likes: number }) => a + (p.likes ?? 0), 0) / posts.length
        : 0

    recommendedPlan = recommendPlan(followers_count ?? 0, avgLikes)

    const postCaptions = posts
      ?.slice(0, 3)
      .map((p: { caption: string }, i: number) => `Post ${i + 1}: "${p.caption?.slice(0, 200)}"`)
      .join('\n') ?? ''

    const prompt = `Você é um copywriter especialista em marketing direto e vendas B2B no Brasil.

Dados do lead:
- Nome: ${firstName}
- Instagram: @${username}
- Seguidores: ${followers_count?.toLocaleString('pt-BR') ?? 0}
- Bio: ${biography || 'não informada'}
- Categoria: ${category || 'não informada'}
- Média de curtidas por post: ${Math.round(avgLikes)}
${postCaptions ? `- Últimos posts:\n${postCaptions}` : ''}

Escreva UMA mensagem de abordagem personalizada em português, DIRETO AO PONTO, com no máximo 3 frases.
A mensagem deve:
1. Referenciar a realidade específica do perfil (seguidores, nicho, posts)
2. Conectar essa realidade com a falta de um sistema comercial estruturado
3. Criar urgência sem soar genérico
4. Soar humana, direta e inteligente — não robótica
5. NÃO mencionar nomes de concorrentes, ferramentas específicas ou datas

Responda APENAS com o texto da mensagem, sem aspas, sem introdução, sem explicações.`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })

    const copy =
      message.content[0].type === 'text' ? message.content[0].text.trim() : null

    return NextResponse.json({
      copy,
      recommendedPlan,
      planLabel: planLabels[recommendedPlan],
    })
  } catch (err) {
    console.error('[generate-copy] erro:', err)
    return NextResponse.json({ copy: null, recommendedPlan, planLabel: planLabels[recommendedPlan] })
  }
}
