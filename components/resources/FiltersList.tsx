import { ResourceCategory } from "../../models/types";

interface FiltersListProps {
    categories: ResourceCategory[];
}

// TODO: write this component to display the colored filters selected below the search bar
export const FiltersList: React.FC<FiltersListProps> = (props: FiltersListProps) => {

    return (
        <div>
            {props.categories.map(c =>
                <div key={c}>
                    {c}
                </div>
            )}
        </div>
    )
}
