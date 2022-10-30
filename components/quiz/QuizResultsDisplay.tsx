import { useContext } from "react"
import { AppContext } from "../../context/context"
import { useResources } from "../../hooks/useResources"
import styles from "../../styles/Home.module.css";
import styles2 from "../../styles/resource.module.css";
import { ResourcesDisplay } from "../directory/ResourcesDisplay";

export const QuizResultsDisplay: React.FC = () => {
  const quizState = useContext(AppContext)
  const {requestedResources, additionalResources, isLoading, error} = useResources(quizState.encryptedQuizResponse)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading...</div>
  if (requestedResources == undefined || additionalResources == undefined) return <div>Internal server error: invalid resources loaded</div>

  return  (
    <div className={styles.container}>
      <h1 className={styles2.title}>Your Matches</h1>
      <p className={styles2.subtitle}>In order of best fit for you.</p>
      <ResourcesDisplay resources={requestedResources}/>
      <h2 className={styles2.title}>Additional Resources</h2>
      <p className={styles2.subtitle}>Services you also qualify for.</p>
      <ResourcesDisplay resources={additionalResources}/>
    </div>
  )
}