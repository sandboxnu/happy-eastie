import React from 'react';
import { Grid, Spacer } from "@nextui-org/react";
import { SidebarCategories } from './SidebarCategories';
import { SidebarStatus } from './SidebarStatus';
import { SidebarFamily } from './SidebarFamily';

interface FilterSidebarProps {
}

export const FilterSidebar: React.FC<FilterSidebarProps> = (props: FilterSidebarProps) => {
    return (
        <Grid xs={0} sm={3} style={{ backgroundColor: "#DCDCDC", width: "283px" }}>
            <Grid.Container justify="center">
                <SidebarCategories />
                <SidebarStatus />
                <SidebarFamily />
            </Grid.Container>
        </Grid>
    )
}
