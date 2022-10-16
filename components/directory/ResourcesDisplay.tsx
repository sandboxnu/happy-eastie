import { Resource } from "../../models/types";
import { ResourceCardDisplay } from "./ResourceCardDisplay";

interface ResourcesDisplayProps {
    resources: Resource[];
}

export const ResourcesDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return (
        <ul>
            {props.resources?.map((resourceResult: Resource) => (
                <div style={{}} key={resourceResult.id}>
                    <ResourceCardDisplay resource={resourceResult}></ResourceCardDisplay>
                    <br />
                </div>
            ))}
        </ul>
    )
}
