import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Quiz: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('quiz/1')
  });

  return <></>
}

export default Quiz