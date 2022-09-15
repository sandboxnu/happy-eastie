import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <a href='/resources/1'>Helper1</a>
      <br />
      <br />
      <a href='/resources/2'>Helper2</a>
      <br />
      <br />
      <a href='/resources/3'>Helper3</a>
      <br />
      <br />
      <a href='/resources/4'>Helper4</a>
      <br />
      <br />
    </div>
  )
}

export default Home
