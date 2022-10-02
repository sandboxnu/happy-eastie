import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'

const Quiz: NextPage = () => {

  const quizState = useContext(AppContext)

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      incomeLevel: { value: number },
    }

    const incomeLevel = target.incomeLevel.value;

    const data = {
      incomeLevel,
    }

    const encrypted = AES.encrypt(JSON.stringify(data), "Secret Passphrase")
    quizState.changeHash(encrypted.toString())
    router.push(`/resources`)

  }

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Annual Income: <input type="text" name="incomeLevel" defaultValue="5" />
        </label>
        <br />
        <br />
        <input value="Submit" type="submit" />
      </form>
    </div>
  )
}

export default Quiz
