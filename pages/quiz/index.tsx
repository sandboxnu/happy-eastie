import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'
import { SurveyAnswers } from '../../models/types'

import { QuizForm } from '../../components/quiz/QuizForm'

const Quiz: NextPage = () => {
  const quizState = useContext(AppContext)
  const router = useRouter();

  const handleSubmit = (values: any) => {
    const data : SurveyAnswers = {
      income: parseInt(values.income),
    }

    const encrypted = AES.encrypt(JSON.stringify(data), "Secret Passphrase")
    // to do: clear cache this point
    quizState.changeEncryptedQuizResponse(encrypted.toString())
    router.push(`/resources`)
  };

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <QuizForm onSubmitHandler={handleSubmit}/>
    </div>

  )
}

export default Quiz
