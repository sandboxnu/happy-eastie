import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from "next/router";
import { QuizResultsDisplay } from '../../components/quiz/QuizResultsDisplay'
import Layout from '../../components/Layout';


const QuizResults: NextPage = () => {
  const router = useRouter();

  return (
    <Layout includePadding={false}>
      <QuizResultsDisplay encryptedQuizResponse={router.query.encryptedQuizResponse as string} />
    </Layout>
  )
}

export default QuizResults
