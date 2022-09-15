import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <a href='/resources'>Helper1</a>
      <br />
      <br />
      <a href='/resources'>Helper2</a>
      <br />
      <br />
      <a href='/resources'>Helper3</a>
      <br />
      <br />
      <a href='/resources'>Helper4</a>
      <br />
      <br />
    </div>
  )
}

export default Home
