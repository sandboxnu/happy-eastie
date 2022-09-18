import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [resources, setResources] = useState([])
  useEffect(() => {
    const fetchResources = async () => {
      const data  = await (await fetch('/api/services')).json()
      setResources(data)
    }
    fetchResources()
  }, [])
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div>{resources.map(resource => <h1 key={resource['name']}>{resource['name']}</h1>)}</div>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
}

export default Home
