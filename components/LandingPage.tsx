'use client'

import { useSearchParams } from 'next/navigation'
import { FormLead } from './FormLead'
import { InstagramModal } from './InstagramModal'
import { useLeadForm } from '@/hooks/useLeadForm'
import { trackEvent } from '@/utils/tracking'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '40k+', label: 'Empresas analisadas' },
  { value: '4x', label: 'Crescimento médio em 90 dias' },
  { value: '48h', label: 'Para sua estratégia pronta' },
  { value: 'BR', label: 'Atuação nacional' },
]

const problems = [
  {
    icon: '⚡',
    title: 'Dependência do dono',
    desc: 'As vendas param quando você para. Nenhum processo roda de forma autônoma sem a sua presença direta.',
  },
  {
    icon: '📉',
    title: 'Receita imprevisível',
    desc: 'Bons e maus meses sem conseguir prever ou controlar. Planejamento baseado em experiência e estratégia.',
  },
  {
    icon: '🔁',
    title: 'Crescimento sem margem',
    desc: 'Fatura mais, sobra menos. O custo escala junto com a receita — e o lucro real não aparece.',
  },
]

const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Mapeamos o seu negócio, histórico e oportunidades reais de crescimento.' },
  { num: '02', title: 'Estruturação', desc: 'Construímos processo comercial, estratégia e os indicadores que precisam ser medidos.' },
  { num: '03', title: 'Implementação', desc: 'Executamos junto ao seu time — do primeiro contato à venda fechada.' },
  { num: '04', title: 'Otimização', desc: 'Monitoramos, ajustamos e escalamos. Crescimento real e sustentável.' },
]

const deliverables = [
  'Diagnóstico completo do seu funil comercial',
  'Processo de vendas documentado e replicável',
  'Estratégia de marketing com ROI rastreável',
  'Painel de indicadores para decisões semanais',
  'Implementação acompanhada junto ao seu time',
]

export function LandingPage() {
  const searchParams = useSearchParams()
  const utmSource = searchParams.get('utm_source') ?? undefined
  const utmMedium = searchParams.get('utm_medium') ?? undefined
  const utmCampaign = searchParams.get('utm_campaign') ?? undefined
  const formRef = useRef<HTMLDivElement>(null)

  const {
    form,
    dddMessage,
    showInstagramModal,
    setShowInstagramModal,
    formData,
    handlePhoneChange,
    onSubmit,
    extractCleanPhone,
  } = useLeadForm()

  useEffect(() => {
    trackEvent('LeadStart')
  }, [])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <main className="min-h-screen bg-[#080F1C] text-white font-sans antialiased overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#1A6BFF]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#FF6B00]/8 rounded-full blur-[100px]" />
        </div>

        {/* Ticker */}
        <div className="relative z-10 flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/60">
          <span className="w-2 h-2 rounded-full bg-[#1A6BFF] animate-pulse" />
          A sua última assessoria de marketing de performance
        </div>

        {/* Headline */}
        <div className="relative z-10 max-w-4xl mb-8">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Marketing e vendas que{' '}
            <br className="hidden md:block" />
            funcionam{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#FF6B00]">
              sem depender exclusivamente de você.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            A Load Mais analisa e estrutura o processo comercial do seu negócio para
            gerar receita previsível, margem real e captação que não para quando você para.
          </p>
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 px-8 py-4 bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#1A6BFF]/25 hover:shadow-[#1A6BFF]/40 hover:-translate-y-0.5"
          >
            <span>🚀</span> Quero saber mais agora
          </button>
          <button className="px-8 py-4 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5">
            Ver propostas
          </button>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-black text-[#1A6BFF]">{s.value}</span>
              <span className="text-xs text-white/50 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEMA ────────────────────────────────────────── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-widest mb-4 block">
            Por que sua empresa trava
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Crescimento sem estrutura
            <br />é acúmulo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF3D00]">caos.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="p-8 rounded-2xl border border-white/8 bg-white/3 hover:border-[#1A6BFF]/30 hover:bg-[#1A6BFF]/5 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#1A6BFF] transition-colors">{p.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUÇÃO ─────────────────────────────────────────── */}
      <section className="px-6 py-24 bg-gradient-to-b from-transparent via-[#0D1830]/60 to-transparent">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-[#1A6BFF] uppercase tracking-widest mb-4 block">
              O que entregamos
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Estrutura comercial.
              <br />Do diagnóstico à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#00C6FF]">
                personalização.
              </span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Não somos agência de posts. Construímos o sistema que faz seu negócio vender com processo e previsibilidade.
            </p>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="w-5 h-5 rounded-full bg-[#1A6BFF]/20 text-[#1A6BFF] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToForm}
              className="mt-10 flex items-center gap-2 px-7 py-3.5 bg-[#1A6BFF] hover:bg-[#1557D4] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#1A6BFF]/20"
            >
              <span>🚀</span> Quero saber mais agora
            </button>
          </div>

          {/* Cards diagnóstico lado direito */}
          <div className="space-y-4">
            {['Diagnóstico', 'Estruturação', 'Implementação', 'Otimização'].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 p-5 rounded-xl border border-white/8 bg-white/3 hover:border-[#1A6BFF]/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1A6BFF]/15 flex items-center justify-center text-[#1A6BFF] font-bold text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <p className="font-semibold text-white">{item}</p>
                  <p className="text-xs text-white/45 mt-0.5">
                    {steps[i].desc.slice(0, 55)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ───────────────────────────────────── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 block">
            O fluxo básico
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#00C6FF]">funciona</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-[#1A6BFF]/40 to-transparent" />
              )}
              <div className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-[#1A6BFF]/25 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-[#1A6BFF]/15 flex items-center justify-center text-[#1A6BFF] font-black text-lg mb-5">
                  {s.num}
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUALIFICAÇÃO ────────────────────────────────────── */}
      <section className="px-6 py-24 bg-gradient-to-b from-transparent via-[#0D1830]/60 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-[#1A6BFF] uppercase tracking-widest mb-4 block">
              Qualificação
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Trabalhamos com quem
              <br />quer estar <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF3D00]">pronto.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5">
              <h3 className="font-bold text-green-400 mb-6 flex items-center gap-2">
                <span>✓</span> Para quem é
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                {[
                  'Empresas entre R$40k e R$400k/mês',
                  'Produto ou serviço validado no mercado',
                  'Dono que quer ser o especialista no assunto',
                  'Negócio que cresce mas perde previsibilidade',
                  'Quem quer implementar, não só planejar',
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
              <h3 className="font-bold text-red-400 mb-6 flex items-center gap-2">
                <span>✗</span> Para quem não é
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                {[
                  'Negócios com margens de lucro abaixo de 20%',
                  'Quem quer só posts, 10 reels/dia, só campanha',
                  'Empresas sem disposição para executar e mudar',
                  'Quem já teve resultado sem estratégia, dados e processo',
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM / CTA FINAL ────────────────────────────────── */}
      <section ref={formRef} className="px-6 py-24">
        <div className="max-w-xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/25 text-[#FF6B00] text-sm font-semibold mb-6">
              <span>🔥</span> Próximo passo
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Se fez sentido para o seu negócio,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#FF6B00]">
                reserve aqui 20 minutos direto com nossa equipe e vamos
              </span>{' '}
              🚀
            </h2>
            <p className="text-white/55 text-lg">
              Diagnóstico estratégico gratuito. Sem compromisso. Você sai com clareza sobre a proposta, personalizada para o seu negócio.
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#0D1830]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-[#1A6BFF]/5">
            <FormLead
              form={form}
              dddMessage={dddMessage}
              handlePhoneChange={handlePhoneChange}
              onSubmit={onSubmit}
            />
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            Suas informações são protegidas e nunca compartilhadas com terceiros.
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="px-6 py-10 border-t border-white/8 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Load Mais. Todos os direitos reservados.
      </footer>

      {/* Instagram Modal */}
      {showInstagramModal && formData && (
        <InstagramModal
          formData={formData}
          utmSource={utmSource}
          utmMedium={utmMedium}
          utmCampaign={utmCampaign}
          onClose={() => setShowInstagramModal(false)}
          extractCleanPhone={extractCleanPhone}
        />
      )}
    </main>
  )
}
