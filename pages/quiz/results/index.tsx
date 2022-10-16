import type { NextPage } from 'next'
import React from 'react'
import styles from '../../../styles/Home.module.css'
import { QuizResultsDisplay } from '../../../components/quiz/QuizResultsDisplay'
import Link from 'next/link'

const QuizResults: NextPage = () => {
  return (
    <div className={styles.container}>
      <QuizResultsDisplay />
      <Link href='/quiz'>Back to Home</Link>
    </div>)
}

export default QuizResults

