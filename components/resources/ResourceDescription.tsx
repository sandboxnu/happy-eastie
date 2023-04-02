import { Resource } from "../../models/types2";
import { Grid, red, Spacer, Text } from "@nextui-org/react";
import styles from "./ResourceDescription.module.css";
import './ResourceDescription.module.css';
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
    <Grid.Container justify="space-between" gap={2}>
      <Grid xs={12} sm={props.resource.location ? 6 : 12}>
        <div> 
          <Text h3>Description</Text>
          <ReactMarkdown className={styles.descriptionText}>
            {props.resource.description}
          </ReactMarkdown>
          <Spacer y={2}/>
          <Text h3>
            Eligibility Criteria
          </Text>
          {props.resource.eligibilityInfo && <ReactMarkdown className={styles.descriptionText}>{props.resource.eligibilityInfo}</ReactMarkdown>}
        </div>
      </Grid>
      {props.resource.location && (
        <Grid xs={12} sm={5} direction={"column"}>
          <Text className={styles.addressText} h3>
            Address 
          </Text>
          <Text className={styles.addressText} css={{marginBottom: "20px"}}>
            {props.resource.address}
            </Text>
          <iframe
            width="100%"
            height="350px"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              location!.coordinates[1] + mapRadius
            }%2C${location!.coordinates[0] + mapRadius}%2C${
              location!.coordinates[1] - mapRadius
            }%2C${location!.coordinates[0] - mapRadius}&layer=mapnik&marker=${
              location!.coordinates[0]
            }%2C${location!.coordinates[1]}`}
          ></iframe>
        </Grid>
      )}
    </Grid.Container>
  );
};
