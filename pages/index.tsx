import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header/>
    </div>
  )
}

export default Home
