import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useResources } from "../../hooks/useResources";
import { ResourcesDisplay } from "../../components/resources/ResourcesDisplay";
import { useContext } from "react";
import { AppContext } from "../../context/context";

const Resources: NextPage = () => {
  const quizState = useContext(AppContext)
  const {requestedResources, additionalResources, isLoading, error} = useResources(quizState.encryptedQuizResponse)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading...</div>
  if (requestedResources == undefined) return <div>Internal server error: invalid resources loaded</div>
  if (additionalResources == undefined) return <div>Internal server error: invalid resources loaded</div>

  return  (
    <div className={styles.container}>
      <h1>Results</h1>
      <h2>Requested</h2>
      <ResourcesDisplay resources={requestedResources}/>
      <h2>Additional</h2>
      <ResourcesDisplay resources={additionalResources}/>
      <Link href='/quiz'>Back to Quiz</Link>
    </div>
  )
};

export default Resources;
