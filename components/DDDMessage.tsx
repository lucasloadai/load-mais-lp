'use client'

import { useEffect, useState } from 'react'

type Props = {
  message: string
  emoji?: string
}

export function DDDMessage({ message, emoji = '📍' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [message])

  return (
    <div
      className={`transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="flex items-center gap-3 bg-[#1A6BFF]/[0.07] border border-[#1A6BFF]/25 rounded-xl px-4 py-3">
        <span className="text-xl animate-float shrink-0">{emoji}</span>
        <p className="text-white/75 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
