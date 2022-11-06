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
  const mapRadius = 0.01; // Degrees latitude/longitude
  const location = props.resource.location;
  console.log(location);
  return (
    <Grid>
      <Grid.Container justify="center" gap={8}>
        <Grid md={7}>
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
        {props.resource.location && (
          <Grid md={4}>
            {/* TODO: put map of relevant locations here */}
            <iframe
              width="850"
              height="700"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                location!.longitude + mapRadius
              }%2C${location!.latitude + mapRadius}%2C${
                location!.longitude - mapRadius
              }%2C${location!.latitude - mapRadius}&layer=mapnik&marker=${
                location!.latitude
              }%2C${location!.longitude}`}
              style={{ border: "1px solid black" }}
            ></iframe>
          </Grid>
        )}
      </Grid.Container>
    </Grid>
  );
};
