import { Grid } from "@nextui-org/react";
import { WithId } from "mongodb";
import { Resource } from "../../models/types";
import { ResourceCardDisplay } from "./ResourceCardDisplay";

interface ResourcesDisplayProps {
    resources: WithId<Resource>[];
}

export const ResourcesDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return (
        <Grid.Container gap={4} direction="row" justify="flex-start" wrap="wrap">
            {props.resources?.map((resourceResult: WithId<Resource>) => (
                <Grid sm={6} xs={12} justify="center" key={resourceResult._id.toString()}>
                    <ResourceCardDisplay resource={resourceResult}></ResourceCardDisplay>
                    <br />
                </Grid>
            ))}
        </Grid.Container>
    )
}
