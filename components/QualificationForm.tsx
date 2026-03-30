'use client'
import { useState } from 'react'
import {
  calcularScore,
  type FaturamentoAnswer,
  type DorAnswer,
  type MomentoAnswer,
  type QualificationAnswers,
  type QualificationResult,
} from '@/lib/leadScoring'

const QUESTIONS = [
  {
    key: 'faturamento' as const,
    pergunta: 'Qual o faturamento médio mensal da sua empresa?',
    opcoes: [
      { value: 'ate10k'    as FaturamentoAnswer, label: 'Até R$30k' },
      { value: '10k-50k'   as FaturamentoAnswer, label: 'R$30k – R$60k' },
      { value: '50k-150k'  as FaturamentoAnswer, label: 'R$60k – R$120k' },
      { value: 'acima150k' as FaturamentoAnswer, label: 'Acima de R$120k' },
    ],
  },
  {
    key: 'dor' as const,
    pergunta: 'Qual seu maior desafio hoje?',
    opcoes: [
      { value: 'generica'  as DorAnswer, label: 'Não tenho previsibilidade de vendas' },
      { value: 'moderada'  as DorAnswer, label: 'Não invisto em marketing e captação no momento' },
      { value: 'forte'     as DorAnswer, label: 'Invisto em captação/tráfego, mas não fecho' },
      { value: 'critica'   as DorAnswer, label: 'Nunca investi antes nisso' },
    ],
  },
  {
    key: 'momento' as const,
    pergunta: 'Em qual fase sua empresa está?',
    opcoes: [
      { value: 'inicial'     as MomentoAnswer, label: 'Estou começando' },
      { value: 'crescimento' as MomentoAnswer, label: 'Já vendo, mas sem processo' },
      { value: 'estrutura'   as MomentoAnswer, label: 'Tenho vendas/tráfego, quero organizar' },
      { value: 'escala'      as MomentoAnswer, label: 'Quero escalar com previsibilidade' },
    ],
  },
]

interface Props {
  onComplete: (result: QualificationResult, answers: QualificationAnswers) => void
}

export default function QualificationForm({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QualificationAnswers>>({})

  const question = QUESTIONS[step]
  const total = QUESTIONS.length

  function handleOption(value: string) {
    const updated = { ...answers, [question.key]: value } as QualificationAnswers

    if (step < total - 1) {
      setAnswers(updated)
      setStep(s => s + 1)
    } else {
      const result = calcularScore(updated)
      onComplete(result, updated)
    }
  }

  return (
    <div className="mt-6 mx-auto max-w-2xl">
      <div className="relative rounded-xl border border-white/10 bg-[#0D1A30]/60 px-5 py-4 text-left overflow-hidden backdrop-blur-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.6rem] font-bold uppercase tracking-[1.5px] text-[#FF6B00]/70">
            Diagnóstico e Personalização rápida pra você
          </span>
          <span className="text-[0.6rem] text-white/25">{step + 1}/{total}</span>
        </div>

        {/* Barra de progresso */}
        <div className="flex items-center gap-1.5 mb-4">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 rounded-full transition-all duration-500"
              style={{ backgroundColor: i <= step ? '#FF6B00' : '#ffffff12' }}
            />
          ))}
        </div>

        {/* Pergunta */}
        <p className="text-white/90 font-semibold text-sm leading-snug mb-3">
          {question.pergunta}
        </p>

        {/* Opções */}
        <div className="grid grid-cols-2 gap-1.5">
          {question.opcoes.map(op => (
            <button
              key={op.value}
              onClick={() => handleOption(op.value)}
              className="text-left px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/65 text-xs hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/[0.05] hover:text-white transition-all duration-200"
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
