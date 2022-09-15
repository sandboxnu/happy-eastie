import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Generic Resources</h1>
      <a href='/'>Back to Home</a>
    </div>
  )
}

export default Home
