import React from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "./FilterSidebar.module.css";
import ClearFieldsButton from './ClearFieldsButton';

interface SidebarCategoriesProps {
    categories: string[];
    setSelectedCategories(s: string[]): void
    selectedCategories: string[];
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = (props: SidebarCategoriesProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Categories</Text>
            <Spacer y={1} />
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
                value={props.selectedCategories}
                onChange={(e) => props.setSelectedCategories(e)}
            >
                {props.categories.map(category => (
                    <Checkbox css={{padding: "8px"}} key={category} value={category} size={"sm"}>
                        <Text className={styles.sidebarCheckboxText}>{category}</Text>
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <ClearFieldsButton setField={props.setSelectedCategories} clearedValue={[]} />
        </Grid>
    )
}
