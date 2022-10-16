import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'
import { QuizForm } from '../../components/quiz/QuizForm'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'

const Quiz: NextPage = () => {
  const router = useRouter()
  const {cache} = useSWRConfig()
  const quizState = useContext(AppContext)

  const handleSubmit = (values: any) => {
    const encrypted = AES.encrypt(JSON.stringify(values), "Secret Passphrase")
    // clear old resources list from cache so cache never gets populated with too many lists
    cache.delete('/api/resources')
    quizState.changeEncryptedQuizResponse(encrypted.toString())
    router.push('/quiz/results')
  };

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <QuizForm onSubmitHandler={handleSubmit} initialValues={quizState.encryptedQuizResponse}/>
    </div>
  )
}

export default Quiz
