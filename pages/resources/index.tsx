import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { Resource } from "../../models/types";
import { useResources } from "../../hooks/useResources";

const Resources: NextPage = () => {
  const quizState = useContext(AppContext)
  const {resources, isLoading, isError} = useResources(quizState.encryptedQuizResponse)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (!resources) return <div>failed to load</div>

  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div>
        {resources.map(resource => <div key={resource['id']}><Link href={`resources/${resource['id']}`} >{resource['name']}</Link><br /></div>)}
      </div>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
};

export default Resources;
