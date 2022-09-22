import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Quiz: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <br />
      <br />
      <form action="/results" method="post">
        <label>Annual Income:</label>
        <br />
        <br />
        <input type="text" defaultValue="$"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Quiz
