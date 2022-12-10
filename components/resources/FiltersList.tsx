import { ResourceCategory } from "../../models/types";

interface FiltersListProps {
    categories: string[];
}

// TODO: write this component to display the colored filters selected below the search bar
export const FiltersList: React.FC<FiltersListProps> = (props: FiltersListProps) => {
    const convertCategories = (categories : string[]) : ResourceCategory[] => {
        let resourceCategoryFilters: ResourceCategory[] = [];
        categories.forEach((c) => {
            if (c === "Childcare") {
                resourceCategoryFilters.push(ResourceCategory.Childcare)
            } else if (c === "Healthcare") {
                resourceCategoryFilters.push(ResourceCategory.Healthcare)
            } else if (c === "Financial Help") {
                resourceCategoryFilters.push(ResourceCategory.FinancialHelp)
            } else if (c === "Immigration Assistance") {
                resourceCategoryFilters.push(ResourceCategory.ImmigrationAssistance)
            } else if (c === "Housing") {
                resourceCategoryFilters.push(ResourceCategory.Housing)
            }
        })

        return resourceCategoryFilters;
    }
    return (
        <div>
            {convertCategories(props.categories).map(c =>
                <div key={c}>
                    {c}
                </div>
            )}
        </div>
    )
}
