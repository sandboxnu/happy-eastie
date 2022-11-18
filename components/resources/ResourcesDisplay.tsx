import { WithId } from "mongodb";
import Link from "next/link";
import { Resource } from "../../models/types";

interface ResourcesDisplayProps {
    resources: WithId<Resource>[];
}

export const ResourcesDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return (
        <div>
            {props.resources.map(resource =>
                <div key={resource._id.toString()}>
                  <Link href={`/resources/${resource._id.toString()}`} >{resource.name}</Link><br />
                </div>)}
        </div>
    )
}
