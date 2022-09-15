import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <a href='/'>Back to Home</a>
      <br />
      <br />
      <form action="/results" method="post">
        <label>Annual Income:</label>
        <br />
        <br />
        <input type="text" defaultValue="$" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Home
