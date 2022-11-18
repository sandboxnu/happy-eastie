import type { NextPage } from 'next'
import React from 'react'
import styles from '../../../styles/Home.module.css'
import { QuizResultsDisplay } from '../../../components/quiz/QuizResultsDisplay'
import Link from 'next/link'
import Header from '../../../components/header'

const QuizResults: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <QuizResultsDisplay />
      <Link href='/quiz/3'>Back to Home</Link>
    </div>)
}

export default QuizResults

