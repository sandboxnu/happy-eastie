import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'
import { QuizForm } from '../../components/quiz/QuizForm'
import { useSWRConfig } from 'swr'

const Quiz: NextPage = () => {
  const {cache} = useSWRConfig()
  const quizState = useContext(AppContext)
  const router = useRouter();

  const handleSubmit = (values: any) => {
    const encrypted = AES.encrypt(JSON.stringify(values), "Secret Passphrase")
    // clear old resources list from cache so cache never gets populated with too many lists
    cache.delete('/api/resources')
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
