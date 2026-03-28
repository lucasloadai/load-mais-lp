'use client'

import { useEffect, useState } from 'react'
import { FormLead } from './FormLead'
import type { UseFormReturn } from 'react-hook-form'
import type { LeadFormData } from '@/hooks/useLeadForm'

type Props = {
  form: UseFormReturn<LeadFormData>
  dddMessage: string
  dddEmoji?: string
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

function getGreeting(): { text: string; emoji: string } {
  const h = new Date().getHours()
  const m = new Date().getMinutes()
  const total = h * 60 + m
  if (total >= 300 && total <= 720) return { text: 'bom dia', emoji: '☀️' }
  if (total >= 721 && total <= 1110) return { text: 'boa tarde', emoji: '🌤️' }
  if (total >= 1111 && total <= 1440) return { text: 'boa noite', emoji: '🌙' }
  return { text: 'boa madrugada', emoji: '🌙' }
}

function getDevice(): { label: string; icon: JSX.Element } {
  const ua = navigator.userAgent
  const w = window.innerWidth
  const isTablet = /iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua)) || (w >= 768 && w < 1024)
  const isMobile = !isTablet && (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || w < 768)

  if (isMobile) return {
    label: /iPhone|iPad/i.test(ua) ? 'iPhone' : 'Android',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  }
  if (isTablet) return {
    label: /iPad/i.test(ua) ? 'iPad' : 'tablet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  }
  return {
    label: 'computador',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  }
}

type Period = 'manha' | 'tarde' | 'noite' | 'madrugada'
type DayType = 'semana' | 'sabado' | 'domingo'

function getContextMessage(device: string): string {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const total = h * 60 + m
  const dow = now.getDay() // 0=dom, 6=sab

  const period: Period =
    total >= 300 && total <= 720 ? 'manha' :
    total >= 721 && total <= 1110 ? 'tarde' :
    total >= 1111 ? 'noite' : 'madrugada'

  const dayType: DayType =
    dow === 6 ? 'sabado' :
    dow === 0 ? 'domingo' : 'semana'

  const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
  const dia = dias[dow]
  const diaNum = now.getDate()

  const msgs: Record<DayType, Record<Period, string>> = {
    semana: {
      manha:     `Vi que você tá aí no ${device}, dia ${diaNum}, logo cedo numa ${dia} — quem começa o dia pensando em estrutura já saiu na frente. Bora?`,
      tarde:     `Vi que você tá aí no ${device}, dia ${diaNum}, no meio de uma ${dia} de tarde — parando tudo pra pensar no que realmente importa. Bora?`,
      noite:     `Vi que você tá aí no ${device}, dia ${diaNum}, numa ${dia} à noite — quando o dia esfria, os melhores movimentos acontecem. Bora?`,
      madrugada: `Vi que você tá aí no ${device}, dia ${diaNum}, de madrugada numa ${dia} — quando o mundo dorme, você constrói. Bora?`,
    },
    sabado: {
      manha:     `Vi que você tá aí no ${device}, dia ${diaNum}, num sábado de manhã — já dando o passo que a maioria adia pro "depois". Bora?`,
      tarde:     `Vi que você tá aí no ${device}, dia ${diaNum}, num sábado à tarde — usando o fim de semana pra avançar. Isso diz muito. Bora?`,
      noite:     `Vi que você tá aí no ${device}, dia ${diaNum}, num sábado à noite — enquanto outros descansam, você movimenta. Bora?`,
      madrugada: `Vi que você tá aí no ${device}, dia ${diaNum}, de madrugada num sábado — poucos chegam até aqui nesse horário. Bora?`,
    },
    domingo: {
      manha:     `Vi que você tá aí no ${device}, dia ${diaNum}, num domingo de manhã — já planejando a semana com estratégia. Bora?`,
      tarde:     `Vi que você tá aí no ${device}, dia ${diaNum}, num domingo à tarde — preparando o terreno antes de a semana começar. Bora?`,
      noite:     `Vi que você tá aí no ${device}, dia ${diaNum}, num domingo à noite — quem planeja domingo, domina segunda. Bora?`,
      madrugada: `Vi que você tá aí no ${device}, dia ${diaNum}, de madrugada num domingo — comprometimento no nível máximo. Bora?`,
    },
  }

  return msgs[dayType][period]
}

export function EntryModal({ form, dddMessage, dddEmoji, handlePhoneChange, onSubmit, onClose }: Props) {
  const greeting = getGreeting()
  const [device, setDevice] = useState<{ label: string; icon: JSX.Element } | null>(null)

  useEffect(() => {
    setDevice(getDevice())
  }, [])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Overlay bloqueante */}
      <div className="absolute inset-0 bg-[#080E18]/85 backdrop-blur-md" />

      <div className="relative z-10 w-full max-w-md">
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FF6B00]/[0.07] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative bg-[#0C1524] border border-[#FF6B00]/25 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,107,0,0.1)] overflow-hidden">
          {/* Barra topo */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#1A6BFF]" />

          <div className="px-7 pt-7 pb-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] px-3 py-1 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] mb-5">
              <span className="font-black text-sm leading-none">+</span>
              Acesso exclusivo
            </div>

            {/* Saudação */}
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight mb-1">
              Opaa,{' '}
              <span className="text-[#FF6B00]">{greeting.text}!</span>{' '}
              <span>{greeting.emoji}</span>
            </h2>

            {/* Contexto de dispositivo + dia/hora */}
            {device && (
              <div className="flex items-start gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 mb-5">
                <span className="text-[#FF6B00] mt-0.5 shrink-0">{device.icon}</span>
                <p className="text-[0.8rem] text-white/55 leading-relaxed">
                  {getContextMessage(device.label)}
                </p>
              </div>
            )}

            {/* Destaque */}
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Robô */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-[#1A6BFF]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M6.75 8.25h10.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25v-6a2.25 2.25 0 0 1 2.25-2.25Zm3 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {/* Foguete */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FF6B00]">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <p className="text-[0.82rem] text-white/80 leading-relaxed font-medium">
                Agora só falta você se apresentar — quero te mostrar muito mais dessa mágica! ✨
              </p>
            </div>

            <FormLead
              form={form}
              dddMessage={dddMessage}
              dddEmoji={dddEmoji}
              handlePhoneChange={handlePhoneChange}
              onSubmit={onSubmit}
            />
          </div>

          <div className="px-7 pb-5 text-center">
            <p className="text-white/20 text-xs">🔒 Dados protegidos. Sem spam.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
