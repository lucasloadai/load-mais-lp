-- Migration: sistema de qualificação v2
-- Substitui lead_score/lead_tier pelo novo sistema FRIO/MORNO/QUENTE/PRONTO

-- Adiciona novos campos
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS qualification_score     integer,
  ADD COLUMN IF NOT EXISTS qualification_tier      text CHECK (qualification_tier IN ('FRIO', 'MORNO', 'QUENTE', 'PRONTO')),
  ADD COLUMN IF NOT EXISTS faturamento_answer      text,
  ADD COLUMN IF NOT EXISTS dor_answer              text,
  ADD COLUMN IF NOT EXISTS momento_answer          text;

-- Remove campos antigos
ALTER TABLE leads
  DROP COLUMN IF EXISTS lead_score,
  DROP COLUMN IF EXISTS lead_tier,
  DROP COLUMN IF EXISTS qualification_summary;

-- Índice para filtro por tier no CRM
CREATE INDEX IF NOT EXISTS idx_leads_qualification_tier ON leads (qualification_tier);
