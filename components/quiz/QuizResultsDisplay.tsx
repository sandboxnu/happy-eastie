import { Progress, Row } from "@nextui-org/react";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { useResources } from "../../hooks/useResources";
import styles from "../../styles/resource.module.css";
import { ResourcesDisplay } from "../directory/ResourcesDisplay";
import { Star } from "../star";
import { Grid, Spacer, Text } from "@nextui-org/react";
import Header from "../header";
import { HelpTooltip } from "../HelpTooltip";

export const QuizResultsDisplay: React.FC = () => {
  const quizState = useContext(AppContext);
  const { requestedResources, additionalResources, isLoading, error } =
    useResources(quizState.encryptedQuizResponse);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (requestedResources == undefined || additionalResources == undefined)
    return <div>Internal server error: invalid resources loaded</div>;

  return (
    <Grid.Container
      gap={2}
      alignItems="center"
      direction="column"
      className={styles.container}
    >
      <Grid direction="column">
        <Text h1>Your Matches</Text>
        <Progress max={4} value={4} size={"sm"} />
        <Spacer y={0.7} />
        <Row align="center" justify="center">
          <Text>In order of best fit for you.</Text>
          <Spacer x={0.5} />
          <HelpTooltip diameter={15} text="Test" />
        </Row>
      </Grid>
      <Grid direction="column">
        <ResourcesDisplay resources={requestedResources} />
        {additionalResources.length > 0 && (
          <>
            <Text h2>Additional Resources</Text>
            <Row align="center" justify="center">
              <p>Services you also qualify for.</p>
              <Spacer x={0.5} />
              <HelpTooltip diameter={15} text="Test" />
            </Row>
            <ResourcesDisplay resources={additionalResources} />
          </>
        )}
      </Grid>
    </Grid.Container>
  );
};
