import { FormElement, Grid, Input } from "@nextui-org/react";
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
    setFilters: React.Dispatch<React.SetStateAction<ResourceCategory[]>>;
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
            <Grid.Container css={{ w: "100vw" }} direction="row" gap={2} justify="center" alignItems="center">
                <Grid md={3} sm={12}>
                    <Input
                        size="xl"
                        aria-label="Search"
                        type="search"
                        placeholder={props.placeholder}
                        onChange={props.onChange}
                    />
                </Grid>

                <Grid md={3} sm={12}>
                    <ViewAllButton
                        viewingAll={props.viewingAll}
                        onViewingAllPress={props.toggleViewingAll}
                    />
                </Grid>

                <Grid md={3} sm={12}>
                    <FilterDropdown
                        setResourceFilters={updateFilterCategories}
                    />
                </Grid>

                <Grid md={3} sm={12}>
                    <SortDropdown
                        setSortingMethod={updateSortingMethod}
                    />
                </Grid>
            </Grid.Container>
            <FiltersList
                categories={filters ? JSON.parse(filters) : []}
            />
        </div>
    )
}
