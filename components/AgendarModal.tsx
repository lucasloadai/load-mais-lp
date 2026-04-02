'use client'

type Props = {
  leadName: string
  onClose: () => void
}

export function AgendarModal({ leadName, onClose }: Props) {
  const firstName = leadName ? leadName.split(' ')[0] : ''
  const calUrl = 'https://cal.com/lucas-lourenco-load-6ujiol/20-min'

  function openCal() {
    window.open(calUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#080E18]/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm bg-[#0C1524] border border-white/[0.08] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Barra topo */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#1A6BFF]" />

        <div className="px-6 pt-6 pb-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] px-3 py-1 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] mb-3">
                <span className="font-black text-sm leading-none">+</span>
                Análise gratuita
              </div>
              <h2 className="text-xl font-extrabold leading-tight">
                {firstName
                  ? `${firstName}, vamos agendar`
                  : 'Vamos agendar'}
              </h2>
              <p className="text-white/45 text-xs mt-1">20 min · Diagnóstico estratégico gratuito</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition text-lg leading-none mt-1 ml-4"
            >
              ✕
            </button>
          </div>

          {/* Info */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 mb-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#FF6B00] shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              20 minutos de diagnóstico gratuito
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#FF6B00] shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Convite enviado automaticamente para o seu e-mail
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[#FF6B00] shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Online · Google Meet
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={openCal}
            className="w-full py-3.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(255,107,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,107,0,0.45)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Escolher horário
          </button>
        </div>
      </div>
    </div>
  )
}
