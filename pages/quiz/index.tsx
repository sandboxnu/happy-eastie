import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'
import { QuizForm } from '../../components/quiz/QuizForm'
import { useSWRConfig } from 'swr'
import { QuizResults } from '../../components/quiz/QuizResults'

const Quiz: NextPage = () => {
  const [page, setPage] = useState(1)
  const {cache} = useSWRConfig()
  const quizState = useContext(AppContext)

  const goBackPage = (event : React.SyntheticEvent) => {
    event.preventDefault()
    setPage(page - 1)
  }

  const handleSubmit = (values: any) => {
    const encrypted = AES.encrypt(JSON.stringify(values), "Secret Passphrase")
    // clear old resources list from cache so cache never gets populated with too many lists
    cache.delete('/api/resources')
    quizState.changeEncryptedQuizResponse(encrypted.toString())
    setPage(2)
  };

  if (page == 1) {
    return (
      <div className={styles.container}>
        <h1>Quiz Page</h1>
        <Link href='/'>Back to Home</Link>
        <QuizForm onSubmitHandler={handleSubmit}/>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <QuizResults />
        <button onClick={goBackPage}>Go Back </button>
      </div>)
  }
}

export default Quiz
