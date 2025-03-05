'use client'
import React from 'react'
import { useBilling } from '@/providers/billing-provider'
import { Card, CardContent, CardDescription } from '@/components/ui/card'

type Props = {}

const MoreCredits = (props: Props) => {
  const { credits } = useBilling()
  return credits !== '0' ? (
    <></>
  ) : (
    <Card>
      <CardContent className="p-6">
        <CardDescription>You are out of credits. Please upgrade your plan at <a href='/billing' className='text-violet-400 hover:underline'>billing</a>.</CardDescription>
      </CardContent>
    </Card>
  )
}

export default MoreCredits
