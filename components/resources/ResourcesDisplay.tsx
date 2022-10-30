import Link from "next/link";
import { Resource } from "../../models/types";

interface ResourcesDisplayProps {
    resources: Resource[];
}

export const ResourcesDisplay: React.FC<ResourcesDisplayProps> = (props: ResourcesDisplayProps) => {
    return (
        <div>
            {props.resources.map(resource =>
                <div key={resource.id}>
                  <Link href={`/resources/${resource.id}`} >{resource.name}</Link><br />
                </div>)}
        </div>
    )
}
