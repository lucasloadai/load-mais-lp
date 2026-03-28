import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  nome: z.string().min(2).max(100).trim(),
  whatsapp: z.string().min(10).max(20),
  ddd: z.string().length(2),
  instagram: z.string().max(50).optional(),
  instagram_followers: z.number().int().min(0).optional(),
  instagram_verified: z.boolean().optional(),
  lead_score: z.number().int().min(0).optional(),
  lead_tier: z.enum(['curioso', 'potencial', 'premium']).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
})

const TIER_COLOR: Record<string, string> = {
  premium: '#16a34a',
  potencial: '#1A6BFF',
  curioso: '#d97706',
}

const TIER_LABEL: Record<string, string> = {
  premium: '⭐ Premium',
  potencial: '🔵 Potencial',
  curioso: '👀 Curioso',
}

function buildEmailHtml(data: z.infer<typeof schema>): string {
  const tier = data.lead_tier ?? 'curioso'
  const tierColor = TIER_COLOR[tier] ?? '#6b7280'
  const tierLabel = TIER_LABEL[tier] ?? tier
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const whatsappLink = `https://wa.me/55${data.whatsapp.replace(/\D/g, '')}`

  const rows = [
    ['Nome', data.nome],
    ['WhatsApp', `<a href="${whatsappLink}" style="color:#1A6BFF">${data.whatsapp}</a>`],
    ['DDD', data.ddd],
    data.instagram ? ['Instagram', `@${data.instagram}`] : null,
    data.instagram_followers != null ? ['Seguidores', data.instagram_followers.toLocaleString('pt-BR')] : null,
    data.instagram_verified ? ['Verificado', '✅ Sim'] : null,
    data.utm_source ? ['Origem', data.utm_source] : null,
    data.utm_medium ? ['Mídia', data.utm_medium] : null,
    data.utm_campaign ? ['Campanha', data.utm_campaign] : null,
    ['Recebido em', now],
  ]
    .filter(Boolean)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;color:#9ca3af;font-size:13px;white-space:nowrap;border-bottom:1px solid #1f2937">${label}</td>
        <td style="padding:10px 16px;color:#f3f4f6;font-size:13px;border-bottom:1px solid #1f2937">${value}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#FF6B00,#1A6BFF);border-radius:12px 12px 0 0;padding:3px 0"></td></tr>
        <tr><td style="background:#111827;border-radius:0;padding:28px 32px 20px">
          <p style="margin:0 0 4px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:2px;font-weight:700">LOAD+</p>
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#f9fafb">Novo lead recebido 🚀</h1>
        </td></tr>

        <!-- Tier badge -->
        <tr><td style="background:#111827;padding:0 32px 20px">
          <span style="display:inline-block;background:${tierColor}22;border:1px solid ${tierColor}66;color:${tierColor};font-size:12px;font-weight:700;padding:4px 14px;border-radius:999px">${tierLabel}</span>
          ${data.lead_score != null ? `<span style="margin-left:8px;color:#6b7280;font-size:12px">Score: <b style="color:#f3f4f6">${data.lead_score}</b></span>` : ''}
        </td></tr>

        <!-- Tabela de dados -->
        <tr><td style="background:#111827;padding:0 32px 24px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1f2937;border-radius:10px;overflow:hidden">
            ${rows}
          </table>
        </td></tr>

        <!-- CTA WhatsApp -->
        <tr><td style="background:#111827;padding:0 32px 32px;border-radius:0 0 12px 12px">
          <a href="${whatsappLink}" style="display:block;text-align:center;background:#16a34a;color:#fff;font-weight:700;font-size:14px;padding:14px;border-radius:10px;text-decoration:none">
            💬 Abrir conversa no WhatsApp
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 0 0;text-align:center">
          <p style="margin:0;color:#374151;font-size:11px">LOAD+ · Notificação automática de lead</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const { error } = await supabase.from('leads').insert([data])

    if (error) {
      return NextResponse.json({ error: 'Erro ao salvar lead.' }, { status: 500 })
    }

    // Dispara e-mail de notificação (não bloqueia resposta se falhar)
    const notifyEmail = process.env.NOTIFY_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY
    if (notifyEmail && resendApiKey) {
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
        to: notifyEmail,
        subject: `🚀 Novo lead: ${data.nome} (${data.ddd}) — LOAD+`,
        html: buildEmailHtml(data),
      }).catch(() => {}) // silencia erro pra não afetar o fluxo do usuário
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }
}
