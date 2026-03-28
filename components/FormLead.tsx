'use client'

import { useRef, useLayoutEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { DDDMessage } from './DDDMessage'
import type { LeadFormData } from '@/hooks/useLeadForm'

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
  } = form

  // Preserva posição do cursor no input mascarado
  const phoneRef = useRef<HTMLInputElement>(null)
  const savedCursor = useRef<{ pos: number; oldLen: number } | null>(null)

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
    savedCursor.current = {
      pos: e.target.selectionStart ?? e.target.value.length,
      oldLen: e.target.value.length,
    }
    handlePhoneChange(e)
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
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
          <input
            ref={phoneRef}
            type="tel"
            value={watch('whatsapp')}
            onChange={onPhoneChange}
            placeholder="(11) 99999-9999"
            autoComplete="tel"
            inputMode="numeric"
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
          />
        </div>
        {errors.whatsapp && (
          <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* DDD Message */}
      {dddMessage && <DDDMessage message={dddMessage} emoji={dddEmoji} />}

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
