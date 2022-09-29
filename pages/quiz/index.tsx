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
      income: { value: number },
      employed: { value: boolean }
    }

    const income = target.income.value;
    const employed = target.employed.value;

    const data = {
      income: income,
      employed: employed
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

    const result = await response.json();
    router.push(`/resources?id=${result}`)
  }

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <br />
      <br />
      <form action='/resources' method="get">
        <label>
          Annual Income: <input type="text" name="income" defaultValue="$" />
        </label>
        <br />
        <br />
        <label>
          Employed?: <input type="checkbox" name="employed" defaultValue="%" />
        </label>
        <br />
        <br />
        <input value="Submit" type="submit" />
      </form>
    </div>
  )
}

export default Quiz
