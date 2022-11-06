import { Progress } from "@nextui-org/react";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { useResources } from "../../hooks/useResources";
import styles from "../../styles/resource.module.css";
import { ResourcesDisplay } from "../directory/ResourcesDisplay";
import { Star } from "../star";
import { Grid, Spacer, Text } from "@nextui-org/react";
import Header from "../header";

export const QuizResultsDisplay: React.FC = () => {
  const quizState = useContext(AppContext);
  const { requestedResources, additionalResources, isLoading, error } =
    useResources(quizState.encryptedQuizResponse);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (requestedResources == undefined || additionalResources == undefined)
    return <div>Internal server error: invalid resources loaded</div>;

  return (
    <Grid.Container gap={2} alignItems="center" direction="column" className={styles.container}>
      <Grid direction="column">
        <Text h1>
          Your Matches
        </Text>
        <Text>In order of best fit for you.</Text>
        <Spacer y={1} />
        <Progress max={4} value={4} size={"sm"} />
        <Spacer y={1} />
      </Grid>
      <Grid direction="column">
        <ResourcesDisplay resources={requestedResources} />
        {additionalResources.length > 0 && (
          <>
            <Text h2>Additional Resources</Text>
            <p>Services you also qualify for.</p>
            <ResourcesDisplay resources={additionalResources} />
          </>
        )}
      </Grid>
    </Grid.Container>
  );
};
