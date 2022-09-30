import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'

const Quiz: NextPage = () => {

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

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/resources'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options);

    const result : string[] = await response.json();
    const queryString = result.join(",")
    router.push(`/resources?ids=${queryString}`)
  }

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Annual Income: <input type="text" name="incomeLevel" defaultValue="$" />
        </label>
        <br />
        <br />
        <input value="Submit" type="submit" />
      </form>
    </div>
  )
}

export default Quiz
