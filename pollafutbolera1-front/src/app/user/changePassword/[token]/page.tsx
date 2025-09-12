'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ChangePassword from '@/src/components/ChangePasswordPage'

export default function ChangePasswordPage() {
  const { token } = useParams() as { token?: string }

  if (!token) {
    return <div>Loading…</div>
  }

  const params = { token }

  return <ChangePassword token={params.token} />
}
