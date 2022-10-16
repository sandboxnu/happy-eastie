import { useContext } from "react"
import { AppContext } from "../../context/context"
import { useResources } from "../../hooks/useResources"
import styles from "../../styles/Home.module.css";
import { ResourcesDisplay } from "../resources/ResourcesDisplay";

export const QuizResults: React.FC = () => {
  const quizState = useContext(AppContext)
  const {requestedResources, additionalResources, isLoading, error} = useResources(quizState.encryptedQuizResponse)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading...</div>
  if (requestedResources == undefined) return <div>Internal server error: invalid resources loaded</div>
  if (additionalResources == undefined) return <div>Internal server error: invalid resources loaded</div>

  return  (
    <div className={styles.container}>
      <h1>Quiz Results</h1>
      <h2>Requested</h2>
      <ResourcesDisplay resources={requestedResources}/>
      <h2>Additional</h2>
      <ResourcesDisplay resources={additionalResources}/>
    </div>
  )
}