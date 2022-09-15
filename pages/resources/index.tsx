import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Resource</h1>
      <a href='/'>Back to Home</a>
    </div>
  )
}

export default Home
