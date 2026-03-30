'use client'

import { useState } from 'react'
import { useInstagram } from '@/hooks/useInstagram'
import { formatCount } from '@/lib/instagramCheck'
import { trackEvent } from '@/utils/tracking'
import type { LeadFormData } from '@/hooks/useLeadForm'
import { LoadingPhrases } from './LoadingPhrases'

type InstagramPost = {
  caption: string
  likes: number
  comments: number
}

type InstagramProfileSnapshot = {
  username: string
  biography: string
  followers_count: number
  category: string | null
  posts: InstagramPost[]
}

type Props = {
  formData: LeadFormData
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  onClose: () => void
  onProfileConfirmed?: (profile: InstagramProfileSnapshot) => void
  extractCleanPhone: (phone: string) => string
}

const dddMap: Record<string, { emoji: string; frase: string }> = {
  '11': { emoji: '☕', frase: 'SP move o Brasil — sua empresa pode mover o mercado.' },
  '12': { emoji: '☕', frase: 'Do Vale do Paraíba para o topo do mercado.' },
  '13': { emoji: '⚓', frase: 'Baixada Santista. Grandes negócios nascem no litoral.' },
  '14': { emoji: '🌾', frase: 'Interior paulista. Potência do agro e da estratégia.' },
  '15': { emoji: '☕', frase: 'Interior forte. Negócios mais fortes ainda.' },
  '16': { emoji: '🍊', frase: 'Terra do agro e da inovação — hora de estruturar.' },
  '17': { emoji: '🌾', frase: 'Noroeste paulista. Potencial que só cresce.' },
  '18': { emoji: '🌿', frase: 'Oeste paulista com visão de futuro.' },
  '19': { emoji: '🏭', frase: 'Campinas — polo de inovação do Brasil. Bora?' },
  '21': { emoji: '🏖️', frase: 'Rio move a cultura. Sua empresa pode mover o mercado.' },
  '22': { emoji: '🌊', frase: 'Norte fluminense. Grande potencial, hora de estruturar.' },
  '24': { emoji: '⛰️', frase: 'Serra fluminense. Altitude de visão, estratégia no negócio.' },
  '27': { emoji: '⚓', frase: 'ES move o mar. Sua empresa pode mover o mercado.' },
  '28': { emoji: '🌊', frase: 'Sul capixaba. Potencial que ainda vai ser muito visto.' },
  '31': { emoji: '⛏️', frase: 'Minas move o Brasil. Hora de mover o seu mercado.' },
  '32': { emoji: '🧀', frase: 'Zona da Mata. Tradição que se transforma em resultado.' },
  '33': { emoji: '🌿', frase: 'Norte de Minas. Força e determinação no DNA.' },
  '34': { emoji: '🌾', frase: 'Triângulo Mineiro. Agro e negócio lado a lado.' },
  '35': { emoji: '☕', frase: 'Sul de Minas. Terra do café e das grandes decisões.' },
  '37': { emoji: '⛏️', frase: 'Centro-Oeste mineiro. Raiz que vira resultado.' },
  '38': { emoji: '🌿', frase: 'Norte de Minas. Sua empresa tem o mesmo potencial.' },
  '41': { emoji: '🌲', frase: 'Curitiba lidera em inovação. Seu negócio pode liderar o mercado.' },
  '42': { emoji: '🌲', frase: 'Campos Gerais. Terra fértil para negócios estruturados.' },
  '43': { emoji: '🌾', frase: 'Norte do Paraná. Potência do agro e muito mais.' },
  '44': { emoji: '🌻', frase: 'Noroeste paranaense. Crescimento no DNA.' },
  '45': { emoji: '🌊', frase: 'Oeste do Paraná. Iguaçu inspira, estratégia no negócio.' },
  '46': { emoji: '🌲', frase: 'Sudoeste paranaense. Força que poucos conhecem.' },
  '47': { emoji: '🏄', frase: 'Norte catarinense. Inovação que veio pra ficar.' },
  '48': { emoji: '🦞', frase: 'Floripa move o tech. Sua empresa pode mover o mercado.' },
  '49': { emoji: '🌲', frase: 'Oeste catarinense. Agroindústria e crescimento lado a lado.' },
  '51': { emoji: '🧉', frase: 'Porto Alegre. Chimarrão quente, negócios mais quentes ainda.' },
  '53': { emoji: '🧉', frase: 'Pelotas. Tradição e potencial que poucos exploram.' },
  '54': { emoji: '🍇', frase: 'Serra gaúcha. Da uva para o topo do mercado.' },
  '55': { emoji: '🌾', frase: 'Noroeste gaúcho. Terra forte, negócio mais forte.' },
  '61': { emoji: '🏛️', frase: 'Brasília move o Brasil. Sua empresa pode mover o mercado.' },
  '62': { emoji: '🌾', frase: 'Goiânia cresce rápido. Sua empresa também pode.' },
  '63': { emoji: '🌿', frase: 'Tocantins tem potencial inexplorado. Hora de estruturar.' },
  '64': { emoji: '🤠', frase: 'Sul goiano. Agro forte, empresa mais forte.' },
  '65': { emoji: '🐂', frase: 'MT é o celeiro do mundo. Seu negócio pode liderar.' },
  '66': { emoji: '🌾', frase: 'Sul mato-grossense. Agro de elite, empresa de elite.' },
  '67': { emoji: '🐊', frase: 'Pantanal e negócio. Natureza rica, empresa estruturada.' },
  '68': { emoji: '🌿', frase: 'Acre existe e cresce. Seu negócio pode crescer junto.' },
  '69': { emoji: '🌿', frase: 'Rondônia em expansão. Seu negócio pode liderar essa onda.' },
  '71': { emoji: '🥁', frase: 'Salvador pulsa. Seu negócio pode pulsar junto com o mercado.' },
  '73': { emoji: '☀️', frase: 'Sul da Bahia. Sol e oportunidades que não param.' },
  '74': { emoji: '🌵', frase: 'Sertão baiano. Resiliência que vira resultado.' },
  '75': { emoji: '🥁', frase: 'Feira de Santana. Maior do interior, maior no mercado.' },
  '77': { emoji: '🌵', frase: 'Extremo Sul baiano. Potencial que o Brasil vai conhecer.' },
  '79': { emoji: '🦞', frase: 'Menor estado, maior potencial por metro quadrado.' },
  '81': { emoji: '🎭', frase: 'Recife pulsa inovação. Seu negócio pode liderar.' },
  '82': { emoji: '🏖️', frase: 'Maceió. Das melhores praias para os melhores resultados.' },
  '83': { emoji: '☀️', frase: 'Paraíba. Sol forte, negócios mais fortes ainda.' },
  '84': { emoji: '🪂', frase: 'RN. Vento a favor — hora de voar no mercado.' },
  '85': { emoji: '🏄', frase: 'Fortaleza cresce sem parar. Sua empresa pode crescer junto.' },
  '86': { emoji: '🌵', frase: 'Teresina. Calor que aquece negócios e resultados.' },
  '87': { emoji: '🌵', frase: 'Sertão pernambucano. Força que o Brasil respeita.' },
  '88': { emoji: '☀️', frase: 'Interior do Ceará. Potencial que o Brasil ainda vai descobrir.' },
  '89': { emoji: '🌵', frase: 'Sul do Piauí. Potencial que poucos enxergam — você enxerga.' },
  '91': { emoji: '🌊', frase: 'Belém. Do Círio pro mercado — fé e estratégia.' },
  '92': { emoji: '🌿', frase: 'Manaus. Da maior floresta para o maior mercado.' },
  '93': { emoji: '🌿', frase: 'Santarém. Entre rios e oportunidades.' },
  '94': { emoji: '🌿', frase: 'Sul do Pará. Fronteira que vira oportunidade.' },
  '95': { emoji: '🌿', frase: 'Roraima. Na fronteira do Brasil e das oportunidades.' },
  '96': { emoji: '🌊', frase: 'Macapá. Do equador para o topo do mercado.' },
  '97': { emoji: '🌿', frase: 'Interior do AM. Onde a natureza inspira grandes negócios.' },
  '98': { emoji: '🏖️', frase: 'São Luís. Dos Lençóis Maranhenses para grandes resultados.' },
  '99': { emoji: '🌿', frase: 'Interior do Maranhão. Potencial que só espera estrutura.' },
}

export function InstagramModal({
  formData,
  utmSource,
  utmMedium,
  utmCampaign,
  onClose,
  onProfileConfirmed,
  extractCleanPhone,
}: Props) {
  const [instagram, setInstagram] = useState('')
  const [saving, setSaving] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [recentPosts, setRecentPosts] = useState<InstagramPost[]>([])
  const { loading, error, profile, verify, reset } = useInstagram()

  const cleanPhone = extractCleanPhone(formData.whatsapp)
  const ddd = cleanPhone.slice(0, 2)
  const dddState = dddMap[ddd] ?? null

  async function handleVerify() {
    if (!instagram.trim()) return
    setAvatarError(false)
    // Busca perfil e posts em paralelo
    const [, postsRes] = await Promise.all([
      verify(instagram),
      fetch('/api/instagram/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: instagram.trim() }),
      }).then((r) => r.json()).catch(() => ({ posts: [] })),
    ])
    if (postsRes?.posts?.length) setRecentPosts(postsRes.posts)
  }

  async function handleConfirm() {
    if (!profile) return
    setSaving(true)

    try {
      await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          whatsapp: cleanPhone,
          ddd,
          instagram: profile.username,
          instagram_followers: profile.followers_count,
          instagram_verified: profile.is_verified,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
        }),
      })
      localStorage.setItem('loadmais_whatsapp', cleanPhone)
    } catch {
      // Non-blocking
    }

    trackEvent('LeadCaptured', { ddd })
    onProfileConfirmed?.({
      username: profile.username,
      biography: profile.biography,
      followers_count: profile.followers_count,
      following_count: profile.following_count ?? 0,
      media_count: profile.media_count ?? 0,
      category: profile.category,
      posts: recentPosts,
      profile_pic_url: profile.profile_pic_url ?? null,
    })
    onClose()
  }

  const firstName = formData.nome.split(' ')[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#0C1524] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition"
          aria-label="Fechar"
        >
          ✕
        </button>

        {!profile ? (
          /* ── Passo 1: input do @ ── */
          <div className="text-center">
            {/* Loading state: frases desafiadoras */}
            {loading && (
              <LoadingPhrases
                dddPhrase={dddState?.frase}
                dddEmoji={dddState?.emoji}
              />
            )}

            {/* Conteúdo normal (oculto durante loading) */}
            <div style={{ display: loading ? 'none' : 'block' }}>
            {/* Ícone Instagram */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] flex items-center justify-center shadow-[0_0_28px_rgba(193,53,132,0.45)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </div>

            {/* Heading */}
            <h3 className="text-xl font-extrabold mb-1">
              <span className="text-[#FF6B00]">{firstName.toUpperCase()}</span>, Quase lá!
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
              Insira aqui o seu Insta e confira uma experiência 100% pensada para você e seu negócio.
            </p>

            {/* DDD state card com floating emoji */}
            {dddState && (
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 mb-5 text-left">
                <span className="text-2xl animate-float shrink-0">{dddState.emoji}</span>
                <p className="text-[0.8rem] text-white/60 leading-relaxed">{dddState.frase}</p>
              </div>
            )}

            {/* Input */}
            <div className="space-y-3 text-left">
              <div className="space-y-1.5">
                <label className="text-white/70 text-sm font-medium block">Seu @ do Instagram</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">@</span>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value.replace('@', '').trim())}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    placeholder="seuperfil"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C13584] focus:ring-1 focus:ring-[#C13584] transition"
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
              </div>

              <button
                onClick={handleVerify}
                disabled={loading || !instagram.trim()}
                className="w-full bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_6px_20px_rgba(26,107,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Verificando perfil...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    Buscar Perfil
                  </>
                )}
              </button>
            </div>
            </div>{/* fim conteúdo normal */}
          </div>
        ) : (
          /* ── Passo 2: card do perfil ── */
          <>
            <h3 className="text-lg font-bold text-white mb-5">
              Perfil encontrado — é você?
            </h3>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative flex-shrink-0">
                {!avatarError && profile.profile_pic_url ? (
                  <img
                    src={profile.profile_pic_url}
                    alt={profile.username}
                    onError={() => setAvatarError(true)}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#C13584]/40"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833AB4] to-[#E1306C] flex items-center justify-center text-2xl font-black text-white">
                    {profile.username[0].toUpperCase()}
                  </div>
                )}
                {profile.is_verified && (
                  <span className="absolute -bottom-1 -right-1 text-base">✅</span>
                )}
              </div>

              <div className="min-w-0">
                {profile.full_name && (
                  <p className="text-white font-semibold truncate">{profile.full_name}</p>
                )}
                <p className="text-white/50 text-sm">@{profile.username}</p>
                {profile.category && (
                  <p className="text-[#C13584] text-xs mt-0.5">{profile.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Seguidores', value: profile.followers_count },
                { label: 'Seguindo', value: profile.following_count },
                { label: 'Posts', value: profile.media_count },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl py-3 text-center">
                  <p className="text-white font-bold text-lg leading-none">
                    {value > 0 ? formatCount(value) : '—'}
                  </p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            {profile.biography && (
              <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                {profile.biography}
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Salvando...
                  </>
                ) : (
                  'Sim, é esse! Continuar →'
                )}
              </button>

              <button
                onClick={() => { reset(); setInstagram(''); setAvatarError(false) }}
                className="w-full text-white/40 text-sm py-2 hover:text-white/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Não é esse, quero tentar outro @
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
