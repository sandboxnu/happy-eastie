import { Resource } from "../../models/types";

interface ResourcesDisplayProps {
    resource: Resource;
}

export const ResourceDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return <div><h1>Resource {props.resource.name}</h1><h2>{props.resource.description}</h2></div>
}
