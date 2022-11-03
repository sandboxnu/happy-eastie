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
      <Grid.Container justify="center" gap={8}>
        <Grid md={8}>
          <div>
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
          </div>
        </Grid>
        <Grid md={4}>
          {/* TODO: put map of relevant locations here */}
          <Image
            src={"https://gisgeography.com/wp-content/uploads/2020/06/Boston-Road-Map.jpg"}
            alt="View the organization's locations"
            autoResize
          />
        </Grid>
      </Grid.Container>
    </Grid>
  );
};
