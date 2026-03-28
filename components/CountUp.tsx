'use client'

import { useEffect, useRef, useState } from 'react'

type Props = { value: string }

function parse(value: string): { prefix: string; num: number; suffix: string } | null {
  const m = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!m) return null
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
}

export function CountUp({ value }: Props) {
  const parsed = parse(value)
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!parsed) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            const current = Math.round(eased * parsed.num)
            setDisplay(`${parsed.prefix}${current}${parsed.suffix}`)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>
}
