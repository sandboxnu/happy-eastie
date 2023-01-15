import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'

const Quiz: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('quiz/1')
  });

  return <Layout><Loading/></Layout>
}

export default Quiz