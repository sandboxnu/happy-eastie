import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link';

const Home: NextPage = () => {
    const router = useRouter();
    const {resourceId} = router.query;

  return (
    <div className={styles.container}>
      <h1>Resource {resourceId}</h1>
      <Link href='/results'>Back to Results page</Link>
    </div>
  )
}

export default Home
