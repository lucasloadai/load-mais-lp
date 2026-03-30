'use client'

import { useState, useCallback } from 'react'
import { checkInstagramProfile } from '@/lib/instagramCheck'
import { trackEvent } from '@/utils/tracking'
import type { InstagramProfile } from '@/lib/instagramCheck'

type InstagramState = {
  loading: boolean
  error: string | null
  profile: InstagramProfile | null
}

export function useInstagram() {
  const [state, setState] = useState<InstagramState>({
    loading: false,
    error: null,
    profile: null,
  })

  const verify = useCallback(async (username: string) => {
    setState({ loading: true, error: null, profile: null })

    const result = await checkInstagramProfile(username)

    if (!result.success) {
      setState({ loading: false, error: result.error, profile: null })
      return null
    }

    setState({ loading: false, error: null, profile: result.profile })
    trackEvent('InstagramValidated', { followers: result.profile.followers_count })

    return { profile: result.profile }
  }, [])

  const reset = useCallback(() => {
    setState({ loading: false, error: null, profile: null })
  }, [])

  return { ...state, verify, reset }
}
