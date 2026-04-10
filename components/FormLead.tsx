'use client'

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { DDDMessage } from './DDDMessage'
import type { LeadFormData } from '@/hooks/useLeadForm'
import * as FlagIcons from 'country-flag-icons/react/3x2'

const COUNTRIES = [
  { code: 'BR', dial: '+55', name: 'Brasil' },
  { code: 'PT', dial: '+351', name: 'Portugal' },
  { code: 'US', dial: '+1', name: 'EUA' },
  { code: 'AR', dial: '+54', name: 'Argentina' },
  { code: 'MX', dial: '+52', name: 'México' },
  { code: 'CO', dial: '+57', name: 'Colômbia' },
  { code: 'CL', dial: '+56', name: 'Chile' },
  { code: 'ES', dial: '+34', name: 'Espanha' },
  { code: 'GB', dial: '+44', name: 'UK' },
  { code: 'DE', dial: '+49', name: 'Alemanha' },
  { code: 'FR', dial: '+33', name: 'França' },
  { code: 'IT', dial: '+39', name: 'Itália' },
]

function Flag({ code, className = 'w-8 h-auto rounded-[3px] shadow-sm' }: { code: string; className?: string }) {
  const FlagSvg = FlagIcons[code as keyof typeof FlagIcons]
  if (!FlagSvg) return <span className="text-xs text-white/50">{code}</span>
  return <FlagSvg className={className} />
}

type Props = {
  form: UseFormReturn<LeadFormData>
  dddMessage: string
  dddEmoji?: string
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export function FormLead({ form, dddMessage, dddEmoji, handlePhoneChange, onSubmit }: Props) {
  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
  } = form

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0])
  const [showDropdown, setShowDropdown] = useState(false)
  const [phoneDisplay, setPhoneDisplay] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const savedCursor = useRef<{ pos: number; oldLen: number } | null>(null)

  const isBR = selectedCountry.code === 'BR'

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  // Preserva posição do cursor no input mascarado (BR)
  useLayoutEffect(() => {
    if (savedCursor.current !== null && phoneRef.current) {
      const { pos, oldLen } = savedCursor.current
      const diff = phoneRef.current.value.length - oldLen
      const newPos = Math.max(0, pos + diff)
      phoneRef.current.setSelectionRange(newPos, newPos)
      savedCursor.current = null
    }
  })

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBR) {
      savedCursor.current = {
        pos: e.target.selectionStart ?? e.target.value.length,
        oldLen: e.target.value.length,
      }
      handlePhoneChange(e)
    } else {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 15)
      setPhoneDisplay(digits)
      setValue('whatsapp', selectedCountry.dial + digits, { shouldValidate: true })
    }
  }

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country)
    setValue('whatsapp', '', { shouldValidate: false })
    setPhoneDisplay('')
    setShowDropdown(false)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
    >
      {/* Nome */}
      <div>
        <input
          {...register('nome')}
          type="text"
          placeholder="COMO PODEMOS TE CHAMAR?"
          autoComplete="name"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/25 placeholder:text-[0.78rem] placeholder:tracking-wide focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
        />
        {errors.nome && (
          <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <div className="flex gap-2 items-stretch">
          {/* Seletor de país — só bandeira + chevron */}
          <div ref={dropdownRef} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-full flex items-center gap-1 px-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-200"
            >
              <Flag code={selectedCountry.code} />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3 text-white/40 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute bottom-full left-0 mb-2 z-50 bg-[#0C1524] border border-white/[0.12] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden w-44">
                <div className="max-h-52 overflow-y-auto">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-white/[0.06] transition-colors ${
                        selectedCountry.code === country.code ? 'bg-white/[0.04] text-white' : 'text-white/70'
                      }`}
                    >
                      <Flag code={country.code} className="w-6 h-auto rounded-[2px]" />
                      <span className="flex-1 text-xs">{country.name}</span>
                      <span className="text-xs text-white/40">{country.dial}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input com código do país como prefixo interno */}
          <div className="flex-1 min-w-0 flex items-center bg-white/10 border border-white/20 rounded-xl px-3 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition">
            <span className="text-sm text-white/60 shrink-0 mr-1.5 select-none">{selectedCountry.dial}</span>
            <input
              ref={phoneRef}
              type="tel"
              value={isBR ? watch('whatsapp') : phoneDisplay}
              onChange={onPhoneChange}
              placeholder={isBR ? '(11) 99999-9999' : 'Número de telefone'}
              autoComplete="tel"
              inputMode="numeric"
              className="flex-1 min-w-0 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none"
            />
          </div>
        </div>
        {errors.whatsapp && (
          <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* DDD Message — apenas para Brasil */}
      {isBR && dddMessage && <DDDMessage message={dddMessage} emoji={dddEmoji} />}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-gradient-brand text-white font-bold py-4 rounded-xl text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 glow-orange"
      >
        Continuar →
      </button>

      <p className="text-center text-white/40 text-xs">
        Sem spam. Seus dados são protegidos.
      </p>
    </form>
  )
}
