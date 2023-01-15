import React from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "./FilterSidebar.module.css";
import { ResourceCategory } from '../../../models/types';
import ClearFieldsButton from './ClearFieldsButton';

interface SidebarCategoriesProps {
    setCategories(s: ResourceCategory[]): void
    categories: ResourceCategory[];
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = (props: SidebarCategoriesProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Categories</Text>
            <Spacer y={1} />
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
                value={props.categories}
                onChange={(e) => props.setCategories(e as ResourceCategory[])}
            >
                {Object.values(ResourceCategory).map(category => (
                    <Checkbox key={category} value={category} size={"xs"}>
                        <Text className={styles.sidebarCheckboxText}>{category}</Text>
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <ClearFieldsButton setField={props.setCategories} clearedValue={[]}/>
        </Grid>
    )
}
