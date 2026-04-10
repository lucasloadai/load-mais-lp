'use client'

type Props = {
  leadName: string
  onClose: () => void
}

export function AgendarModal({ leadName, onClose }: Props) {
  const firstName = leadName ? leadName.split(' ')[0] : ''

  const embedUrl =
    'https://cal.com/lucas-lourenco-load-6ujiol/20-min' +
    '?embed=true&layout=month_view&theme=dark&hideEventTypeDetails=1&locale=pt-BR'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#080E18]/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#0C1524] border border-white/[0.08] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Barra topo */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#1A6BFF]" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[1.5px] text-[#FF6B00] px-3 py-1 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/[0.08] mb-2">
              <span className="font-black text-sm leading-none">+</span>
              Análise gratuita
            </div>
            <h2 className="text-lg font-extrabold leading-tight">
              {firstName ? `${firstName}, escolha o melhor horário` : 'Escolha o melhor horário'}
            </h2>
            <p className="text-white/45 text-xs mt-0.5">20 min · Diagnóstico estratégico gratuito · Google Meet</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition text-lg leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Cal.com iframe embed */}
        <div className="relative">
          <iframe
            src={embedUrl}
            width="100%"
            height="600"
            frameBorder="0"
            title="Agendar reunião"
            style={{ display: 'block', background: 'transparent' }}
          />
          {/* Cobre o logo do Cal.com */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0C1524]" />
        </div>
      </div>
    </div>
  )
}
