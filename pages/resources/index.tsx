import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { useResources } from "../../hooks/useResources";
import { ResourcesDisplay } from "../../components/resources/ResourcesDisplay";

const Resources: NextPage = () => {
  const quizState = useContext(AppContext)
  const {resources, isLoading, isError} = useResources(quizState.encryptedQuizResponse)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (!resources) return <div>Internal server error: invalid resources loaded</div>

  return  (

    <div className={styles.container}>
      <h1>Results</h1>
      <ResourcesDisplay resources={resources}/>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
};

export default Resources;
