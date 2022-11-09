import { Progress, Row } from "@nextui-org/react";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { useResources } from "../../hooks/useResources";
import styles from "../../styles/resource.module.css";
import { ResourcesDisplay } from "../directory/ResourcesDisplay";
import { Grid, Spacer, Text, Image } from "@nextui-org/react";
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
      gap={1}
      alignItems="center"
      direction="column"
      className={styles.container}
    >
      <Grid direction="column">
        <Row align="center">
          <Image src={"/star.svg"} alt="" width={31} height={31} />
          <Spacer x={0.4} />
          <Text h1>Your Matches</Text>
        </Row>
        <Spacer y={0.4} />
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
