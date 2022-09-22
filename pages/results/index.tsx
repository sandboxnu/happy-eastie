import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react';

const QuizResults: NextPage = () => {
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
      <div>{resources.map(resource => <div key={resource['name']}><Link href={`resources/${resource['name']}`} >{resource['name']}</Link><br /></div>)}</div>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
}

export default QuizResults
