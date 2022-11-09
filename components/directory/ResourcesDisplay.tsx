import { Grid } from "@nextui-org/react";
import { Resource } from "../../models/types";
import { ResourceCardDisplay } from "./ResourceCardDisplay";

interface ResourcesDisplayProps {
    resources: Resource[];
}

export const ResourcesDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return (
        <Grid.Container gap={4} direction="row" justify="flex-start" wrap="wrap">
            {props.resources?.map((resourceResult: Resource) => (
                <Grid md={6} sm={12} justify="center" key={resourceResult.id}>
                    <ResourceCardDisplay resource={resourceResult}></ResourceCardDisplay>
                    <br />
                </Grid>
            ))}
        </Grid.Container>
    )
}
