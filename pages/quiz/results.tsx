import type { NextPage } from 'next'
import React from 'react'
import { QuizResultsDisplay } from '../../components/quiz/QuizResultsDisplay'
import Layout from '../../components/Layout';
const QuizResults: NextPage = () => {
  return (
    <Layout>
      <QuizResultsDisplay />
    </Layout>)
}

export default QuizResults

