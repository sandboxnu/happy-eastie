import type { NextPage } from 'next'
import React from 'react'
import styles from '../../../styles/Home.module.css'
import { QuizResultsDisplay } from '../../../components/quiz/QuizResultsDisplay'
import Header from '../../../components/header'
import stylesQuiz from "../../../styles/quiz.module.css";
import { Link } from '@nextui-org/react'
import Footer from '../../../components/footer'

const QuizResults: NextPage = () => {
  return (
    <div>
      <Header/>
      <QuizResultsDisplay/>
      <Link href='/quiz/3' className={stylesQuiz.back}>Back</Link>
      <Footer/>
    </div>)
}

export default QuizResults

