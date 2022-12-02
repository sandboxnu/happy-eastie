import React from 'react';
import { Grid } from "@nextui-org/react";
import { SidebarCategories } from './SidebarCategories';

interface FilterSidebarProps {
}

export const FilterSidebar: React.FC<FilterSidebarProps> = (props: FilterSidebarProps) => {
    return (
        <Grid xs={0} sm={3} style={{ backgroundColor: "red" }}>
            <Grid.Container>
                <Grid>
                    <SidebarCategories />
                </Grid>
            </Grid.Container>
        </Grid>
    )
}
