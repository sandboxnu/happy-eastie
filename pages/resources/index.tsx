import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";

const Resources: NextPage = () => {
  const quizState = useContext(AppContext)
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      if (quizState.hash) {
        const data  = await (await fetch('/api/resources', {method: 'POST', body: JSON.stringify({data: quizState.hash}),
        headers: { 'Content-Type': 'application/json'}})).json()
      setResources(data)
      }
    }
    fetchResources()
  }, [quizState.hash])
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div>{resources.map(resource => <div key={resource['id']}><Link href={`resources/${resource['id']}`} >{resource['name']}</Link><br /></div>)}</div>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
};

export default Resources;
