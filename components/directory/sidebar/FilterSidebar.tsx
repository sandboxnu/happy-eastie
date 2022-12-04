import React from 'react';
import { Grid, Spacer } from "@nextui-org/react";
import { SidebarCategories } from './SidebarCategories';
import { SidebarStatus } from './SidebarStatus';
import { SidebarFamily } from './SidebarFamily';

interface FilterSidebarProps {
}

export const FilterSidebar: React.FC<FilterSidebarProps> = (props: FilterSidebarProps) => {
    return (
        <Grid xs={0} sm={3} style={{ backgroundColor: "#DCDCDC" }}>
            <Grid.Container>
                <Grid>
                    <SidebarCategories />
                </Grid>

                {/* TODO: replace spacers here with grid gaps */}
                <Spacer y={2} />

                <Grid>
                    <SidebarStatus />
                </Grid>

                <Spacer y={2} />

                <Grid>
                    <SidebarFamily />
                </Grid>
            </Grid.Container>
        </Grid>
    )
}
