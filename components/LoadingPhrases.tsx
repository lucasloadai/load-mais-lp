'use client'

import { useEffect, useState } from 'react'

const GENERIC_PHRASES = [
  'Com a IA, o jogo muda todo mês. Não fique pra trás — esteja com os melhores.',
  'Se você não inova, seu concorrente está um passo à frente. Isso é fato.',
  'Se você procura marketeiros, pode sair da página — isso nem é copy.',
  'Mercados não esperam. Estrutura é o que separa quem cresce de quem sobrevive.',
  'O sistema certo não é custo. É o maior ativo do seu negócio.',
  'Não é sobre postar mais. É sobre converter melhor.',
]

type Props = {
  dddPhrase?: string
  dddEmoji?: string
}

export function LoadingPhrases({ dddPhrase, dddEmoji }: Props) {
  const [phase, setPhase] = useState<'rocket' | 'phrases'>('rocket')
  const [progress, setProgress] = useState(0)
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  const phrases = [
    ...(dddPhrase ? [{ text: dddPhrase, emoji: dddEmoji }] : []),
    ...GENERIC_PHRASES.map((t) => ({ text: t, emoji: undefined })),
  ]

  // Anima barra de progresso
  useEffect(() => {
    if (phase !== 'rocket') return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [phase])

  // Quando barra completa, passa para frases
  useEffect(() => {
    if (phase === 'rocket' && progress >= 100) {
      const t = setTimeout(() => setPhase('phrases'), 350)
      return () => clearTimeout(t)
    }
  }, [phase, progress])

  // Ciclo de frases com fade
  useEffect(() => {
    if (phase !== 'phrases' || phrases.length === 0) return
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length)
        setVisible(true)
      }, 300)
    }, 2600)
    return () => clearTimeout(t)
  }, [phase, phraseIdx, phrases.length])

  return (
    <div className="flex flex-col items-center justify-center py-8 min-h-[160px]">
      {phase === 'rocket' ? (
        <div className="w-full max-w-[260px]">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[#1A6BFF] font-extrabold text-base tracking-[4px]">LOAD</span>
            <span className="text-[#FF6B00] font-extrabold text-base animate-pulse">...</span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-visible">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1A6BFF] to-[#FF6B00] rounded-full"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 text-sm leading-none select-none"
              style={{ left: `calc(${Math.min(progress, 94)}% - 6px)` }}
            >
              🚀
            </span>
          </div>
          <p className="text-white/30 text-xs mt-4 text-center">Preparando sua análise...</p>
        </div>
      ) : (
        phrases[phraseIdx] && (
          <div
            className="text-center px-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {phrases[phraseIdx].emoji && (
              <span className="text-2xl block mb-3 animate-float">{phrases[phraseIdx].emoji}</span>
            )}
            <p className="text-white/65 text-sm leading-relaxed font-medium max-w-[260px]">
              {phrases[phraseIdx].text}
            </p>
          </div>
        )
      )}
    </div>
  )
}
