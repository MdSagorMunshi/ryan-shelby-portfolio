'use client'

import { useEffect, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
}

export default function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const turnstileRef = useRef<React.ElementRef<typeof Turnstile>>(null);

  useEffect(() => {
    if (turnstileRef.current) {
      turnstileRef.current.reset()
    }
  }, [])

  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
      onSuccess={onVerify}
    />
  )
}