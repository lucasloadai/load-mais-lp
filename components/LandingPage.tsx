'use client'

import { useSearchParams } from 'next/navigation'
import { InstagramModal } from './InstagramModal'
import { useLeadForm } from '@/hooks/useLeadForm'
import { trackEvent } from '@/utils/tracking'
import { useEffect, useRef, useState } from 'react'
import { EntryModal } from './EntryModal'
import { AgendarModal } from './AgendarModal'
import { CountUp } from './CountUp'

const heroPhrases = ['da sua presença.', 'exclusivamente de você.', 'de improviso.']

const stats = [
  { value: '+60', label: 'Negócios gerenciados' },
  { value: '4', label: 'Etapas de estruturação validada' },
  { value: '48h', label: 'Implementação inicial em até' },
  { value: 'BR', label: 'Atuação' },
]

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Dependência do dono',
    desc: 'Se você precisa estar presente para o faturamento acontecer, sua empresa ainda não tem um sistema comercial.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'Receita imprevisível',
    desc: 'Sem processo, cada mês vira uma aposta — não uma estratégia.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Crescimento sem margem',
    desc: 'Faturar mais sem estrutura só aumenta o esforço — não o lucro.',
  },
]

const deliverables = [
  'Arquitetura do funil de aquisição e vendas.',
  'Processo comercial replicável.',
  'Integração entre marketing e dados.',
  'Indicadores de performance e tomada de decisão.',
  'Implementação prática junto ao seu time.',
]

const deliverableSteps = [
  {
    title: 'Diagnóstico',
    desc: 'Analisamos processos, posicionamento e dados reais do negócio.',
  },
  {
    title: 'Estruturação',
    desc: 'Desenvolvemos o sistema comercial, estratégia e os indicadores.',
  },
  {
    title: 'Implementação',
    desc: 'Executamos junto ao time. O comercial funciona — e/o cliente vem.',
  },
  {
    title: 'Otimização',
    desc: 'Revisamos métricas e ajustamos para confirmar e negociar resultados.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Mapeamos gargalos que travam sua geração de receita.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Estruturação',
    desc: 'Desenhamos seu sistema comercial e funil de crescimento.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Implementação',
    desc: 'Executamos junto com seu time — sem teoria.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Otimização',
    desc: 'Ajustamos continuamente com base em dados reais.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
]


const plans = [
  {
    id: 'A1',
    name: 'Start',
    desc: 'Para quem ainda não tem processo comercial formalizado.',
    features: [
      'Diagnóstico comercial',
      'Captação de leads estruturada',
      'Posicionamento e análise',
      'Funil de vendas básico',
      'Acompanhamento semanal',
      'Relatórios mensais',
    ],
    bonus: 'Bônus+ Start',
    popular: false,
    highlight: false,
  },
  {
    id: 'A2',
    name: 'Scale',
    desc: 'Para empresas que precisam de previsibilidade e processo estruturado.',
    features: [
      'Tudo do Start',
      'Funil de vendas completo',
      'Gestão de clientes e leads',
      'Marketing com ROI rastreável',
    ],
    bonus: 'Bônus+ Scale',
    popular: true,
    highlight: false,
  },
  {
    id: 'A3',
    name: 'Performance',
    desc: 'Para escalar receita com margem e time autônomo.',
    features: [
      'Tudo do Scale',
      'Acompanhamento do fluxo comercial',
      'Estratégia de expansão da captação',
      'Engenharia de multicanais',
      'Revisão geral 90 dias',
    ],
    bonus: 'Bônus+ Performance',
    popular: false,
    highlight: true,
  },
  {
    id: 'A4',
    name: 'Engine',
    desc: 'Parceria estratégica de longo prazo para máxima escala.',
    features: [
      'Tudo do Performance',
      'Verificação das contas',
      'Acesso direto ao time sênior',
      'Prioridade no suporte',
      'Revisão geral 60 dias',
    ],
    bonus: 'Bônus+ Engine',
    popular: false,
    highlight: false,
  },
]

const qualFor = [
  'Empresas entre R$40k e R$400k/mês',
  'Produto ou serviço validado no mercado',
  'Dono que quer escalar sem depender de si mesmo',
  'Negócio que cresce mas perde previsibilidade',
  'Quem quer implementar, não só planejar',
]

const qualAgainst = [
  'Negócios com margem abaixo de 20%',
  'Quem quer só posts, reels e campanhas avulsas',
  'Empresas sem disposição para executar e mudar',
  'Quem busca resultado sem processo, dados ou estratégia',
]

const marqueeText = 'a sua última assessoria de marketing de performance'

export function LandingPage() {
  const searchParams = useSearchParams()
  const utmSource = searchParams.get('utm_source') ?? undefined
  const utmMedium = searchParams.get('utm_medium') ?? undefined
  const utmCampaign = searchParams.get('utm_campaign') ?? undefined
  const formRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [showEntryModal, setShowEntryModal] = useState(false)
  const [showAgendarModal, setShowAgendarModal] = useState(false)
  const [leadName, setLeadName] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem('loadmais_nome') ?? ''
  })
  const [instagramProfile, setInstagramProfile] = useState<{
    username: string
    biography: string
    followers_count: number
    category: string | null
    posts: { caption: string; likes: number; comments: number }[]
  } | null>(null)
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null)
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null)

  const firstName = leadName ? leadName.split(' ')[0] : ''

  // Gerar copy personalizada via Claude quando perfil é confirmado
  useEffect(() => {
    if (!instagramProfile || !firstName) return
    fetch('/api/generate-copy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        username: instagramProfile.username,
        followers_count: instagramProfile.followers_count,
        biography: instagramProfile.biography,
        category: instagramProfile.category,
        posts: instagramProfile.posts,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.copy) setGeneratedCopy(data.copy)
        if (data.recommendedPlan) setRecommendedPlan(data.recommendedPlan)
      })
      .catch(() => {})
  }, [instagramProfile, firstName])

  // Phrase cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % heroPhrases.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Entry modal after 2s (só se ainda não tem nome salvo)
  useEffect(() => {
    if (leadName) return
    const t = setTimeout(() => setShowEntryModal(true), 2000)
    return () => clearTimeout(t)
  }, [leadName])

  const {
    form,
    dddMessage,
    dddEmoji,
    showInstagramModal,
    setShowInstagramModal,
    formData,
    handlePhoneChange,
    onSubmit: originalOnSubmit,
    extractCleanPhone,
  } = useLeadForm()

  // Intercepta submit para capturar nome, persistir e fechar modal
  const onSubmit = (e: React.FormEvent) => {
    const nome = form.getValues('nome')
    if (nome?.length >= 2) {
      const trimmed = nome.trim()
      setLeadName(trimmed)
      localStorage.setItem('loadmais_nome', trimmed)
      setShowEntryModal(false)
    }
    originalOnSubmit(e)
  }

  useEffect(() => {
    trackEvent('LeadStart')
  }, [])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    els.forEach((el) => {
      el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`
      el.classList.add('reveal-ready')
    })
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }


  return (
    <main className="min-h-screen bg-[#080E18] text-white font-sans antialiased overflow-x-hidden">

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-[100] bg-[rgba(8,14,24,0.88)] backdrop-blur-[16px] border-b border-white/[0.07]">
        <div className="flex items-center justify-between py-3 sm:py-4 px-5 sm:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-[1.15rem] font-extrabold tracking-[-0.5px]">
              LOAD<span className="text-[#1A6BFF]">+</span>
            </div>
            {firstName && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/[0.05] border border-white/[0.08] px-3 py-1 rounded-full">
                Olá, <span className="text-[#FF6B00] font-semibold">{firstName}</span> 👋
              </span>
            )}
          </div>
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-[0_4px_14px_rgba(26,107,255,0.35)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Quero construir
          </button>
        </div>
      </nav>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-[#080E18] overflow-hidden py-3">
        <div className="flex w-max animate-marquee gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap px-5 py-2 rounded-full border border-[#FF6B00]/60 bg-[#FF6B00]/[0.14] text-[0.78rem] text-[#FF6B00] font-semibold shadow-[0_0_12px_rgba(255,107,0,0.15)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              ... {marqueeText} ...
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-5 pt-20 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1A6BFF]/[0.09] rounded-full blur-[120px]" />
        </div>


        <div className="relative z-10 max-w-4xl mb-7">
          <h1 className="text-5xl md:text-[clamp(1.8rem,5.5vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-1.8px] mb-6">
            Construa um sistema previsível de geração de receita —{' '}
            <br className="hidden md:block" />
            {firstName && (
              <span
                className="text-[#FF6B00] transition-all duration-500"
                style={{ opacity: firstName ? 1 : 0 }}
              >
                {firstName},{' '}
              </span>
            )}
            sem depender{' '}
            <br />
            <span
              className="text-[#1A6BFF] inline-block transition-all duration-300 ease-in-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {heroPhrases[phraseIdx]}
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            A LOAD+ soma inteligência no seu marketing, vendas e processos gerando previsibilidade e resultado real na prática.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3 mb-16 justify-center">
          <button
            onClick={scrollToForm}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(26,107,255,0.35)] hover:shadow-[0_6px_24px_rgba(26,107,255,0.45)] hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            {firstName ? `${firstName}, vamos construir` : 'Quero construir'}
          </button>
          <button
            onClick={scrollToPlans}
            className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/[0.12] hover:border-white/25 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
          >
            Ver propostas
          </button>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex items-center divide-x divide-white/[0.08] border border-white/[0.08] rounded-2xl bg-white/[0.03] overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 px-8 py-5">
              <span className="text-2xl md:text-3xl font-extrabold text-[#1A6BFF]">
                <CountUp value={s.value} />
              </span>
              <span className="text-[0.7rem] text-white/40 text-center leading-tight max-w-[80px]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEMA ────────────────────────────────────────── */}
      <section className="px-5 py-24 max-w-6xl mx-auto">
        <div data-reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
            <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
            Por que sua empresa trava
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Se seu crescimento não é previsível,
            <br />ele não é <span className="text-[#1A6BFF]">escalável.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {problems.map((p, idx) => (
            <div
              key={p.title}
              data-reveal
              data-delay={idx * 120}
              className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/[0.03] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,107,0,0.12)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A6BFF]/10 border border-[#1A6BFF]/25 flex items-center justify-center text-[#1A6BFF] mb-5 group-hover:bg-[#FF6B00]/15 group-hover:border-[#FF6B00]/35 group-hover:text-[#FF6B00] group-hover:shadow-[0_0_16px_rgba(255,107,0,0.2)] transition-all duration-300">
                {p.icon}
              </div>
              <h3 className="text-base font-bold mb-2.5 group-hover:text-[#FF6B00] transition-colors">{p.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUÇÃO ─────────────────────────────────────────── */}
      <section className="px-5 py-24 bg-gradient-to-b from-transparent via-[#0D1830]/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
              <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
              O que entregamos
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-extrabold leading-tight mb-4">
              Não entregamos marketing.
              <br />Estruturamos um <span className="text-[#1A6BFF]">sistema comercial inteligente.</span>
            </h2>
            <p className="text-white/50 leading-relaxed text-sm max-w-lg mx-auto">
              Conectamos aquisição, vendas e dados para gerar crescimento previsível.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Checklist com linha conectora */}
            <ul className="relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-gradient-to-b from-[#1A6BFF]/60 via-[#1A6BFF]/30 to-transparent" />
              {deliverables.map((d, idx) => (
                <li key={d} className="relative flex items-start gap-4 pb-5 last:pb-0">
                  <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.55rem] font-bold flex-shrink-0 mt-[2px] relative z-10 shadow-[0_0_10px_rgba(26,107,255,0.45)] ${
                    idx === 0 ? 'bg-[#1A6BFF] text-white' : 'bg-[#1A6BFF]/80 text-white'
                  }`}>✓</span>
                  <span className="text-sm text-white/65 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>

            {/* Steps com linha conectora */}
            <div className="relative">
              <div className="absolute left-[22px] top-10 bottom-10 w-px bg-gradient-to-b from-[#1A6BFF]/40 via-[#1A6BFF]/20 to-transparent" />
              {deliverableSteps.map((item, i) => (
                <div
                  key={item.title}
                  className="relative flex items-start gap-4 p-5 mb-3 last:mb-0 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:border-[#1A6BFF]/35 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(26,107,255,0.12)] transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1A6BFF] flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0 shadow-[0_0_12px_rgba(26,107,255,0.4)] group-hover:shadow-[0_0_18px_rgba(26,107,255,0.55)] transition-all duration-200 relative z-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-[#1A6BFF] transition-colors">{item.title}</p>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={scrollToForm}
              className="flex items-center gap-2 px-7 py-3.5 bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(26,107,255,0.3)] hover:shadow-[0_6px_24px_rgba(26,107,255,0.45)] hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Quero construir
            </button>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ───────────────────────────────────── */}
      <section className="px-5 py-24 max-w-6xl mx-auto">
        <div data-reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
            <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
            O fluxo básico
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Como estruturamos sua <span className="text-[#1A6BFF]">máquina de crescimento</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.num} data-reveal data-delay={i * 100} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[2.25rem] left-[62%] w-full h-px bg-gradient-to-r from-[#1A6BFF]/35 to-transparent z-10" />
              )}
              <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:border-[#1A6BFF]/40 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(26,107,255,0.15)] transition-all duration-300 h-full group">
                <div className="w-11 h-11 rounded-xl bg-[#1A6BFF]/12 border border-[#1A6BFF]/25 flex items-center justify-center text-[#1A6BFF] mb-5 group-hover:bg-[#1A6BFF]/20 group-hover:shadow-[0_0_16px_rgba(26,107,255,0.3)] transition-all duration-300">
                  {s.icon}
                </div>
                <div className="text-[0.68rem] font-bold text-white/25 uppercase tracking-widest mb-1">{s.num}</div>
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-[#1A6BFF] transition-colors">{s.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ESCADA DE PROPOSTAS ──────────────────────────────── */}
      <section ref={plansRef} className="px-5 py-24 bg-gradient-to-b from-transparent via-[#0D1830]/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
              <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
              Escada de maturidade
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              O nível de estrutura define
              <br />o nível do seu <span className="text-[#1A6BFF]">crescimento.</span>
            </h2>
            <p className="text-white/45 text-sm mt-4 max-w-md mx-auto leading-relaxed">
              Cada proposta representa um nível de maturidade do seu sistema comercial.
            </p>

            {/* Bloco personalizado pós-Instagram */}
            {instagramProfile && firstName && (
              <div className="mt-8 mx-auto max-w-2xl">
                <div className="relative rounded-2xl border border-[#1A6BFF]/30 bg-[#1A6BFF]/[0.06] px-6 py-5 text-left overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#1A6BFF]/10 rounded-full blur-[50px] pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth={1.5} className="w-4 h-4 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[1.5px] text-[#1A6BFF]/80">
                        Análise do seu perfil
                      </span>
                    </div>
                    <span className="text-[0.65rem] text-white/30 font-medium">
                      @{instagramProfile.username}
                      {instagramProfile.followers_count > 0 && (
                        <> · {instagramProfile.followers_count >= 1000
                          ? `${(instagramProfile.followers_count / 1000).toFixed(1).replace('.0', '')}k`
                          : instagramProfile.followers_count} seguidores</>
                      )}
                    </span>
                  </div>

                  {/* Copy gerada por IA ou fallback */}
                  <p className="text-white/80 text-sm leading-relaxed relative z-10">
                    {generatedCopy ? (
                      <>
                        <span className="text-[#FF6B00] font-bold">{firstName}</span>, {generatedCopy}{' '}
                        <span className="text-white/50">A proposta ideal para o seu momento está logo abaixo.</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#FF6B00] font-bold">{firstName}</span>, analisamos seu perfil
                        {instagramProfile.category && <> em <span className="font-semibold">{instagramProfile.category}</span></>}
                        . Com o que vemos, seu negócio está pronto para estruturar um sistema comercial real.{' '}
                        <span className="text-white/50">A proposta ideal para o seu momento está logo abaixo.</span>
                      </>
                    )}
                  </p>
                  {recommendedPlan && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[0.65rem] text-white/30 uppercase tracking-widest">Proposta recomendada para você</span>
                      <span className="text-[0.65rem] font-extrabold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full px-2.5 py-0.5">
                        {plans.find(p => p.id === recommendedPlan)?.name ?? recommendedPlan}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {plans.map((plan, idx) => {
              const isRecommended = recommendedPlan === plan.id
              const isHighlighted = isRecommended || plan.highlight
              return (
              <div
                key={plan.id}
                data-reveal
                data-delay={idx * 100}
                className={`relative rounded-[18px] p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                  isRecommended
                    ? 'bg-[#0D1A30] border-[1.5px] border-[#FF6B00]/70 shadow-[0_8px_40px_rgba(255,107,0,0.22)] hover:shadow-[0_16px_48px_rgba(255,107,0,0.32)]'
                    : isHighlighted
                    ? 'bg-[#0D1A30] border-[1.5px] border-[#1A6BFF]/60 shadow-[0_8px_40px_rgba(26,107,255,0.22)] hover:shadow-[0_16px_48px_rgba(26,107,255,0.32)]'
                    : 'bg-[#0C1524] border-[1.5px] border-white/[0.08] hover:border-[#FF6B00]/35 hover:shadow-[0_12px_36px_rgba(255,107,0,0.1)]'
                }`}
              >
                {/* Top badges */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isRecommended ? 'bg-[#FF6B00]' : 'bg-[#1A6BFF]'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {isRecommended && (
                    <div className="inline-flex items-center gap-1 border border-[#FF6B00]/60 bg-[#FF6B00]/10 rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold tracking-[1px] uppercase text-[#FF6B00]">
                      ✦ Ideal para você
                    </div>
                  )}
                  {!isRecommended && plan.popular && (
                    <div className="inline-flex items-center gap-1 border border-[#FF6B00]/40 rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold tracking-[1px] uppercase text-[#FF6B00]">
                      ★ Mais popular
                    </div>
                  )}
                  {!isRecommended && plan.highlight && (
                    <div className="inline-flex items-center gap-1 border border-[#1A6BFF]/40 bg-[#1A6BFF]/10 rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold tracking-[1px] uppercase text-[#1A6BFF]">
                      ● Recomendado
                    </div>
                  )}
                </div>

                <div className="text-[0.62rem] font-bold tracking-[1.5px] uppercase text-white/35 mb-1">
                  Proposta {plan.id}
                </div>
                <div className="text-xl font-extrabold tracking-tight mb-3">{plan.name}</div>
                <p className="text-[0.82rem] text-white/50 leading-relaxed mb-5 flex-grow">{plan.desc}</p>

                <ul className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[0.78rem] text-white/60 flex gap-2 items-start">
                      <span className="text-[#1A6BFF] font-extrabold text-[0.7rem] shrink-0 mt-[1px]">✓</span>
                      {f}
                    </li>
                  ))}
                  <li className="text-[0.78rem] text-[#FF6B00] font-bold flex gap-2 items-start">
                    <span className="text-[#FF6B00] font-extrabold text-[0.7rem] shrink-0 mt-[1px]">★</span>
                    {plan.bonus}
                  </li>
                </ul>

                <div className="text-[0.62rem] font-semibold text-white/30 uppercase tracking-widest mb-2">
                  Mínimo: {plan.name}
                </div>

                <button
                  onClick={scrollToForm}
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[10px] font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px] mt-auto ${
                    plan.highlight
                      ? 'bg-[#1A6BFF] text-white shadow-[0_4px_14px_rgba(26,107,255,0.4)] hover:shadow-[0_6px_20px_rgba(26,107,255,0.5)]'
                      : 'border border-[#1A6BFF]/30 text-white hover:bg-[#1A6BFF] hover:shadow-[0_6px_20px_rgba(26,107,255,0.3)]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current/70 shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 ml-[1px]">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Começar aqui
                </button>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── QUALIFICAÇÃO ────────────────────────────────────── */}
      <section className="px-5 py-24">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
              <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
              Qualificação
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Trabalhamos com quem
              <br />quer estar <span className="text-[#1A6BFF]">pronto.</span>
            </h2>
            <p className="text-white/40 text-sm mt-4">
              Empresas que crescem com estrutura tomam decisões diferentes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div data-reveal data-delay="0" className="p-7 rounded-2xl border border-green-500/[0.18] bg-green-500/[0.04]">
              <h3 className="font-bold text-green-400 mb-5 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border border-green-500/40 flex items-center justify-center text-xs">✓</span>
                Para quem é
              </h3>
              <ul className="space-y-3">
                {qualFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-green-400 shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal data-delay="150" className="p-7 rounded-2xl border border-red-500/[0.18] bg-red-500/[0.04]">
              <h3 className="font-bold text-red-400 mb-5 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border border-red-500/40 flex items-center justify-center text-xs">✗</span>
                Para quem não é
              </h3>
              <ul className="space-y-3">
                {qualAgainst.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-red-400 shrink-0 mt-0.5 text-xs font-bold">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL / FORM ────────────────────────────────── */}
      <section ref={formRef} className="px-5 py-24">
        <div className="max-w-xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] mb-6 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] shadow-[0_0_14px_rgba(255,107,0,0.15)]">
              <span className="text-[#FF6B00] font-black text-sm leading-none">+</span>
              Próximo passo
            </div>
            <h2 className="text-4xl md:text-[2.6rem] font-extrabold leading-tight mb-5">
              Em{' '}
              <span className="underline decoration-[#FF6B00] decoration-2 underline-offset-4">20 minutos</span>
              , você entende onde está travado e o que precisa para gerar receita com{' '}
              <span className="text-[#1A6BFF]">previsibilidade.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              Diagnóstico estratégico gratuito. Sem compromisso. Você sai
              com clareza sobre a proposta, personalizada para o seu negócio.
            </p>
          </div>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAgendarModal(true)}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 bg-[#FF6B00] hover:bg-[#e05e00] text-white shadow-[0_0_0_0_rgba(255,107,0,0.4)] hover:shadow-[0_0_32px_rgba(255,107,0,0.5)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-2xl border-2 border-[#FF6B00]/60 animate-ping opacity-30 pointer-events-none" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {firstName ? `${firstName}, agende comigo aqui` : 'Agende comigo aqui'}
            </button>

            <button
              onClick={scrollToPlans}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base border border-white/[0.12] hover:border-white/25 text-white/70 hover:text-white transition-all duration-200 hover:bg-white/[0.04]"
            >
              Ver propostas
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="px-5 py-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm font-extrabold tracking-tight">
            LOAD<span className="text-[#1A6BFF]">+</span>
          </div>
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Load Mais. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Entry Modal — aparece após 2s */}
      {showEntryModal && !formData && (
        <EntryModal
          form={form}
          dddMessage={dddMessage}
          dddEmoji={dddEmoji}
          handlePhoneChange={handlePhoneChange}
          onSubmit={onSubmit}
          onClose={() => setShowEntryModal(false)}
        />
      )}

      {/* Agendar Modal */}
      {showAgendarModal && (
        <AgendarModal
          leadName={leadName}
          onClose={() => setShowAgendarModal(false)}
        />
      )}

      {/* Instagram Modal */}
      {showInstagramModal && formData && (
        <InstagramModal
          formData={formData}
          utmSource={utmSource}
          utmMedium={utmMedium}
          utmCampaign={utmCampaign}
          onClose={() => setShowInstagramModal(false)}
          onProfileConfirmed={(profile) => setInstagramProfile(profile)}
          extractCleanPhone={extractCleanPhone}
        />
      )}
    </main>
  )
}
