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
                <Grid xs={6} key={resourceResult.id}>
                    <ResourceCardDisplay resource={resourceResult}></ResourceCardDisplay>
                    <br />
                </Grid>
            ))}
        </Grid.Container>
    )
}
