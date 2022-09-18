import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <Link href='/resources/1'>Helper1</Link>
      <br />
      <br />
      <Link href='/resources/2'>Helper2</Link>
      <br />
      <br />
      <Link href='/resources/3'>Helper3</Link>
      <br />
      <br />
      <Link href='/resources/4'>Helper4</Link>
      <br />
      <br />
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
}

export default Home
