import { FormElement, Input } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { ResourceCategory, ResourceSortingMethod } from "../../models/types";
import { FilterDropdown } from "./FilterDropdown";
import { FiltersList } from "./FiltersList";
import { SortDropdown } from "./SortDropdown";
import { ViewAllButton } from "./ViewAllButton";

interface ResourceSearchBarProps {
    placeholder: string;
    onChange: (e: ChangeEvent<FormElement>) => void
    viewingAll: boolean;
    toggleViewingAll: () => void;
    setFilters: React.Dispatch<React.SetStateAction<string>>;
    setSortingMethod: React.Dispatch<React.SetStateAction<ResourceSortingMethod>>;
}

export const ResourceSearchBar: React.FC<ResourceSearchBarProps> = (props: ResourceSearchBarProps) => {
    const [filters, setFilters] = useState<string>("")

    // TODO: update this so it pulls from the ResourceCategory type
    const updateFilterCategories = (filters: string[]) => {
        let resourceCategoryFilters: ResourceCategory[] = [];
        filters.forEach((filter) => {
            if (filter === "Childcare") {
                resourceCategoryFilters.push(ResourceCategory.Childcare)
            } else if (filter === "Healthcare") {
                resourceCategoryFilters.push(ResourceCategory.Healthcare)
            } else if (filter === "Financial Help") {
                resourceCategoryFilters.push(ResourceCategory.FinancialHelp)
            } else if (filter === "Immigration Assistance") {
                resourceCategoryFilters.push(ResourceCategory.ImmigrationAssistance)
            } else if (filter === "Housing") {
                resourceCategoryFilters.push(ResourceCategory.Housing)
            }
        })

        setFilters(resourceCategoryFilters.toString())
        props.setFilters(resourceCategoryFilters.toString())
    }

    // TODO: write this so it pulls directly from the ResourceSortingMethod type
    const updateSortingMethod = (sortingMethod: string) => {
        if (sortingMethod === "Alphabetical") {
            props.setSortingMethod(ResourceSortingMethod.Alphabetical)
        } else if (sortingMethod === "Sort2") {
            props.setSortingMethod(ResourceSortingMethod.Sort2)
        } else if (sortingMethod === "Sort3") {
            props.setSortingMethod(ResourceSortingMethod.Sort3)
        } else if (sortingMethod === "Sort4") {
            props.setSortingMethod(ResourceSortingMethod.Sort4)
        } else if (sortingMethod === "Sort5") {
            props.setSortingMethod(ResourceSortingMethod.Sort5)
        }
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                <Input
                    width="500px"
                    size="xl"
                    aria-label="Search"
                    type="search"
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />

                <ViewAllButton
                    viewingAll={props.viewingAll}
                    onViewingAllPress={props.toggleViewingAll}
                />

                <FilterDropdown
                    setResourceFilters={updateFilterCategories}
                />

                <SortDropdown
                    setSortingMethod={updateSortingMethod}
                />
            </div>

            <FiltersList
                categories={filters ? JSON.parse(filters) : []}
            />
        </div>
    )
}
