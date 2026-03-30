export type QualificationTier = 'FRIO' | 'MORNO' | 'QUENTE' | 'PRONTO'

export type FaturamentoAnswer = 'ate10k' | '10k-50k' | '50k-150k' | 'acima150k'
export type DorAnswer = 'generica' | 'moderada' | 'forte' | 'critica'
export type MomentoAnswer = 'inicial' | 'crescimento' | 'estrutura' | 'escala'

export interface QualificationAnswers {
  faturamento: FaturamentoAnswer
  dor: DorAnswer
  momento: MomentoAnswer
}

export interface QualificationResult {
  score: number
  tier: QualificationTier
  planId: 'A1' | 'A2' | 'A3' | 'A4'
}

const FATURAMENTO_SCORE: Record<FaturamentoAnswer, number> = {
  'ate10k':    10,
  '10k-50k':   20,
  '50k-150k':  30,
  'acima150k': 40,
}

const DOR_SCORE: Record<DorAnswer, number> = {
  'generica':  5,
  'moderada':  15,
  'forte':     25,
  'critica':   30,
}

const MOMENTO_SCORE: Record<MomentoAnswer, number> = {
  'inicial':     5,
  'crescimento': 15,
  'estrutura':   25,
  'escala':      30,
}

export function calcularScore(answers: QualificationAnswers): QualificationResult {
  const score =
    FATURAMENTO_SCORE[answers.faturamento] +
    DOR_SCORE[answers.dor] +
    MOMENTO_SCORE[answers.momento]

  const tier: QualificationTier =
    score >= 80 ? 'PRONTO' :
    score >= 60 ? 'QUENTE' :
    score >= 40 ? 'MORNO'  : 'FRIO'

  const planId =
    tier === 'PRONTO' ? 'A4' :
    tier === 'QUENTE' ? 'A3' :
    tier === 'MORNO'  ? 'A2' : 'A1'

  return { score, tier, planId }
}

export const TIER_META: Record<QualificationTier, { label: string; color: string; leitura: string }> = {
  FRIO:   { label: 'Frio',   color: '#6B7280', leitura: 'Ainda não é cliente' },
  MORNO:  { label: 'Morno',  color: '#F59E0B', leitura: 'Precisa de educação' },
  QUENTE: { label: 'Quente', color: '#3B82F6', leitura: 'Pode virar cliente'  },
  PRONTO: { label: 'Pronto', color: '#10B981', leitura: 'Cliente ideal'       },
}
