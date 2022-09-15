import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const router = useRouter();
    const {resourceId} = router.query;

  return (
    <div className={styles.container}>
      <h1>Resource Index {resourceId}</h1>
      <a href='/'>Back to Home</a>
    </div>
  )
}

export default Home
