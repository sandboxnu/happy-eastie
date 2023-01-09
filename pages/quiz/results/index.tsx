import type { NextPage } from 'next'
import React from 'react'
import styles from '../../../styles/Home.module.css'
import { QuizResultsDisplay } from '../../../components/quiz/QuizResultsDisplay'
import Header from '../../../components/header'
import stylesQuiz from "../../../styles/quiz.module.css";
import { Link } from '@nextui-org/react'
import Footer from '../../../components/footer'
import { Grid } from "@nextui-org/react";

const QuizResults: NextPage = () => {
  return (
    <div>
      <Header/>
      <QuizResultsDisplay/>
      <Grid xs={12} justify="space-around">
        <Link href='/quiz/3' className={stylesQuiz.back}>Back</Link>
      </Grid>
      <Footer/>
    </div>)
}

export default QuizResults

