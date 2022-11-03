import { Resource } from "../../models/types";
import { Grid, Image, Text } from "@nextui-org/react";
import styles from "../../styles/resource.module.css";
import ReactMarkdown from "react-markdown";

interface ResourceDescriptionProps {
  resource: Resource;
}

export const ResourceDescription: React.FC<ResourceDescriptionProps> = (
  props: ResourceDescriptionProps
) => {
  return (
    <Grid>
      <Grid.Container justify="center" gap={8} wrap="nowrap">
        <Grid>
          <Text className={styles.descriptionText}>
            {props.resource.description}
          </Text>
          <br />
          <ReactMarkdown
            className={styles.descriptionText}
          >{`**Point of Contact:** ${props.resource.pointOfContact}`}</ReactMarkdown>
          <ReactMarkdown
            className={styles.descriptionText}
          >{`**Waitlist:** ${props.resource.waitlist?.description}`}</ReactMarkdown>
        </Grid>
        <Grid>
          {/* TODO: put map of relevant locations here */}
          <Image
            src={"https://hoodmaps.com/assets/maps/boston-neighborhood-map.png"}
            alt="View the organization's locations"
            width={400}
            height={300}
          />
        </Grid>
      </Grid.Container>
    </Grid>
  );
};
