import { Resource } from "../../models/types";
import { Grid } from "@nextui-org/react";
import styles from "./ResourceDescription.module.css";
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
    <Grid.Container justify="space-between">
      <Grid xs={12} sm={props.resource.location? 6 : 12}>
        <div>
          {props.resource.description && 
          <ReactMarkdown className={styles.descriptionText}>
            {props.resource.description}
          </ReactMarkdown>}
          <br />
          {props.resource.pointOfContact && 
          <ReactMarkdown className={styles.descriptionText}>
            {`**Point of Contact:** ${props.resource.pointOfContact}`}
          </ReactMarkdown>}
          {props.resource.waitlist?.description && 
          <ReactMarkdown className={styles.descriptionText}>
            {`**Waitlist:** ${props.resource.waitlist?.description}`}
          </ReactMarkdown>}
        </div>
      </Grid>
      {props.resource.location && (
        <Grid xs={12} sm={5}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              location!.coordinates[1] + mapRadius
            }%2C${location!.coordinates[0] + mapRadius}%2C${
              location!.coordinates[1] - mapRadius
            }%2C${location!.coordinates[0] - mapRadius}&layer=mapnik&marker=${
              location!.coordinates[0]
            }%2C${location!.coordinates[1]}`}
            style={{
              border: "1px solid black",
              overflow: "hidden",
              aspectRatio: "16/9",
            }}
          ></iframe>
        </Grid>
      )}
    </Grid.Container>
  );
};
