import { Resource } from "../../models/types";
import { Grid, Image, Text } from "@nextui-org/react";

interface ResourceDescriptionProps {
    resource: Resource;
}

export const ResourceDescription: React.FC<ResourceDescriptionProps> = (props: ResourceDescriptionProps) => {
    return (
        <div>
            <Grid.Container justify="center" gap={8} wrap="nowrap">
                <Grid>
                    <Text>{props.resource.description}</Text>
                    <br />
                    <Text weight="semibold">Point of Contact: {props.resource.pointOfContact}</Text>
                    <Text weight="semibold">Waitlist: {props.resource.waitlist?.description}</Text>
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
        </div>
    );
};
