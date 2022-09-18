import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>List of Resources Page</h1>
      <Link href='/'>Back to Home</Link>
    </div>
  )
}

export default Home
