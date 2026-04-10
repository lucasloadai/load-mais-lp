'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { applyPhoneMask, extractDDD, extractCleanPhone } from '@/utils/phoneMask'
import { getDDDMessage, getDDDEmoji } from '@/utils/dddMessages'
import { trackEvent } from '@/utils/tracking'

const leadSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  whatsapp: z
    .string()
    .min(8, 'Número inválido')
    .max(22, 'Número inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
})

export type LeadFormData = z.infer<typeof leadSchema>

export function useLeadForm() {
  const [ddd, setDdd] = useState('')
  const [dddMessage, setDddMessage] = useState('')
  const [dddEmoji, setDddEmoji] = useState('📍')
  const [showInstagramModal, setShowInstagramModal] = useState(false)
  const [formData, setFormData] = useState<LeadFormData | null>(null)

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { nome: '', whatsapp: '', email: '' },
  })

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyPhoneMask(e.target.value)
      form.setValue('whatsapp', masked, { shouldValidate: true })

      const digits = masked.replace(/\D/g, '')
      if (digits.length >= 2) {
        const newDdd = extractDDD(digits)
        if (newDdd !== ddd) {
          setDdd(newDdd)
          setDddMessage(getDDDMessage(newDdd))
          setDddEmoji(getDDDEmoji(newDdd))
          trackEvent('DDDDetected', { ddd: newDdd })
        }
      } else {
        setDdd('')
        setDddMessage('')
      }
    },
    [ddd, form]
  )

  const onSubmit = useCallback(
    (data: LeadFormData) => {
      setFormData(data)
      setShowInstagramModal(true)
      trackEvent('InstagramRequested', { ddd })
    },
    [ddd]
  )

  return {
    form,
    ddd,
    dddMessage,
    dddEmoji,
    showInstagramModal,
    setShowInstagramModal,
    formData,
    handlePhoneChange,
    onSubmit: form.handleSubmit(onSubmit),
    extractCleanPhone,
  }
}
