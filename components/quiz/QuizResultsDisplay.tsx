import { Progress, Row } from "@nextui-org/react";
import { useEffect, useState } from "react";
import styles from "./QuizResultsDisplay.module.css";
import { ResourcesDisplay } from "../directory/ResourcesDisplay";
import { Grid, Spacer, Text, Image } from "@nextui-org/react";
import { HelpTooltip } from "../HelpTooltip";
import { ResourcesResponse } from "../../pages/api/resources";
import { Resource } from "../../models/types2";
import { WithId } from "mongodb";

interface QuizResultsDisplayProps {
  encryptedQuizResponse: string;
}

export const QuizResultsDisplay: React.FC<QuizResultsDisplayProps> = (props: QuizResultsDisplayProps) => {
  const [requestedResources, setRequestedResources] = useState<WithId<Resource>[]>([]);
  const [additionalResources, setAdditionalResources] = useState<WithId<Resource>[]>([]);

  useEffect(() => {
    const fetchFilteredResources = async () => {
      const requestBody = JSON.stringify({ data: props.encryptedQuizResponse });
      const requestSettings = {
        method: "POST",
        body: requestBody,
        headers: { "Content-Type": "application/json" },
      };
      const response: Response = await fetch("/api/resources", requestSettings);
      const resources: ResourcesResponse = await response.json();
      setRequestedResources(resources.data.requested);
      setAdditionalResources(resources.data.additional);
    };

    fetchFilteredResources().catch(console.error);
  }, []);
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading/>
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
          <Text className={styles.subtitle}>In order of best fit for you.</Text>
          <Spacer x={0.5} />
          <HelpTooltip diameter={15} text="These are resources that you qualify for and that are under the categories you requested in the first page." />
        </Row>
      </Grid>
      <Grid direction="column" css={{width: "100%"}}>
        <ResourcesDisplay resources={requestedResources} />
        {additionalResources.length > 0 && (
          <>
            <Text h2>Additional Resources</Text>
            <Row align="center" justify="center">
              <Text className={styles.subtitle}>Services you also qualify for.</Text>
              <Spacer x={0.5} />
              <HelpTooltip diameter={15} text="These are other resources you might qualify for but did not specifically request." />
            </Row>
            <ResourcesDisplay resources={additionalResources} />
          </>
        )}
      </Grid>
    </Grid.Container>
  );
};
